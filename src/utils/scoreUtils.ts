import { StateScore } from "../types/entities";

export const getMultipleSetScores = (scores1: StateScore, scores2: StateScore, sets: number): { score1: number, score2: number, winners: number[] } => {
  let score1 = scores1[1], score2 = scores2[1];
  const winners: number[] = [];
  if (sets > 1) {
    score1 = 0;
    score2 = 0;
    for (let i = 1; i <= Object.keys(scores1).length; i++) {
      const subScore1 = scores1[i];
      const subScore2 = scores2[i];
      if (subScore1 > subScore2) {
        score1 += 1;
        winners.push(1);
      }
      if (subScore1 < subScore2) {
        score2 += 1;
        winners.push(2);
      }
    }
  }
  return { score1, score2, winners };
}