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
  if (score1Arr.length  === 0 || score2Arr.length  === 0 ) {
    return null;
  }
  const score1 = parseInt(score1Arr.join(''))
  const score2 = parseInt(score2Arr.join(''))
  return [score1, score2];
}

// export const getDiff = <T>(a1: T[], a2: T[]) => {
//   const a = [], diff: T[]  = [];

//   for (var i = 0; i < a1.length; i++) {
//       a[a1[i]] = true;
//   }

//   for (var i = 0; i < a2.length; i++) {
//       if (a[a2[i]]) {
//           delete a[a2[i]];
//       } else {
//           a[a2[i]] = true;
//       }
//   }

//   for (var k in a) {
//       diff.push(k);
//   }

//   return diff;
// }