import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getNormalizedParticipants } from '../../utils/arrayUtils';
import { useHistory, useParams } from 'react-router-dom';
import playersStyles from './playersStyles';

interface Props {
    
}

const Players = (props: Props) => {
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const fetchedGames = useSelector((state: RootState) => state.games.data);
    const dispatch = useDispatch();
    const classes = playersStyles();
    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const tournamentId = parseInt(tournamentIdString, 10);
    const fetchedTournamentData = entityState.fetchedTournaments.data[tournamentId];
    const tournamentGames = fetchedGames[tournamentId];
    const tournamentPlayerIds = fetchedTournamentData?.players;
    const fetchedPlayers = entityState.fetchedPlayers.data;
    const normalizedPlayers = getNormalizedParticipants(fetchedPlayers);

    return (
        <div>
            {tournamentPlayerIds?.map(id => {
                return (
                    <div>
                        {normalizedPlayers[id]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Players

