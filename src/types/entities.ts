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

export interface StateLMSGame extends StateGame {
    round: string,
}

export interface StateParticipant extends BaseEntity {
    name: string,
    category?: PlayerCategory,
}

export interface StateEliminationPlayer extends BaseEntity {
    name: string | [string, string],
    category?: PlayerCategory,
    bye?: boolean,
}

export interface StateLMSPlayer extends BaseEntity {
    name: string | [string, string],
    category?: PlayerCategory,
}

export interface StateTournament extends BaseEntity {
    name?: string,
    numberOfTables?: number,
    goals?: boolean,
    numberOfGoals?: number,
    draw?: boolean,
    sets?: number;
    numberOfLives?: number;
    thirdPlace?: boolean,
    pointsForWin?: number,
    pointsForDraw?: number;
}

export type StateParticipants = StateParticipant[];
export type StateEliminationPlayers = StateEliminationPlayer[];
export type StateLMSPlayers = StateLMSPlayer[];
export type StateGames = StateEliminationGame[];

export type EliminationPlayers = { 
    [col: number]: StateEliminationPlayers
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

export interface LMSTableProps {
    name?: string;
    lives?: number;
    numberOfGames?: number;
    points?: number;
    goals?: number;
    goalsIn?: number;
    goalDiff?: number;
}

export type LMSColOrderKeys = (keyof LMSTableProps);