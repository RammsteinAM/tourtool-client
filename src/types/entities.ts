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
    player1Id: number | [number, number],
    player2Id: number | [number, number],
    score1?: number,
    score2?: number,
    scores1?: number[],
    scores2?: number[],
    index: string,
}

export interface StateEliminationGame extends StateGame {
    hasByePlayer?: boolean,
    numberOfParticipants?: number,
}

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
    name: string;
    numberOfTables?: number;
    tablesByGameIndex?: { [index: string]: number };
    games?: FetchedGameData[];
    players?: number[];
    numberOfGoals?: number;
    sets: number;
    draw?: boolean;
    monsterDYP?: boolean;
    numberOfLives?: number;
    pointsForWin?: number;
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
    player1?: Player,
    player2?: Player,
    scores1?: number[];
    scores2?: number[];
    tournamentId?: number;
    hasByePlayer?: boolean;
}

export type FetchedGameData = DBGameData & Required<BaseEntity> & { tournamentId?: number }

export type FetchedGamesData = { tournamentId: number, games: MultipleDBGameData[], tablesByGameIndex: { [index: string]: number } }

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
    name?: string;
    sets?: number;
    numberOfTables?: number;
    goals?: boolean;
    numberOfGoals?: number;
    draw?: boolean;
    numberOfLives?: number;
    thirdPlace?: boolean;
    pointsForWin?: number;
    pointsForDraw?: number;
}

export type StateParticipants = StateParticipant[];
export type StateParticipantsWithId = StateParticipantWithId[];
export type FetchedTournaments = { [id: number]: FetchedTournament };
export type FetchedPlayers = FetchedPlayer[];
export type FetchedGames = { [tournamentId: number]: FetchedGameData[] };
export type StateEliminationPlayers = StateEliminationPlayer[];
export type StateLMSPlayers = StateLMSPlayer[];

export type EliminationGames = {
    [key: string]: StateEliminationGame
}
export type StateScore = number[];

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

export type Player = { id: number }[];

export interface TournamentCreationReqData {
    name: string;
    sets: number;
    tournamentTypeId: number;
    numberOfGoals?: number;
    numberOfLives?: number;
    numberOfTables?: number;
    draw?: boolean;
    monsterDYP?: boolean;
    thirdPlace?: boolean;
    pointsForWin?: number,
    pointsForDraw?: number;
    games?: DBGameData[];
    players?: number[];
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
    player1?: Player,
    player2?: Player,
    hasByePlayer?: boolean;
}

export interface GameUpdateReqData {
    id: number;
    player1?: Player,
    player2?: Player,
    scores1?: StateScore,
    scores2?: StateScore,
    hasByePlayer?: boolean;
    tournamentId?: number;
}

export interface MultipleDBGameData {
    id: number;
    player1?: Player,
    player2?: Player,
    scores1?: StateScore,
    scores2?: StateScore,
    index: string;
    hasByePlayer?: boolean;
    tournamentId?: number;
}

export type TournamentTypes = 'elimination' | 'lms' | 'roundRobin';

export type TournamentDownloadData =
    Omit<FetchedTournament, "id" | "userId" | "updatedAt"> &
    {
        games: Omit<DBGameData, 'id' | 'tournamentId'>,
        playersWithNames: { id: number, name: string }[]
    }