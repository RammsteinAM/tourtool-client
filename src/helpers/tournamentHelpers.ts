import { Players } from "../pages/Tournaments/LastManStanding";
import { FetchedGameData, FetchedPlayer, FetchedPlayers, FetchedTournament, FetchedTournamentForView } from "../types/entities";
import { multiDimensionalUnique } from "../utils/arrayUtils";
import { getMultipleSetScores } from "../utils/scoreUtils";

const getPlayersInitialData = (tournamentPlayers: FetchedPlayers, tournamentData: FetchedTournament, gameData: FetchedGameData[], normalizedPlayers: { [id: number]: FetchedPlayer }, isDYP: boolean): Players => {
    const numberOfLives = tournamentData.numberOfLives;
    if (typeof numberOfLives !== 'number') return {};

    const pairs = isDYP ? multiDimensionalUnique(gameData.reduce((acc: [number, number][], val: FetchedGameData) => {
        if (!val.index || !val.player1 || !val.player2) {
            return acc;
        }
        acc.push([val.player1[0].id, val.player1[1].id], [val.player2[0].id, val.player2[1].id])
        return acc;
    }, [])) : null;

    if (!isDYP) {
        const players = tournamentPlayers.reduce((acc: Players, val) => {
            acc[val.id] = {
                id: val.id,
                lives: numberOfLives,
                numberOfGames: 0,
                points: 0,
                goals: 0,
                goalsIn: 0,
                matchesWon: 0,
                matchesLost: 0,
            }
            return acc;
        }, {});
        return players;
    }
    else {
        if (!pairs) return {};
        const players = pairs.reduce((acc: Players, val) => {
            const pName = `${normalizedPlayers[val[0]]?.name} / ${normalizedPlayers[val[1]]?.name}`;
            acc[pName] = {
                id: [val[0], val[1]],
                lives: numberOfLives,
                numberOfGames: 0,
                points: 0,
                goals: 0,
                goalsIn: 0,
                matchesWon: 0,
                matchesLost: 0,
            }
            return acc;
        }, {});
        return players;
    }
}

export const calculatePlayersDataWithStats = (
    tournamentData: FetchedTournament,
    gameData: FetchedGameData[],
    players: FetchedPlayers,
    normalizedPlayers: { [id: number]: FetchedPlayer },
    isDYP: boolean
): Players => {
    const pointsForWin = tournamentData?.pointsForWin;
    const pointsForDraw = tournamentData?.pointsForDraw;
    const tournamentPlayers = players.filter(p => tournamentData.players && tournamentData.players.indexOf(p.id) >= 0)
    if (typeof pointsForWin !== 'number' || typeof pointsForDraw !== 'number') return {};

    const initialPlayers = getPlayersInitialData(tournamentPlayers, tournamentData, gameData, normalizedPlayers, isDYP);

    const playersData = gameData?.reduce((acc, val, i) => {
        if (!val.scores1 || !val.scores2 || val.scores1.length === 0 || val.scores2.length === 0 || !normalizedPlayers) {
            return acc;
        }
        const { score1, score2 } = getMultipleSetScores(val.scores1, val.scores2, val.scores1.length);
        const scores1Sum = val.scores1.reduce((acc, val) => acc + val);
        const scores2Sum = val.scores2.reduce((acc, val) => acc + val);

        if (!val.player1 || !val.player2) {
            return acc;
        }

        const id1_0 = val.player1[0] && val.player1[0].id;
        const id1_1 = val.player1[1] && val.player1[1].id;
        const id2_0 = val.player2[0] && val.player2[0].id;
        const id2_1 = val.player2[1] && val.player2[1].id;

        // SINGLE, TEAM, MONSTER DYP
        if (id1_0 && id2_0 && acc[id1_0] && acc[id2_0] && ((!id1_1 && !id2_1) || tournamentData?.monsterDYP)) {
            acc[id1_0].numberOfGames++;
            acc[id2_0].numberOfGames++;
            acc[id1_0].goals += scores1Sum;
            acc[id2_0].goals += scores2Sum;
            acc[id1_0].goalsIn += scores2Sum;
            acc[id2_0].goalsIn += scores1Sum;

            if (score1 > score2) {
                acc[id1_0].points += pointsForWin;
                acc[id1_0].matchesWon += 1;
                acc[id2_0].matchesLost += 1;
                acc[id2_0].lives--;
            }
            if (score1 < score2) {
                acc[id2_0].points += pointsForWin;
                acc[id2_0].matchesWon += 1;
                acc[id1_0].matchesLost += 1;
                acc[id1_0].lives--;
            }
            if (score1 === score2) {
                acc[id1_0].points += pointsForDraw;
                acc[id2_0].points += pointsForDraw;
            }

            // MONSTER DYP ONLY
            if (id1_1 && id2_1 && acc[id1_1] && acc[id2_1]) {
                acc[id1_1].numberOfGames++;
                acc[id2_1].numberOfGames++;
                acc[id1_1].goals += scores1Sum;
                acc[id2_1].goals += scores2Sum;
                acc[id1_1].goalsIn += scores2Sum;
                acc[id2_1].goalsIn += scores1Sum;
                if (score1 > score2) {
                    acc[id1_1].points += pointsForWin;
                    acc[id1_1].matchesWon += 1;
                    acc[id2_1].matchesLost += 1;
                    acc[id2_1].lives--;
                }
                if (score1 < score2) {
                    acc[id2_1].points += pointsForWin;
                    acc[id2_1].matchesWon += 1;
                    acc[id1_1].matchesLost += 1;
                    acc[id1_1].lives--;
                }
                if (score1 === score2) {
                    acc[id1_1].points += pointsForDraw;
                    acc[id2_1].points += pointsForDraw;
                }
            }
        }
        // DYP
        else if (id1_0 && id2_0 && id1_1 && id2_1) {
            const participant1Name = `${normalizedPlayers[id1_0]?.name} / ${normalizedPlayers[id1_1]?.name}`;
            const participant2Name = `${normalizedPlayers[id2_0]?.name} / ${normalizedPlayers[id2_1]?.name}`;
            if (!acc[participant1Name] || !acc[participant2Name]) {
                return acc
            }

            acc[participant1Name].numberOfGames++;
            acc[participant2Name].numberOfGames++;

            acc[participant1Name].goals += scores1Sum;
            acc[participant2Name].goals += scores2Sum;

            acc[participant1Name].goalsIn += scores2Sum;
            acc[participant2Name].goalsIn += scores1Sum;

            if (score1 > score2) {
                acc[participant1Name].points += pointsForWin;
                acc[participant1Name].matchesWon += 1;
                acc[participant2Name].matchesLost += 1;
                acc[participant2Name].lives--;
            }
            if (score1 < score2) {
                acc[participant2Name].points += pointsForWin;
                acc[participant2Name].matchesWon += 1;
                acc[participant1Name].matchesLost += 1;
                acc[participant1Name].lives--;
            }
            if (score1 === score2) {
                acc[participant1Name].points += pointsForDraw;
                acc[participant2Name].points += pointsForDraw;
            }
        }

        return acc;
    }, initialPlayers);

    return playersData;
};

export const getPlayersInitialDataForWatch = (data: FetchedTournamentForView, normalizedTournamentPlayers: { [ind: number]: string }) => {
    const numberOfLives = data.numberOfLives;

    const isDYP = !data?.monsterDYP && data.games?.find(game => game.index === '1-1')?.player1?.length === 2;

    if (typeof numberOfLives !== 'number' || !normalizedTournamentPlayers) {
        return {};
    }

    const pairs = isDYP ? multiDimensionalUnique(data.games.reduce((acc: [number, number][], val) => {
        if (!val.index || !val.player1 || !val.player2) {
            return acc;
        }
        acc.push([val.player1[0].id, val.player1[1].id], [val.player2[0].id, val.player2[1].id])
        return acc;
    }, [])) : null;

    if (!isDYP) {
        const players = Object.keys(normalizedTournamentPlayers).reduce((acc: Players, val) => {
            acc[val] = {
                id: Number(val),
                lives: numberOfLives,
                numberOfGames: 0,
                points: 0,
                goals: 0,
                goalsIn: 0,
                matchesWon: 0,
                matchesLost: 0,
            }
            return acc;
        }, {});
        return players;
    }
    else {
        if (!pairs) return {};
        const players = pairs.reduce((acc: Players, val) => {
            const pName = `${normalizedTournamentPlayers[val[0]]} / ${normalizedTournamentPlayers[val[1]]}`;
            acc[pName] = {
                id: [val[0], val[1]],
                lives: numberOfLives,
                numberOfGames: 0,
                points: 0,
                goals: 0,
                goalsIn: 0,
                matchesWon: 0,
                matchesLost: 0,
            }
            return acc;
        }, {});
        return players;
    }
}

export const calculatePlayersDataWithStatsForWatch = (data: FetchedTournamentForView, normalizedPlayers: { [id: number]: string }): Players => {
    const pointsForWin = data?.pointsForWin;
    const pointsForDraw = data?.pointsForDraw;

    // const tournamentPlayers = players.filter(p => tournamentData.players && tournamentData.players.indexOf(p.id) >= 0)
    if (typeof pointsForWin !== 'number' || typeof pointsForDraw !== 'number' || !normalizedPlayers) return {};

    const initialPlayers = getPlayersInitialDataForWatch(data, normalizedPlayers);

    const playersData = data.games?.reduce((acc, val, i) => {
        if (!val.scores1 || !val.scores2 || val.scores1.length === 0 || val.scores2.length === 0) {
            return acc;
        }
        const { score1, score2 } = getMultipleSetScores(val.scores1, val.scores2, val.scores1.length);
        const scores1Sum = val.scores1.reduce((acc, val) => acc + val);
        const scores2Sum = val.scores2.reduce((acc, val) => acc + val);

        if (!val.player1 || !val.player2) {
            return acc;
        }

        const id1_0 = val.player1[0] && val.player1[0].id;
        const id1_1 = val.player1[1] && val.player1[1].id;
        const id2_0 = val.player2[0] && val.player2[0].id;
        const id2_1 = val.player2[1] && val.player2[1].id;

        // SINGLE, TEAM, MONSTER DYP
        if (id1_0 && id2_0 && acc[id1_0] && acc[id2_0] && ((!id1_1 && !id2_1) || data?.monsterDYP)) {
            acc[id1_0].numberOfGames++;
            acc[id2_0].numberOfGames++;
            acc[id1_0].goals += scores1Sum;
            acc[id2_0].goals += scores2Sum;
            acc[id1_0].goalsIn += scores2Sum;
            acc[id2_0].goalsIn += scores1Sum;

            if (score1 > score2) {
                acc[id1_0].points += pointsForWin;
                acc[id1_0].matchesWon += 1;
                acc[id2_0].matchesLost += 1;
                acc[id2_0].lives--;
            }
            if (score1 < score2) {
                acc[id2_0].points += pointsForWin;
                acc[id2_0].matchesWon += 1;
                acc[id1_0].matchesLost += 1;
                acc[id1_0].lives--;
            }
            if (score1 === score2) {
                acc[id1_0].points += pointsForDraw;
                acc[id2_0].points += pointsForDraw;
            }

            // MONSTER DYP ONLY
            if (id1_1 && id2_1 && acc[id1_1] && acc[id2_1]) {
                acc[id1_1].numberOfGames++;
                acc[id2_1].numberOfGames++;
                acc[id1_1].goals += scores1Sum;
                acc[id2_1].goals += scores2Sum;
                acc[id1_1].goalsIn += scores2Sum;
                acc[id2_1].goalsIn += scores1Sum;
                if (score1 > score2) {
                    acc[id1_1].points += pointsForWin;
                    acc[id1_1].matchesWon += 1;
                    acc[id2_1].matchesLost += 1;
                    acc[id2_1].lives--;
                }
                if (score1 < score2) {
                    acc[id2_1].points += pointsForWin;
                    acc[id2_1].matchesWon += 1;
                    acc[id1_1].matchesLost += 1;
                    acc[id1_1].lives--;
                }
                if (score1 === score2) {
                    acc[id1_1].points += pointsForDraw;
                    acc[id2_1].points += pointsForDraw;
                }
            }
        }
        // DYP
        else if (id1_0 && id2_0 && id1_1 && id2_1) {
            const participant1Name = `${normalizedPlayers[id1_0]} / ${normalizedPlayers[id1_1]}`;
            const participant2Name = `${normalizedPlayers[id2_0]} / ${normalizedPlayers[id2_1]}`;
            if (!acc[participant1Name] || !acc[participant2Name]) {
                return acc
            }

            acc[participant1Name].numberOfGames++;
            acc[participant2Name].numberOfGames++;

            acc[participant1Name].goals += scores1Sum;
            acc[participant2Name].goals += scores2Sum;

            acc[participant1Name].goalsIn += scores2Sum;
            acc[participant2Name].goalsIn += scores1Sum;

            if (score1 > score2) {
                acc[participant1Name].points += pointsForWin;
                acc[participant1Name].matchesWon += 1;
                acc[participant2Name].matchesLost += 1;
                acc[participant2Name].lives--;
            }
            if (score1 < score2) {
                acc[participant2Name].points += pointsForWin;
                acc[participant2Name].matchesWon += 1;
                acc[participant1Name].matchesLost += 1;
                acc[participant1Name].lives--;
            }
            if (score1 === score2) {
                acc[participant1Name].points += pointsForDraw;
                acc[participant2Name].points += pointsForDraw;
            }
        }

        return acc;
    }, initialPlayers);
    return playersData;
};