import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { EliminationGames, EliminationPlayers, StateGames, StatePlayers } from '../../types/entities';
import EliminationSidebar from '../../components/Tournament/EliminationSidebar';
import { updateGames, updatePlayers } from '../../redux/tournamentEntities/actions';
import CreateTournamentDialog from '../../components/Tournament/CreateTournamentDialog';
import tournamentStyles from './tournamentStyles';
import { splitGameKey } from '../../utils/stringUtils';
import EliminationCard from './EliminationCard';

const initialPlayers = { 1: [] }

interface Props {

}

const Elimination = (props: Props) => {
    const [players, setPlayers] = useState<EliminationPlayers>(initialPlayers);

    const [games, setGames] = useState<EliminationGames>({});
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const firstRoundGameNumber = Object.keys(games).filter(gameKey => splitGameKey(gameKey).round === 1).length;
    const dispatch = useDispatch();
    const numberOfPlayers = entityState.players.length;
    //const firstRoundGameNumber: number = 2 ** Math.ceil((Math.log(numberOfPlayers) / Math.log(2)) - 1);
    // const byePlayerNumber: number = 2 ** Math.ceil(Math.log(numberOfPlayers) / Math.log(2)) - numberOfPlayers;
    const columns = Math.log(Object.keys(games).length + 1) / Math.log(2);
    const classes = tournamentStyles();
    const { t } = useTranslation();

    useEffect(() => {

        setGames({ ...entityState.games })

    }, [/* entityState.players */])

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleStartTournament = (e: React.FormEvent, name: string) => {
        e.preventDefault();
        alert(name);
        //setDialogOpen(false);
    };

    const getByeIndexes = (n: number) => {
        if (Math.log(32) / Math.log(2) % 1 !== 0) return null;
        return [
            2, n,
            n / 2, n / 2 + 2,
            n / 4, 3 * n / 4, n / 4 + 2, 3 * n / 4 + 2,
            n / 8, 5 * n / 8, 3 * n / 8, 7 * n / 8, n / 8 + 2, 5 * n / 8 + 2, 3 * n / 8 + 2, 7 * n / 8 + 2,
            n / 16, 9 * n / 16, 5 * n / 16, 13 * n / 16, 3 * n / 16, 11 * n / 16, 7 * n / 16, 15 * n / 16, n / 16 + 2, 9 * n / 16 + 2, 5 * n / 16 + 2, 13 * n / 16 + 2, 3 * n / 16 + 2, 11 * n / 16 + 2, 7 * n / 16 + 2
            //n / 32, 17 * n / 32, 9 * n / 32, 25 * n / 32, 5 * n / 32
        ]
    }


    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
        handleDialogOpen();
    }

    const renderTree = () => {
        const result = [];
        for (let colNumber = 1; colNumber <= columns; colNumber++) {
            const finalNumberDivider: number = 2 ** (columns - colNumber);
            result.push(
                <div key={`gameColumn_${colNumber}`}>
                    <div className={classes.gameColumn}>
                        <div>
                            <div className={classes.gameColumnHeader}>
                                <span>{finalNumberDivider >= 4 && '1/' + finalNumberDivider} </span>
                                <span>{finalNumberDivider === 2 ? t('Semifinal') : t('Final', { count: finalNumberDivider })} </span>
                            </div>
                            <div className={classes.gameColumnContent}>
                                {renderCards(colNumber)}
                            </div>
                        </div>
                        {
                            columns - colNumber >= 1 &&
                            <div className={classes.gameBetweenColumnsSpace}>
                                {renderBetweenColumnSpaces(colNumber)}
                            </div>
                        }
                    </div>
                </div>
            )
        }
        return result;
    }

    const renderCards = (columnNumber: number) => {
        const result = [];
        const numberOfGames = firstRoundGameNumber / (2 ** (columnNumber - 1));
        for (let i = 1; i <= numberOfGames; i++) {
            const p1 = games[`${columnNumber}-${i}`]?.player1;
            const p2 = games[`${columnNumber}-${i}`]?.player2;
            const final1 = games[`final`]?.player1;
            const final2 = games[`final`]?.player2;
            const thirdPlaceP1 = games[`thirdPlace`]?.player1;
            const thirdPlaceP2 = games[`thirdPlace`]?.player2;
            if (i === 1 && columnNumber === columns && entityState.tournament.thirdPlace) {
                result.push(
                    <div className={classes.gameColumnWithThirdPlace} key={`gameCard_${columnNumber}_${i}`}>
                        <EliminationCard
                            key={`gameCard_${columnNumber}_${i}`}
                            player1={final1}
                            player2={final2}
                            active
                            gameKey={`final`}
                        />
                        <div className={classes.gameCardThirdPlace}>
                            <div className={classes.gameColumnHeader}>
                                <span>{t('Third Place')}</span>
                            </div>
                            <EliminationCard
                                player1={thirdPlaceP1}
                                player2={thirdPlaceP2}
                                active
                                gameKey={`thirdPlace`}
                            />
                        </div>
                    </div>
                    )
                    continue;
            }
            result.push(
                <EliminationCard
                    key={`gameCard_${columnNumber}_${i}`}
                    player1={p1}
                    player2={p2}
                    active
                    gameKey={`${columnNumber}-${i}`}
                />
            )
        }
        return result;
    }

    const renderBetweenColumnSpaces = (columnNumber: number) => {
        const result = [];
        for (let i = firstRoundGameNumber / (2 ** (columnNumber - 1)) / 2; i >= 1; i--) {
            result.push(
                <div
                    key={`gameCardLines_${columnNumber}_${i}`}
                    style={{ height: `calc(4 * (25% - ${95 * firstRoundGameNumber / 8}px)/${firstRoundGameNumber / ((2 ** (columnNumber - 1)) * 2)})` }}
                    className={classes.gameBetweenColumnSpaceItem}
                >
                    <div className={classes.gameConnectiongLines_Top}></div>
                    <div className={classes.gameConnectiongLines_TopCorner}></div>
                    <div className={classes.gameConnectiongLines_MiddleV}></div>
                    <div className={classes.gameConnectiongLines_MiddleH}></div>
                    <div className={classes.gameConnectiongLines_BottomCorner}></div>
                    <div className={classes.gameConnectiongLines_Bottom}></div>
                </div>
            )
        }
        return result;
    }

    return (
        <div>
            <form className={classes.form} onSubmit={handleSubmit} id='elimination-form'>
                <div
                    className={classes.eliminationCardsContainer}
                    style={{ transform: `scale(${settingsState.eliminationScale || '1'})`, transformOrigin: 'top left', }}
                >
                    {renderTree()}
                </div>
            </form>
            <CreateTournamentDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onSubmit={handleStartTournament}
            />
        </div>
    )
}

export default Elimination
