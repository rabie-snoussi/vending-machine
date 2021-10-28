const changeCount = (cost: number, coin: number) => {
  if (cost >= coin) {
    const result = Math.floor(cost / coin);
    const left = cost - result * coin;
    return { result: { [coin]: result }, left };
  }
  return { result: {}, left: cost };
};

export const userChange = (totalCost: number, deposit: number) => {
  if (totalCost === deposit) return {};

  const { result: hundreds, left: leftFromHundreds } = changeCount(
    totalCost,
    100,
  );
  const { result: fifties, left: leftFromFifties } = changeCount(
    leftFromHundreds,
    50,
  );
  const { result: twenties, left: leftFromTwenties } = changeCount(
    leftFromFifties,
    20,
  );
  const { result: tens, left: leftFromTens } = changeCount(
    leftFromTwenties,
    10,
  );
  const { result: fives } = changeCount(leftFromTens, 5);

  return {
    ...hundreds,
    ...fifties,
    ...twenties,
    ...tens,
    ...fives,
  };
};
