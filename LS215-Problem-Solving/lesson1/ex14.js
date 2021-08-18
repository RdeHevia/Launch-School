/*
P: rectangle = [height, width]
I: array of rectangles [rect1, rect2...]
O: area of all the rectangles
ALGORITHM:
1. Calculate the area of every rectangle (map)
2. Sum all the areas together (reduce)
*/
/*
totalSquareArea
ALGORITHM:
1. Filter the rectangles that are squares (width === height)
2. Calculate the area of every square
3. Summ all areas together
2 + 3 0 -> totalArea
*/

const rectangleArea = (width, height) => width * height;

function totalArea(rectangles) {
  let areas = rectangles.map(rectangle => rectangleArea(...rectangle));
  return areas.reduce((sum, currentArea) => sum + currentArea);
}

function totalSquareArea(rectangles) {
  let squares = rectangles.filter(rectangle => rectangle[0] === rectangle[1]);
  return totalArea(squares);
}

let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

console.log(totalArea(rectangles));    // 141
console.log(totalSquareArea(rectangles));    // 121