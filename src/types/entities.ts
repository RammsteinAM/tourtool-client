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
    name: string,
    category: PlayerCategory,
    
}

export interface StatePlayer extends BaseEntity {
    name: string,
    category: PlayerCategory,
    bye?: boolean,
}

export type StatePlayers = StatePlayer[];

export type EliminationPlayers = { 
    [col: number]: StatePlayers
}
