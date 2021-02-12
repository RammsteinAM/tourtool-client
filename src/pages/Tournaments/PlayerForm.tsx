import React, { createRef, useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import mainStyles from '../../styles/mainStyles';
import { useParams } from 'react-router-dom';
import FormSubheader from '../../components/FormComponents/FormSubheader';
import { ReactComponent as Teams } from '../../resources/icons/teams.svg';
import { ReactComponent as Single } from '../../resources/icons/single.svg';
import { ReactComponent as DrawYourPartner } from '../../resources/icons/drawYourPartner.svg';
import { PlayerCategory, StatePlayers } from '../../types/entities';
import toast from '../../components/IndependentSnackbar';
import tournamentStyles from './tournamentStyles';
import { updatePlayers } from '../../redux/tournamentEntities/actions';
import PlayerFormTextField from './PlayerFormTextField';

interface Duplicate {
    player: string;
    index: number;
}

enum GoalValues {
    Quick = 'quick',
    Number = 'number',
}

const initialPlayer = { name: '', category: null };

interface Props {

}

const PlayerForm = (props: Props) => {
    const [players, setPlayers] = useState<StatePlayers>([{ ...initialPlayer }]);
    const [checkboxSetPlayers, setCheckboxSetPlayers] = useState<boolean>(false);
    const [fieldRefs, setFieldRefs] = useState<React.RefObject<HTMLInputElement>[]>([]);
    const entityState = useSelector((state: RootState) => state.entities);
    const classes = tournamentStyles();
    const dispatch = useDispatch();
    const mainClasses = mainStyles();
    const history = useHistory();
    const { playerType } = useParams<{ playerType: 'single' | 'teams' | 'dyp' }>();
    const { t } = useTranslation();

    const dyp = playerType === 'dyp';

    useEffect(() => {
        setFieldRefs(fieldRefs => (
            Array(players.length).fill(null).map((_, i) => fieldRefs[i] || createRef())
        ));
    }, [players.length]);

    useEffect(() => {
        const storePlayers = entityState.players;
        setPlayers([...storePlayers, { ...initialPlayer }])
    }, []);

    useEffect(() => {
        const storePlayers = entityState.players;
        if (storePlayers.length === players.length - 1) {
            setPlayers([...storePlayers, { ...initialPlayer }])
        }
    }, [entityState.players]);

    const handleCheckboxChange = () => {
        setCheckboxSetPlayers(!checkboxSetPlayers);
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
        const duplicate = getDuplicate();
        if (duplicate) {
            toast.warning(t('player-form-duplicate-name', { name: duplicate.player }));
            fieldRefs[duplicate.index]?.current?.focus();
            fieldRefs[duplicate.index]?.current?.select();
        }
        else {
            submitPlayersToStore([...players]);
            history.push('/elimination');
        }
    }

    const getDuplicate = (index?: number, name?: string): Duplicate => {
        const duplicates: Duplicate[] = [];
        const newPlayers = [...players];
        if (index && name) {
            newPlayers[index].name = name;
        }
        const playerNames = players.map(player => player.name);
        playerNames.forEach((name, index) => {
            if (name && playerNames.indexOf(name) !== index) {
                duplicates.push({ player: name, index })
            }
        })
        return duplicates[0];
    }

    const handlePlayerChange = (index: number/*, name: string */) => {
        // let newPlayers = [...players];
        // newPlayers[index].name = name;
        // if (newPlayers[newPlayers.length - 1].name) {
        //     newPlayers.push({ ...initialPlayer });
        // }
        // setPlayers([...newPlayers]);
        if (players[players.length - 1].name || index === players.length - 1) {
            setPlayers([...players, { ...initialPlayer }]);
            //players.push({ ...initialPlayer });
        }
    };

    const handleCategoryChange = (index: number, category: PlayerCategory) => {
        let newPlayers = [...players];
        newPlayers[index].category = category;
        setPlayers([...newPlayers]);
        submitPlayersToStore([...newPlayers]);
    };

    const insertMiddleRow = (index: number) => {
        const newPlayers = [...players];
        if (players[index - 1]) {
            newPlayers.splice(index, 0, { ...initialPlayer })
            setPlayers([...newPlayers]);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number, name: string) => {
        if (e.key === "Enter" || e.key === "ArrowDown") {
            e.preventDefault();
            const duplicate = getDuplicate(index, name);
            if (duplicate && index >= players.length - 2) {
                toast.warning(t('player-form-duplicate-name', { name: duplicate.player }));
                fieldRefs[duplicate.index]?.current?.focus();
                fieldRefs[duplicate.index]?.current?.select();
            }
            else {
                fieldRefs[index + 1]?.current?.focus();
                if (e.key === "Enter") {
                    if (e.ctrlKey) insertMiddleRow(index + 1);
                    else fieldRefs[players.length - 1]?.current?.focus();
                }
            }
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            fieldRefs[index - 1]?.current?.focus()
        }
        if (e.key === "Backspace" && !name) {
            fieldRefs[index - 1]?.current?.focus();
        }
    }

    const handleBlur = (e: React.FocusEvent, index: number, name: string) => {
        let newPlayers = [...players];
        newPlayers[index].name = name;
        newPlayers = newPlayers.filter((val, i, arr) => {
            return (!!val.name || i === arr.length - 1);
        });
        setPlayers([...newPlayers]);
        submitPlayersToStore([...newPlayers]);
    }

    const submitPlayersToStore = (newPlayers: StatePlayers) => {
        const storePlayers: StatePlayers = newPlayers
            .filter(player => !!player.name)
            .map((player, i) => {
                return checkboxSetPlayers ?
                    { name: player.name, category: player.category } :
                    { name: player.name, category: null };
            })

        dispatch(updatePlayers(storePlayers));
    }

    const renderHeader = () => {
        switch (playerType) {
            case 'single':
                return (
                    <div
                        className={classes.playerFormHeader}
                        style={{ backgroundImage: 'linear-gradient(-180deg,#e89e67,#e16f3d)' }}
                    >
                        <Single />
                        <div>{t('Single')}</div>
                    </div>
                )
            case 'teams':
                return (
                    <div
                        className={classes.playerFormHeader}
                        style={{ backgroundImage: 'linear-gradient(-180deg,#b0d275,#8dc44c)' }}
                    >
                        <Teams />
                        <div>{t('Teams')}</div>
                    </div>
                )
            case 'dyp':
                return (
                    <div
                        className={classes.playerFormHeader}
                        style={{ backgroundImage: 'linear-gradient(-180deg,#58e0f5,#00b8d4)' }}
                    >
                        <DrawYourPartner />
                        <div>{t('Draw Your Partner')}</div>
                    </div>
                )
            default:
                return null;
                break;
        }
    }

    return (
        <Paper elevation={3} className={classes.playerFormPaper}>
            <form className={classes.form} onSubmit={handleSubmit} id='player-form'>
                {renderHeader()}
                <FormSubheader title={t('Names')} text={dyp ? t('form-subheader-names-dyp-text') : t('form-subheader-names-text')} width={366} />
                {dyp &&
                    <FormControlLabel
                        className={classes.playerFormCheckbox}
                        control={
                            <Checkbox
                                size='small'
                                checked={checkboxSetPlayers}
                                onChange={handleCheckboxChange}
                                name="setPlayers"
                                color="primary"
                            />
                        }
                        label={t('Set Players')}
                    />
                }
                <div>
                    {players.map((player, index) => {
                        return (
                            <PlayerFormTextField
                                key={index}
                                index={index}
                                inputRef={fieldRefs}
                                player={player}
                                showCategories={dyp && checkboxSetPlayers}
                                onChange={handlePlayerChange}
                                onBlur={handleBlur}
                                onCategoryChange={handleCategoryChange}
                                onKeyDown={handleKeyDown}
                            />
                            // <div key={index} className={classes.playerFormFieldContainer}>
                            //     <div className={classes.playerFormFieldNumber}>{index + 1}</div>
                            //     <TextField
                            //         fullWidth
                            //         size="small"
                            //         value={player.name}
                            //         key={index}
                            //         type="text"
                            //         onChange={
                            //             (event: React.ChangeEvent<{ value: unknown }>) => {
                            //                 handlePlayerChange(index)
                            //             }
                            //         }
                            //         onKeyDown={
                            //             (event: React.KeyboardEvent) => {
                            //                 handleKeyDown(event, index, player.name)
                            //             }
                            //         }
                            //         onBlur={
                            //                                     (event: React.ChangeEvent<{ value: unknown }>) => {
                            //                                         handleBlur(event.target.value as string, index)
                            //                                     }
                            //         }
                            //         inputRef={fieldRefs[index]}
                            //         autoComplete="off"
                            //         className={clsx(classes.textField, classes.playerFormField)}
                            //     />
                            //     {dyp && checkboxSetPlayers &&
                            //         <ul className={classes.playerFormGroupSelect}>
                            //             <li className={
                            //                 clsx(classes.playerFormGroupSelectItem,
                            //                     { [classes.playerFormGroupSelectItemSeleced]: player.category === 'A' }
                            //                 )
                            //             }
                            //                 onClick={() => handleCategoryChange(index, 'A')}
                            //             >
                            //                 <a>{t('A')}</a>
                            //             </li>
                            //             <li
                            //                 className={
                            //                     clsx(classes.playerFormGroupSelectItem,
                            //                         { [classes.playerFormGroupSelectItemSelecedNeutral]: !player.category }
                            //                     )
                            //                 }
                            //                 onClick={() => handleCategoryChange(index, null)}
                            //             >
                            //                 <a className="none">—</a>
                            //             </li>
                            //             <li className={
                            //                 clsx(classes.playerFormGroupSelectItem,
                            //                     { [classes.playerFormGroupSelectItemSeleced]: player.category === 'B' }
                            //                 )
                            //             }
                            //                 onClick={() => handleCategoryChange(index, 'B')}
                            //             >
                            //                 <a>{t('B')}</a>
                            //             </li>
                            //         </ul>
                            //     }
                            // </div>
                        )
                    })}
                </div>
            </form>
        </Paper>
    )
}

export default PlayerForm
