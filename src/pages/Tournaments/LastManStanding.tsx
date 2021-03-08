import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { Games } from '../../types/entities';
import { splitGameKey } from '../../utils/stringUtils';
import EliminationCard from './EliminationCard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { CardHeader } from '@material-ui/core';
import { resetGames, updateGames } from '../../redux/tournamentEntities/actions';
import GameListRow from '../../components/Tournament/GameListRow';
import { debounce } from 'lodash';
import { useResizeDetector } from 'react-resize-detector';
import lastManStandingStyles from './lastManStandingStyles';
import GameListRound from '../../components/Tournament/GameListRound';

interface Props {
}

const LastManStanding = (props: Props) => {
    const [games, setGames] = useState<Games>({});
    const [rounds, setRounds] = useState<number>(1);
    const [maxScores, setMaxScores] = useState<number>(7);
    const { width, height, ref: resizeRef } = useResizeDetector();
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const fullScreen = useSelector((state: RootState) => state.settings.fullScreen);
    const firstRoundGameNumber = Object.keys(games).filter(gameKey => splitGameKey(gameKey).round === 1).length;
    const dispatch = useDispatch();
    const columns = Math.log(Object.keys(games).length + 1) / Math.log(2);
    const classes = lastManStandingStyles();
    const { t } = useTranslation();

    // useEffect(() => {

    //     setGames({ ...entityState.eliminationGames })

    // }, [/* entityState.players */])

    useEffect(() => {
        submitInitialGamesToStore()
        //setGames({ ...entityState.lmsPlayers })
        // dispatch(updateGames())
    }, [])

    useEffect(() => {
        delayedUpdateMaxScores(width);
    }, [width])

    const delayedUpdateMaxScores = useCallback(debounce(score => updateMaxScores(score), 300), [maxScores])

    const updateMaxScores = (width: number) => {
        const score = Math.round((width - 391) / 71);
        if (score < 3) {
            setMaxScores(2);
            return;
        }
        setMaxScores(score);
    }

    const handleShowResult = () => {

    }

    const handleNewRound = () => {
        setRounds(rounds + 1);
    }

    const submitInitialGamesToStore = () => {
        const players = entityState.lmsPlayers;
        const storeGames: Games = {};
        let i = 0, j = 1;
        while (players[i] && players[i + 1]) {
            storeGames[`1-${j}`] = { player1: players[i].name, player2: players[i + 1].name }
            i += 2
            j++
        }

        dispatch(resetGames());
        dispatch(updateGames(storeGames));
    }
    //  debugger
    return (
        <Card ref={resizeRef} className={classes.cardRoot}>
            <div className={classes.tournamentGameContainerHeader}>
            </div>
            <CardContent
                className={classes.cardContent}
            >
                {[...Array(rounds).keys()].map((i) => {
                    return (
                        <GameListRound key={`gameListRound_${i}`} roundNubmer={i + 1} maxScores={maxScores} />
                    )
                })}
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <Button onClick={handleShowResult} color="default" size='small' type='button' className={classes.dialogButton}>
                    {t('Show Result')}
                </Button>
                <Button onClick={handleNewRound} color="default" size='small' type='button' className={classes.dialogButton}>
                    {t('New Round')}
                </Button>
            </CardActions>
        </Card>
    )
}

export default LastManStanding
