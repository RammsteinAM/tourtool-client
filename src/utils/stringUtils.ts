import { Nullable } from "../types/main";

interface GameKeyParts {
  round: number;
  gameNumber: number;
}

export const splitGameKey = (gameKey: string): GameKeyParts => {
  return { round: parseInt(gameKey.split('-')[0]), gameNumber: parseInt(gameKey.split('-')[1]) };
}

export const getNextGameKey = (gameKey: string, finalRoundNumber: number): Nullable<string> => {
  const round = splitGameKey(gameKey).round;
  const gameNumber = splitGameKey(gameKey).gameNumber;
  const isGameOdd = gameNumber % 2 === 1;
  const nextGameKey = round <= finalRoundNumber - 1 ?
    `${round + 1}-${isGameOdd ? (gameNumber + 1) / 2 : gameNumber / 2}` : null;
  return nextGameKey;
}