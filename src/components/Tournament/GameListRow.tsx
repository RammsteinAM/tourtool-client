import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { Games, StateScore } from '../../types/entities';
import { splitGameKey } from '../../utils/stringUtils';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { CardHeader } from '@material-ui/core';
import { resetGames, updateGames } from '../../redux/tournamentEntities/actions';
import EnterScoreContent from '../../components/Tournament/EnterScoreContent';
import gameListRowStyles from './gameListRowStyles';
import { getMultipleSetScores } from '../../utils/scoreUtils';

interface Props {
    gameKey: string;
    maxScores?: number;
}

const GameListRow = ({ gameKey, maxScores = 10 }: Props) => {
    const [games, setGames] = useState<Games>({});
    const [scoresOpen, setScoresOpen] = useState<boolean>(false);
    const entityState = useSelector((state: RootState) => state.entities);
    const gamesState = useSelector((state: RootState) => state.entities.games);
    const settingsState = useSelector((state: RootState) => state.settings);
    const firstRoundGameNumber = Object.keys(games).filter(gameKey => splitGameKey(gameKey).round === 1).length;
    const dispatch = useDispatch();
    const columns = Math.log(Object.keys(games).length + 1) / Math.log(2);
    const classes = gameListRowStyles();
    const { t } = useTranslation();

    // useEffect(() => {

    //     setGames({ ...entityState.eliminationGames })

    // }, [/* entityState.players */])

    const toggleScoresOpen = () => {
        setScoresOpen(!scoresOpen)
    }

    const closeScores = () => {
        setScoresOpen(false)
    }

    const handleScoreInput = (scores1: StateScore, scores2: StateScore) => {
        //if (!gameKey || !player1Name || !player2Name) return;
        const { score1, score2 } = getMultipleSetScores(scores1, scores2, Object.keys(scores1).length)
        const round = splitGameKey(gameKey).round;
        const gameNumber = splitGameKey(gameKey).gameNumber;
        const isGameOdd = gameNumber % 2 === 1;
        const nextGameKey = `${round + 1}-${isGameOdd ? (gameNumber + 1) / 2 : gameNumber / 2}`;

        dispatch(updateGames({ [gameKey]: { ...gamesState[gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) } }));
        // if (round < finalRoundNumber - 1) {
        //     isGameOdd ?
        //         dispatch(updateGames({ [props.gameKey]: { ...gamesState[props.gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) }, [nextGameKey]: { ...gamesState[nextGameKey], player1: winner } })) :
        //         dispatch(updateGames({ [props.gameKey]: { ...gamesState[props.gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) }, [nextGameKey]: { ...gamesState[nextGameKey], player2: winner } }));
        // }
        // if (round === finalRoundNumber - 1) {
        //     isGameOdd ?
        //         dispatch(updateGames({ [props.gameKey]: { ...gamesState[props.gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) }, ['final']: { ...gamesState['final'], player1: winner } })) :
        //         dispatch(updateGames({ [props.gameKey]: { ...gamesState[props.gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) }, ['final']: { ...gamesState['final'], player2: winner } }));
        // }
        closeScores()
    }
    
    return (
        <div /* className={classes.gameRowContainer} */>
            <div className={classes.gameRow}>
                <div>{gamesState[gameKey]?.player1}</div>
                <div className={classes.scoreContainer} onClick={toggleScoresOpen}>
                    {!scoresOpen && (gamesState[gameKey]?.score1 !== undefined && gamesState[gameKey]?.score2 !== undefined ?
                        <div>
                            {gamesState[gameKey].score1}
                            {gamesState[gameKey].score2}
                        </div> :
                        <div>{t('Enter Result')}</div>)
                    }
                    {scoresOpen && <div style={{ color: '#ffffff', backgroundColor: '#333333' }}>{t('Enter Result')}</div>}
                </div>
                <div>{gamesState[gameKey]?.player2}</div>
            </div>
            {scoresOpen && <EnterScoreContent
                onClose={closeScores}
                onConfirm={handleScoreInput}
                gameKey={gameKey}
                gameType='lms'
                visibleScores={entityState.tournament.numberOfGoals && entityState.tournament.numberOfGoals < maxScores ? entityState.tournament.numberOfGoals + 1 : maxScores}
            />}
        </div>
    )
}

export default GameListRow
