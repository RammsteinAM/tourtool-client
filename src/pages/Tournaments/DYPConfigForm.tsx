import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import FormSubheader from '../../components/FormComponents/FormSubheader';
import { ReactComponent as DrawYourPartner } from '../../resources/icons/drawYourPartner.svg';
import { StateEliminationPlayers } from '../../types/entities';
import toast from '../../components/IndependentSnackbar';
import { updateEliminationPlayers } from '../../redux/tournamentEntities/actions';
import DYPConfigFormItem from './DYPConfigFormItem';
import { difference } from 'lodash';
import tournamentStyles from './tournamentStyles';

type Team = [string | undefined, string | undefined];
type InitialTeam = [string, string];
type Teams = Team[];
type InitialTeams = InitialTeam[];

const initialPlayer = { name: '', category: null };

interface Props {
    tournamentType: 'elimination' | 'lms' | 'round-robin',
}

const DYPConfigForm = ({ tournamentType }: Props) => {
    const [teams, setTeams] = useState<Teams>([]);
    const [initialPlayers, setInitialPlayers] = useState<string[]>([]);
    const storeParticipants = useSelector((state: RootState) => state.entities.participants);
    const classes = tournamentStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    // useEffect(() => {
    //     const storePlayers = entityState.players;
    //     setPlayers([...storePlayers, { ...initialPlayer }])
    // }, [entityState.players]);

    // useEffect(() => {
    //     const storePlayers = entityState.players;
    //     if (storePlayers.length === players.length - 1) {
    //         setPlayers([...storePlayers, { ...initialPlayer }])
    //     }
    // }, [entityState.players]);

    useEffect(() => {
        const initialTeams = getInitialTeams();
        const players = initialTeams.flat();
        setTeams([...initialTeams]);
        setInitialPlayers(players);
    }, [])

    const getInitialTeams = (): InitialTeams => {
        const playersA: StateEliminationPlayers = storeParticipants.filter(player => player.category === 'A');
        const playersB: StateEliminationPlayers = storeParticipants.filter(player => player.category === 'B');
        const playersNeutral: StateEliminationPlayers = storeParticipants.filter(player => player.category !== 'A' && player.category !== 'B');
        const teams: InitialTeams = [];
        for (let i = 0; i < storeParticipants.length / 2; i++) {
            let teamPlayer1, teamPlayer2;
            if (playersA[0]) {
                teamPlayer1 = playersA[0].name;
                playersA.shift();
            }
            else if (playersNeutral[0]) {
                teamPlayer1 = playersNeutral[0].name;
                playersNeutral.shift();
            }
            else {
                teamPlayer1 = playersB[0].name;
                playersB.shift();
            }
            if (playersB[0]) {
                teamPlayer2 = playersB[0].name;
                playersB.shift();
            }
            else if (playersNeutral[0]) {
                teamPlayer2 = playersNeutral[0].name;
                playersNeutral.shift();
            }
            else {
                teamPlayer2 = playersA[0].name;
                playersA.shift();
            }
            teams.push([teamPlayer1 as string, teamPlayer2 as string])
        }
        return teams;
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (difference(initialPlayers, teams.flat()).length > 0) {
            toast.warning(t('You need 2 players per team.'));
            return;
        }
        const newStorePlayers = teams.map(team => ({ name: team.join(' / ') }));

        if (tournamentType === 'elimination') {
            dispatch(updateEliminationPlayers(newStorePlayers));
            history.push('/tournament/elimination-bracket');
            return;
        }
        
        //dispatch(updateEliminationPlayers(newStorePlayers));
    }

    // const submitPlayersToStore = (newPlayers: StatePlayers) => {
    //     const storePlayers: StatePlayers = newPlayers
    //         .filter(player => !!player.name)
    //         .map((player, i) => {
    //             return checkboxSetPlayers ?
    //                 { name: player.name, category: player.category } :
    //                 { name: player.name, category: null };
    //         })
    // }

    const getIndexToSwapWith = (playerName: string | undefined): [number, number] | null => {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i][0] === playerName) {
                return [i, 0]
            }
            if (teams[i][1] === playerName) {
                return [i, 1]
            }
        }
        return null;
    }

    const insterIntoEmptySpot = (playerName: string): [number, number] | null => {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i][0] === playerName) {
                return [i, 0]
            }
            if (teams[i][1] === playerName) {
                return [i, 1]
            }
        }
        return null;
    }

    const handlePlayerChange = (newPlayerName: string | undefined, index: [number, number], oldPlayerName: string | undefined) => {
        const newTeams = [...teams];
        const oldIndex = newPlayerName && getIndexToSwapWith(newPlayerName)
        if (oldIndex) {
            newTeams[oldIndex[0]][oldIndex[1]] = oldPlayerName;
        }
        newTeams[index[0]][index[1]] = newPlayerName;
        setTeams([...newTeams])
    }

    return (
        <Paper elevation={3} className={classes.dypConfigPaper}>
            <form className={classes.form} onSubmit={handleSubmit} id='player-form'>
                <div
                    className={classes.playerFormHeader}
                    style={{ backgroundImage: 'linear-gradient(-180deg,#58e0f5,#00b8d4)' }}
                >
                    <DrawYourPartner />
                    <div>{t('Draw Your Partner')}</div>
                </div>
                <FormSubheader title={t('Teams')} />
                <div>
                    {teams.map((team: Team, index: number) => {
                        return (
                            <DYPConfigFormItem
                                key={index}
                                index={index}
                                selectedPlayer1={team[0]}
                                selectedPlayer2={team[1]}
                                onChange={handlePlayerChange}
                                assignedPlayerNames={teams.flat()}
                                removedPlayerNames={difference(initialPlayers, teams.flat())}
                            />
                        )
                    })}
                </div>
            </form>
        </Paper>
    )
}

export default DYPConfigForm
