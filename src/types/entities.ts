import { Nullable } from "./main";

interface BaseEntity {
    id?: string;
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
    player1: string | [string, string],
    player2: string | [string, string],
    score1?: number,
    score2?: number,
    scores1?: number[],
    scores2?: number[],
}

export interface StateEliminationGame extends StateGame {
    index: string,
    hasByePlayer?: boolean,
}

export interface StateParticipant extends BaseEntity {
    name: string,
    category?: PlayerCategory,
    bye?: boolean,
}

export interface StatePlayer extends BaseEntity {
    name: string | [string, string],
    category?: PlayerCategory,
    bye?: boolean,
}

export interface StateTournament extends BaseEntity {
    name?: string,
    numberOfTables?: number,
    goals?: boolean,
    numberOfGoals?: number,
    draw?: boolean,
    winningSets?: number;
    numberOfLives?: number;
    thirdPlace?: boolean,
}

export type StateParticipants = StateParticipant[];
export type StatePlayers = StatePlayer[];
export type StateGames = StateEliminationGame[];

export type EliminationPlayers = { 
    [col: number]: StatePlayers
}

export type Games = { 
    [key: string]: StateGame
}

export type EliminationGames = { 
    [key: string]: StateEliminationGame
}
export interface StateScore {
    [set: number]: number;
}