import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import FormSubheader from '../../FormComponents/FormSubheader';
import { ReactComponent as DrawYourPartner } from '../../../resources/icons/drawYourPartner.svg';
import { DBGameData, StateEliminationPlayers, StateLMSPlayer, StateLMSPlayers, StateParticipant, StateParticipants, TournamentTypes } from '../../../types/entities';
import toast from '../../IndependentSnackbar';
import { entityActions, updateEliminationPlayers, updateLMSPlayers, updateTournament } from '../../../redux/tournamentEntities/actions';
import DYPConfigFormItem from './DYPConfigFormItem';
import { difference } from 'lodash';
import dypFormStyles from './dypFormStyles';
import CreateTournamentDialog from '../CreateTournamentDialog';

type Team = [number | undefined, number | undefined];
type InitialTeam = [number, number];
type Teams = Team[];
type InitialTeams = InitialTeam[];

const initialPlayer = { name: '', category: null };

interface Props {
    tournamentType: TournamentTypes,
}

const DYPConfigForm = ({ tournamentType }: Props) => {
    const [teams, setTeams] = useState<Teams>([]);
    const [initialPlayers, setInitialPlayers] = useState<number[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    // const fetchedPlayers = useSelector((state: RootState) => state.entities.fetchedPlayers.data);
    const entityState = useSelector((state: RootState) => state.entities);
    const storeParticipants = useSelector((state: RootState) => state.entities.participants);
    const classes = dypFormStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    const normalizedStoreParticipants: { [id: number]: StateParticipant } = storeParticipants.reduce((acc: any, val: StateParticipant) => {
        if (!val.id) {
            return acc;
        }
        acc[val.id] = val;
        return acc;
    }, {})

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
        const playersA: StateParticipants = storeParticipants.filter(player => player.category === 'A');
        const playersB: StateParticipants = storeParticipants.filter(player => player.category === 'B');
        const playersNeutral: StateParticipants = storeParticipants.filter(player => player.category !== 'A' && player.category !== 'B');
        const teams: InitialTeams = [];
        for (let i = 0; i < storeParticipants.length / 2; i++) {
            let teamPlayer1, teamPlayer2;
            if (playersA[0]) {
                teamPlayer1 = playersA[0].id;
                playersA.shift();
            }
            else if (playersNeutral[0]) {
                teamPlayer1 = playersNeutral[0].id;
                playersNeutral.shift();
            }
            else {
                teamPlayer1 = playersB[0].id;
                playersB.shift();
            }
            if (playersB[0]) {
                teamPlayer2 = playersB[0].id;
                playersB.shift();
            }
            else if (playersNeutral[0]) {
                teamPlayer2 = playersNeutral[0].id;
                playersNeutral.shift();
            }
            else {
                teamPlayer2 = playersA[0].id;
                playersA.shift();
            }
            teams.push([teamPlayer1 as number, teamPlayer2 as number])
        }
        return teams;
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (difference(initialPlayers, teams.flat()).length > 0) {
            toast.warning(t('You need 2 players per team'));
            return;
        }
        // const newStorePlayers = teams.map(team => ({ name: team.join(' / ') }));
        // const newStorePlayers: StateEliminationPlayers = teams.map(team => {
        //     const id1 = team[0], id2 = team[1];
        //     if (typeof id1 === 'number' && typeof id2 === 'number') {
        //         return { id: [id1, id2] }
        //     }
        //     return { id: [0,0]};
        // });
        const newStorePlayers: StateEliminationPlayers = teams.reduce((acc: StateEliminationPlayers, val: Team) => {
            //const id1 = team[0], id2 = team[1];
            if (typeof val[0] === 'number' && typeof val[1] === 'number') {
                acc.push({ id: [val[0], val[1]] });
            }
            return acc;
        }, []);
        // const participantsWithIds: StateParticipants = participants.map(p => {
        //     const id = entityState.fetchedPlayers.data.find(fp => fp.name === p.name)?.id
        //     return { ...p, id };
        // })
        if (tournamentType === 'elimination') {
            dispatch(updateEliminationPlayers(newStorePlayers));
            history.push('/tournament/elimination-bracket');
            return;
        }

        dispatch(updateLMSPlayers(newStorePlayers));
        handleDialogOpen();
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

    const getIndexToSwapWith = (playerName: number | undefined): [number, number] | null => {
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

    // const insterIntoEmptySpot = (playerName: string): [number, number] | null => {
    //     for (let i = 0; i < teams.length; i++) {
    //         if (teams[i][0] === playerName) {
    //             return [i, 0]
    //         }
    //         if (teams[i][1] === playerName) {
    //             return [i, 1]
    //         }
    //     }
    //     return null;
    // }

    const handlePlayerChange = (newPlayerId: number | undefined, index: [number, number], oldPlayerId: number | undefined) => {
        const newTeams = [...teams];
        const oldIndex = newPlayerId && getIndexToSwapWith(newPlayerId)
        if (oldIndex) {
            newTeams[oldIndex[0]][oldIndex[1]] = oldPlayerId;
        }
        newTeams[index[0]][index[1]] = newPlayerId;
        setTeams([...newTeams])
    }

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleStartTournament = (e: React.FormEvent, name: string) => {
        e.preventDefault();
        //submitGamesToStore();
        // dispatch(updateTournament({ name }));
        const teamPlayerIds = teams.flat()/* .reduce((acc: number[], val) => {
            const id = entityState.fetchedPlayers?.data?.find(fp => fp.name === val.name)?.id
            if (id) {
                acc.push(id);
            }
            return acc;
        }, []) */

        if (teamPlayerIds.includes(undefined)) {
            return;
        }

        const teamsWithPlayerIds = teams as InitialTeams

        const dbGames: DBGameData[] = teamsWithPlayerIds.reduce((acc: DBGameData[], val: InitialTeam, i, arr: InitialTeams) => {
            if (i % 2 === 1) {
                return acc;
            }
            const id1 = arr[i];
            const id2 = arr[i + 1];
            if (!id1 || !id2) {
                return acc;
            }
            acc.push({
                index: `1-${Math.ceil((i + 1) / 2)}`,
                player1: [{ id: id1[0] }, { id: id1[1] }],
                player2: [{ id: id2[0] }, { id: id2[1] }],
            })
            return acc;
        }, [])

        const { draw, numberOfGoals, numberOfLives, numberOfTables, pointsForDraw, pointsForWin, sets, goals } = entityState.tournament;    
        dispatch(entityActions.createTournament({
            name,
            sets: sets || 1,
            tournamentTypeId: 2,
            draw,
            numberOfGoals: goals ? numberOfGoals : 0,
            numberOfLives,
            numberOfTables,
            pointsForDraw,
            pointsForWin,
            games: dbGames,
            players: teamPlayerIds as number[]
        }));
        history.push(`/${tournamentType}/dyp`)
    };

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
                                playersData={normalizedStoreParticipants}
                                assignedPlayerIds={teams.flat()}
                                removedPlayerIds={difference(initialPlayers, teams.flat())}
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

export default DYPConfigForm
