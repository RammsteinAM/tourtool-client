export const isPowerOfTwo = (x: number) => {
  return (Math.log(x)/Math.log(2)) % 1 === 0;
}