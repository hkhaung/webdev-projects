// Generate initial card values
export function generateInitialValues(totalCells, maxNumber) {
  const cardsArray = Array.from({ length: maxNumber }, (_, i) => i + 1);
  const gridArray = Array.from({ length: totalCells }, () => null);
  const numberIndices = [];

  cardsArray.forEach((number) => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * totalCells);
    } while (gridArray[randomIndex] !== null);

    gridArray[randomIndex] = number;
    numberIndices.push(randomIndex);
  });

  return { gridArray, numberIndices };
}