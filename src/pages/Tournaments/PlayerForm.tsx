import React, { createRef, useEffect, useState, useCallback } from 'react'
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useParams } from 'react-router-dom';
import FormSubheader from '../../components/FormComponents/FormSubheader';
import { ReactComponent as Teams } from '../../resources/icons/teams.svg';
import { ReactComponent as Single } from '../../resources/icons/single.svg';
import { ReactComponent as DrawYourPartner } from '../../resources/icons/drawYourPartner.svg';
import { ReactComponent as MonsterDYP } from '../../resources/icons/monsterDYP.svg';
import { DBGameData, FetchedPlayers, PlayerCategory, StateLMSPlayer, StateLMSPlayers, StateParticipants, StateParticipantsWithId, TournamentTypes } from '../../types/entities';
import toast from '../../components/IndependentSnackbar';
import { updateParticipants, updateEliminationPlayers, updateLMSPlayers, entityActions } from '../../redux/tournamentEntities/actions';
import PlayerFormTextField from '../../components/Tournament/PlayerFormTextField';
import FormControl from '@material-ui/core/FormControl';
import DYPConfigForm from '../../components/Tournament/DYPConfigForm/DYPConfigForm';
import CreateTournamentDialog from '../../components/Tournament/CreateTournamentDialog';
import { ActionStatus } from '../../types/main';
import CircularProgress from '@material-ui/core/CircularProgress';
import { debounce } from 'lodash';
import tournamentStyles from './tournamentStyles';
import mainStyles from '../../styles/mainStyles';

interface Duplicate {
    player: string;
    index: number;
}

const initialParticipants = { name: '', category: null };

const PlayerForm = () => {
    const [participants, setParticipants] = useState<StateParticipants>([{ ...initialParticipants }]);
    const [fetchedPlayers, setFetchedPlayers] = useState<FetchedPlayers>();
    const [checkboxSetPlayers, setCheckboxSetPlayers] = useState<boolean>(false);
    const [fieldRefs, setFieldRefs] = useState<React.RefObject<HTMLInputElement>[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const entityState = useSelector((state: RootState) => state.entities);
    const classes = tournamentStyles();
    const dispatch = useDispatch();
    const mainClasses = mainStyles();
    const history = useHistory();
    const { tournamentType, playerType, config } = useParams
        <{
            tournamentType: TournamentTypes,
            playerType: 'single' | 'teams' | 'dyp' | 'monster-dyp',
            config?: 'config'
        }>();
    const { t } = useTranslation();

    const dyp = playerType === 'dyp';
    const dypConfig = dyp && config === 'config';

    useEffect(() => {
        setFieldRefs(fieldRefs => (
            Array(participants.length).fill(null).map((_, i) => fieldRefs[i] || createRef())
        ));
    }, [participants.length]);

    useEffect(() => {
        dispatch(entityActions.getPlayers());
    }, []);

    useEffect(() => {
        entityState.fetchedPlayers?.data && setFetchedPlayers(entityState.fetchedPlayers.data);
    }, [entityState.fetchedPlayers]);

    useEffect(() => {
        const storeParticipants = entityState.participants;
        setParticipants([...storeParticipants, { ...initialParticipants }]);
    }, [entityState.participants]);

    useEffect(() => {        
        if (entityState.fetchedTournaments.status === ActionStatus.Success && entityState.fetchedTournaments.createdTournamentId) {
            history.push(`/${tournamentType}/${playerType}/${entityState.fetchedTournaments.createdTournamentId}`)
        }
    }, [entityState.fetchedTournaments]);
    
    const submitParticipantsToStore = (newPlayers: StateParticipants) => {
        const storeParticipants: StateParticipants = newPlayers
            .filter(player => !!player.name)
            .map((player, i) => {
                return checkboxSetPlayers ?
                    { id: player.id, name: player.name, category: player.category } :
                    { id: player.id, name: player.name, category: null };
            })
        dispatch(updateParticipants(storeParticipants));
        // dispatch(updateEliminationPlayers(storeParticipants));
    }

    const delayedSubmitParticipantsToStore = useCallback(debounce(newPlayers => submitParticipantsToStore(newPlayers), 400), [entityState.participants]);

    if (entityState.fetchedPlayers.status === ActionStatus.Request) {
        return <div className={mainClasses.progress}>
            <CircularProgress />
        </div>
    }

    const handleCheckboxChange = () => {
        setCheckboxSetPlayers(!checkboxSetPlayers);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleStartTournament = (e: React.FormEvent, name: string) => {
        e.preventDefault();
        const dbGames: DBGameData[] = entityState.lmsPlayers.reduce((acc: DBGameData[], val: StateLMSPlayer, i, arr: StateLMSPlayers) => {
            const id1 = arr[i]?.id;
            const id2 = arr[i + 1]?.id;
            if (i % 2 === 1 || typeof id1 !== 'number' || typeof id2 !== 'number') {
                return acc;
            }
            acc.push({
                index: `1-${Math.ceil((i + 1) / 2)}`,
                player1: [{ id: id1 }],
                player2: [{ id: id2 }],
            })
            return acc;
        }, [])

        const dbMonsterDYPGames: DBGameData[] = entityState.lmsPlayers.reduce((acc: DBGameData[], val: StateLMSPlayer, i, arr: StateLMSPlayers) => {
            const id1 = arr[i]?.id;
            const id2 = arr[i + 1]?.id;
            if (i % 2 === 1 || typeof id1 !== 'number' || typeof id2 !== 'number') {
                return acc;
            }
            acc.push({
                index: `1-${Math.ceil((i + 1) / 2)}`,
                player1: [{ id: id1 }],
                player2: [{ id: id2 }],
            })
            return acc;
        }, [])

        const participantIds = participants.reduce((acc: number[], val) => {
            const id = fetchedPlayers?.find(fp => fp.name === val.name)?.id
            if (id) {
                acc.push(id);
            }
            return acc;
        }, [])

        const { draw, numberOfGoals, numberOfLives, numberOfTables, pointsForDraw, pointsForWin, sets, goals } = entityState.tournament;
        dispatch(entityActions.createTournament({
            name,
            sets: sets || 1,
            tournamentTypeId: 2,
            draw,
            monsterDYP: playerType === 'monster-dyp',
            numberOfGoals: goals ? numberOfGoals : 0,
            numberOfLives,
            numberOfTables,
            pointsForDraw,
            pointsForWin,
            games: dbGames,
            players: participantIds
        }));
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        const minPlayers = (playerType === 'dyp' || playerType === 'monster-dyp') ? 4 : 2;
        const duplicate = getDuplicate();
        if (duplicate) {
            toast.warning(t('player-form-duplicate-name', { name: duplicate.player }));
            fieldRefs[duplicate.index]?.current?.focus();
            fieldRefs[duplicate.index]?.current?.select();
            return;
        }
        if (participants.length - 1 < minPlayers) {
            toast.warning(t('player-form-few-players', { number: minPlayers }));
            return;
        }

        const participantsWithIds = participants.reduce((acc: StateParticipantsWithId, val) => {
            const id = fetchedPlayers?.find(fp => fp.name === val.name)?.id
            if (id) {
                acc.push({ ...val, id });
            }
            return acc;
        }, [])

        const dbPlayerNames = fetchedPlayers?.map(p => p.name)
        const addedPlayers = participants.filter((val, i, arr) => {
            return (!!val.name || i === arr.length - 1) && val.name && dbPlayerNames && dbPlayerNames.indexOf(val.name) < 0;
        }).map(p => p.name);

        if (addedPlayers.length > 0) {
            addedPlayers.length > 0 && dispatch(entityActions.createPlayers(addedPlayers));
            return;
        }


        submitParticipantsToStore([...participantsWithIds]);
        if (playerType === 'dyp') {
            if ((participants.length - 1) % 2 === 1) {
                toast.warning(t('player-form-odd-players-error'));
                return;
            }
            history.push(`/tournament/player-form/${tournamentType}/dyp/config`);
            return;
        }
        if (tournamentType === 'elimination') {
            dispatch(updateEliminationPlayers(participantsWithIds));
            history.push('/tournament/elimination-bracket');
            return;
        }
        dispatch(updateLMSPlayers(participantsWithIds.filter(x => !!x.name)));
        handleDialogOpen();
    }

    const getDuplicate = (index?: number, name?: string): Duplicate => {
        const duplicates: Duplicate[] = [];
        const newPlayers = [...participants];
        if (index && name) {
            newPlayers[index].name = name;
        }
        const playerNames = participants.map(player => player.name);
        playerNames.forEach((name, index) => {
            if (name && playerNames.indexOf(name) !== index) {
                duplicates.push({ player: name as string, index })
            }
        })
        return duplicates[0];
    }

    const handlePlayerChange = (index: number, name: string) => {
        const newParticipants = [...participants];
        newParticipants[index].name = name;

        // setPlayers([...newPlayers]);

        delayedSubmitParticipantsToStore([...newParticipants]);

        if (participants[participants.length - 1].name || index === participants.length - 1) {
            setParticipants([...participants, { ...initialParticipants }]);
            //players.push({ ...initialPlayer });
        }
    };

    const handleCategoryChange = (index: number, category: PlayerCategory) => {
        let newPlayers = [...participants];
        newPlayers[index].category = category;
        setParticipants([...newPlayers]);
        submitParticipantsToStore([...newPlayers]);
    };

    const insertMiddleRow = (index: number) => {
        const newPlayers = [...participants];
        if (participants[index - 1]) {
            newPlayers.splice(index, 0, { ...initialParticipants })
            setParticipants([...newPlayers]);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number, name: string) => {
        if (e.key === "Enter" || e.key === "ArrowDown") {
            e.preventDefault();
            const duplicate = getDuplicate(index, name);
            if (duplicate && index >= participants.length - 2) {
                toast.warning(t('player-form-duplicate-name', { name: duplicate.player }));
                fieldRefs[duplicate.index]?.current?.focus();
                fieldRefs[duplicate.index]?.current?.select();
            }
            else {
                fieldRefs[index + 1]?.current?.focus();
                if (e.key === "Enter") {
                    if (e.ctrlKey) insertMiddleRow(index + 1);
                    else fieldRefs[participants.length - 1]?.current?.focus();
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
        const newPlayers = [...participants];
        newPlayers[index].name = name;

        const duplicate = getDuplicate(index, name);
        if (duplicate) {
            toast.warning(t('player-form-duplicate-name', { name: duplicate.player }));
            fieldRefs[duplicate.index]?.current?.focus();
            fieldRefs[duplicate.index]?.current?.select();
            return;
        }

        setParticipants([...newPlayers]);
        submitParticipantsToStore([...newPlayers]);
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
            case 'monster-dyp':
                return (
                    <div
                        className={classes.playerFormHeader}
                        style={{ backgroundImage: 'linear-gradient(-180deg,#efdb63,#f6c832)' }}
                    >
                        <MonsterDYP />
                        <div>{t('MonsterDYP')}</div>
                    </div>
                )
            default:
                return null;
                break;
        }
    }

    if (dypConfig) {
        return <DYPConfigForm tournamentType={tournamentType} />
    }

    return (
        <Paper elevation={3} className={classes.playerFormPaper}>
            <form className={classes.form} onSubmit={handleSubmit} id='player-form'>
                {renderHeader()}
                <FormSubheader title={t('Names')} text={dyp ? t('form-subheader-names-dyp-text') : t('form-subheader-names-text')} descriptionWidth={366} />
                {dyp &&
                    <FormControl>
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
                        /></FormControl>
                }
                <div>
                    {participants.map((player, index) => {
                        return (
                            <PlayerFormTextField
                                key={index}
                                index={index}
                                inputRef={fieldRefs}
                                player={player}
                                showCategories={dyp && checkboxSetPlayers}
                                fetchedPlayers={fetchedPlayers || []}
                                onChange={handlePlayerChange}
                                onBlur={handleBlur}
                                onCategoryChange={handleCategoryChange}
                                onKeyDown={handleKeyDown}
                            />
                        )
                    })}
                </div>
            </form>
            <CreateTournamentDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onSubmit={handleStartTournament}
            />
        </Paper>
    )
}

export default PlayerForm
