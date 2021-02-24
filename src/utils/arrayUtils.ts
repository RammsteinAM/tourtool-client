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
  const position = arr.reduce((acc, val, ind) => {
    if (val === value) {
      if (acc.count + 1 === n) {
        acc['index'] = ind;
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