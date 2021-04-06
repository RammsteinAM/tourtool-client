import { Nullable } from "./main";

interface BaseEntity {
    id?: number;
}

export interface BaseDatabaseEntity {
    id: number;
}

export type PlayerCategory = 'A' | 'B' | null;

export interface EntityById<E> {
    [byId: string]: E,
}

export interface EntityStateData<E> {
    byId: EntityById<E>,
    allIds: string[],
}

export interface StateGame extends BaseEntity {
    // player1?: string | [string, string],
    // player2?: string | [string, string],
    player1Id: number | [number, number],
    player2Id: number | [number, number],
    score1?: number,
    score2?: number,
    scores1?: number[],
    scores2?: number[],
    index: string,
    // round: number;
    // gameNumber: number;
}

export interface StateEliminationGame extends StateGame {
    hasByePlayer?: boolean,
    isPredetermined?: boolean,
}

// export interface StateLMSGame extends StateGame {
//     round: string,
// }

export type Games = {
    [key: string]: StateGame
}

export interface StateParticipant extends BaseEntity {
    name: string,
    category?: PlayerCategory,
}

export interface StateParticipantWithId {
    id: number;
    name: string,
    category?: PlayerCategory,
}

export interface FetchedPlayer extends BaseDatabaseEntity {
    name: string,
    weight?: number,
}

export interface FetchedTournament extends BaseDatabaseEntity {
    name: string,
    numberOfTables?: number,
    goals?: boolean,
    games?: FetchedGameData[];
    numberOfGoals?: number,
    draw?: boolean,
    sets: number;
    numberOfLives?: number;
    pointsForWin?: number,
    pointsForDraw?: number;
    tournamentTypeId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface FetchedCreatedGames extends BaseDatabaseEntity {
    games?: FetchedGameData[];
}

export interface DBGameData extends BaseEntity {
    index: string;
    player1?: { id: number }[],
    player2?: { id: number }[],
    scores1?: number[];
    scores2?: number[];
    tournamentId?: number;
    hasByePlayer?: boolean;
}

export type FetchedGameData = DBGameData & Required<BaseEntity> & { tournamentId?: number }

// export interface FetchedGameData extends BaseDatabaseEntity {
//     index: string;
//     tournamentId: number;
//     player1?: { id: number }[],
//     player2?: { id: number }[],
//     scores1?: StateScore;
//     scores2?: StateScore;
//     hasByePlayer?: boolean;
// }

export interface StateEliminationPlayer {
    id: number | [number, number],
    category?: PlayerCategory,
    bye?: boolean,
}

export interface StateLMSPlayer {
    id: number | [number, number],
    category?: PlayerCategory,
}

export interface StateTournament extends BaseEntity {
    name?: string,
    sets?: number;
    numberOfTables?: number,
    goals?: boolean,
    numberOfGoals?: number,
    draw?: boolean,
    numberOfLives?: number;
    thirdPlace?: boolean,
    pointsForWin?: number,
    pointsForDraw?: number;
}

export type StateParticipants = StateParticipant[];
export type StateParticipantsWithId = StateParticipantWithId[];
export type FetchedTournaments = { [id: number]: FetchedTournament };
export type FetchedPlayers = FetchedPlayer[];
export type FetchedGames = { [tournamentId: number]: FetchedGameData[] };
export type StateEliminationPlayers = StateEliminationPlayer[];
export type StateLMSPlayers = StateLMSPlayer[];
// export type StateGames = StateEliminationGame[];

export type EliminationPlayers = {
    [col: number]: StateEliminationPlayers
}

export type EliminationGames = {
    [key: string]: StateEliminationGame
}
export type StateScore = number[]/* {
    [set: number]: number;
} */

export interface LMSTableProps {
    name?: string;
    lives?: number;
    numberOfGames?: number;
    points?: number;
    averagePoints?: number;
    goals?: number;
    goalsIn?: number;
    goalDiff?: number;
    matchesWon?: number;
    matchesLost?: number;
    matchesDraw?: number;
}

export type LMSColOrderKeys = (keyof LMSTableProps);

export interface Player {
    id: number;
    name: string;
}

export type Players = Player[];

export interface TournamentCreationReqData {
    name: string;
    sets: number;
    tournamentTypeId: number;
    numberOfGoals?: number;
    numberOfLives?: number;
    numberOfTables?: number;
    draw?: boolean;
    thirdPlace?: boolean;
    pointsForWin?: number,
    pointsForDraw?: number;
    games?: DBGameData[];
}

export interface GamesCreationReqData {
    tournamentId: number;
    games?: DBGameData[];
}

export interface TournamentUpdateReqData {
    id: number;
    name?: string;
    sets?: number;
    tournamentTypeId?: number;
    numberOfGoals?: number;
    numberOfLives?: number;
    numberOfTables?: number;
    draw?: boolean;
    thirdPlace?: boolean;
    pointsForWin?: number,
    pointsForDraw?: number;
}

export interface GameCreationReqData {
    tournamentId: number;
    index: string,
    player1?: { id: number }[],
    player2?: { id: number }[],
    hasByePlayer?: boolean;
}

export interface GameUpdateReqData {
    id: number;
    player1?: { id: number }[],
    player2?: { id: number }[],
    scores1?: StateScore,
    scores2?: StateScore,
    hasByePlayer?: boolean;
}

export type TournamentTypes = 'elimination' | 'lms' | 'roundRobin';