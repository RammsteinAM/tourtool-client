import { TournamentTypes } from "../types/entities";

export const appName = "TourTool";

export const formMinMaxValues = {
    minTables: 1,
    maxTables: 200,
    minGoals: 1,
    maxGoals: 100,
}

export const tournamentTypeIds: Record<TournamentTypes, number> = {
    elimination: 1,
    lms: 2,
    roundRobin: 3,
}