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

export interface FetchedPlayer extends BaseEntity {
    name: string,
    weight?: number,
}

export interface FetchedTournament extends BaseDatabaseEntity {
    name: string,
    numberOfTables?: number,
    goals?: boolean,
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

export interface StateEliminationPlayer {
    id: number | [number, number],
    // name?: string | [string, string],
    category?: PlayerCategory,
    bye?: boolean,
}

export interface StateLMSPlayer {
    id: number | [number, number],
    // name?: string | [string, string],
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
export type StateEliminationPlayers = StateEliminationPlayer[];
export type StateLMSPlayers = StateLMSPlayer[];
// export type StateGames = StateEliminationGame[];

export type EliminationPlayers = {
    [col: number]: StateEliminationPlayers
}

export type EliminationGames = {
    [key: string]: StateEliminationGame
}
export interface StateScore {
    [set: number]: number;
}

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

export type TournamentTypes = 'elimination' | 'lms' | 'roundRobin';