import { FetchedGameData, FetchedPlayer, StateParticipant, StateParticipants } from "../types/entities";
import { Nullable } from "../types/main";

export const shuffleArray = <A>(array: A[]): A[] => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const getNthIndexOf = (arr: any[], value: any, n: number) => {
  const position = arr.reduce((acc, val, i) => {
    if (val === value) {
      if (acc.count + 1 === n) {
        acc['index'] = i;
      };
      acc['count']++;
    }
    return acc;
  }, {
    index: -1,
    count: 0
  });
  return position.index;
};

export const getScoresFromPressedKeys = (arr: string[]): Nullable<[number, number]> => {
  const score1Arr: string[] = [];
  const score2Arr: string[] = [];
  if (arr.filter(val => val === 'Enter').length !== 2) {
    return null;
  }
  const enterPosition = arr.indexOf('Enter');
  arr.forEach((val, i: number) => {
    if (Number(val) >= 0) {
      if (i < enterPosition) {
        score1Arr.push(val);
      }
      else {
        score2Arr.push(val);
      }
    }
  })
  if (score1Arr.length === 0 || score2Arr.length === 0) {
    return null;
  }
  const score1 = parseInt(score1Arr.join(''))
  const score2 = parseInt(score2Arr.join(''))
  return [score1, score2];
}

export const getNormalizedParticipants = (storeParticipants: StateParticipants): { [id: number]: FetchedPlayer } => {
  return storeParticipants.reduce((acc: { [id: number]: any }, val: StateParticipant) => {
    if (!val.id) {
      return acc;
    }
    acc[val.id] = val;
    return acc;
  }, {})
}

export const getNormalizedGames = (fetchedGames: FetchedGameData[]): { [index: string]: FetchedGameData } => {
  return fetchedGames?.reduce((acc: { [index: string]: FetchedGameData }, val: FetchedGameData) => {
    if (!val.index) {
      return acc;
    }
    acc[val.index] = val;
    // val.scores1 && acc[val.index].scores1 = val.scores1;
    return acc;
  }, {})
}