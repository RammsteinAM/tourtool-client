interface GameKeyParts {
  round: number;
  gameNumber: number;
}

export const splitGameKey = (value: string): GameKeyParts => {
  return { round: parseInt(value.split('-')[0]), gameNumber: parseInt(value.split('-')[1]) };
}