export const calcTargetPrice = (price: number, profit: number): number =>
  price * (1 + profit);

export const calcProfit = (price: number, targetPrice: number): number => {
  const expectedResult = price !== 0
    ? (targetPrice / price - 1)
    : 0;

  return Math.max(expectedResult, 0);
};
