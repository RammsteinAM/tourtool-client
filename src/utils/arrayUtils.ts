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