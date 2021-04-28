import { Nullable } from "../types/main";
import { thirdPlaceIndex } from "./constants";

interface GameKeyParts {
  round: number;
  gameNumber: number;
}

export const splitGameKey = (gameKey: string): GameKeyParts => {
  if (gameKey === thirdPlaceIndex) {
    return { round: -1, gameNumber: -1 };
  }
  return { round: parseInt(gameKey.split('-')[0]), gameNumber: parseInt(gameKey.split('-')[1]) };
}

export const getNextGameKey = (gameKey: string, finalRoundNumber: number): Nullable<string> => {
  const round = splitGameKey(gameKey).round;
  if (round === -1) {
    return null;
  }
  const gameNumber = splitGameKey(gameKey).gameNumber;
  const isGameOdd = gameNumber % 2 === 1;
  const nextGameKey = round <= finalRoundNumber - 1 ?
    `${round + 1}-${isGameOdd ? (gameNumber + 1) / 2 : gameNumber / 2}` : null;
  return nextGameKey;
}

export const capitalizeNthChar = (string: string, n = 0) => 
{
    return string.charAt(n).toUpperCase() + string.slice(1);
}