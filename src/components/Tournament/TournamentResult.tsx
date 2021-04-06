import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { gameActions } from '../../redux/games/actions';
import { RootState } from '../../redux/store';
import { entityActions } from '../../redux/tournamentEntities/actions';

const TournamentResult = () => {
    const [placements, setPlacements] = useState<{ [place: number]: number }>()
    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const dispatch = useDispatch();
    const tournamentId = parseInt(tournamentIdString, 10)
    const fetchedTournamentsData = useSelector((state: RootState) => state.entities.fetchedTournaments.data);
    const fetchedGames = useSelector((state: RootState) => state.games.data);
    const tournamentGames = fetchedGames[tournamentId];

    useEffect(() => {
        if (!fetchedTournamentsData[tournamentId]) {
            dispatch(entityActions.getTournaments())
            return;
        }
        if (!tournamentGames) {
            dispatch(gameActions.getTournamentGames(tournamentId))
            return;
        }
        const kekw = tournamentGames.reduce((acc, val) => {

            return acc;
        })

    }, [tournamentGames])

    return (
        <div>
            
        </div>
    )
}

export default TournamentResult
