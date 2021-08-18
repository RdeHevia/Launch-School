/* eslint-disable max-lines-per-function */
const Car = require ("./car");

describe("The Car class", () => {

  let car;
  beforeEach(() => {
    car = new Car();
  });
  test ("has four wheels", () => {
    expect(car.wheels).toBe(4);
  });

  test('two new cars are equal objects', () => {
    let car2 = new Car();

    expect(car).toEqual(car2);
  });

  test('does not have doors',() => {
    expect(car.doors).toBeUndefined();
  });

  test('raises an error when called drive on it', () => {
    expect(() => car.drive()).toThrow();
  });

  test('a new car has no mileage info', () => {
    expect(car.mileageInfo).toBeNull();
  });

  test('wheels is truthy', () => {
    expect(car.wheels).toBeTruthy();
  });

  test('array contains car', () => {
    let arr = [1, 2, 3];
    arr.push(car);

    expect(arr).toContain(car);
  });

  test('string contains "car"', () => {
    let man = 'His scars have healed';
    expect(man).toContain("car");
  });

  test('car has wheels', () => {
    expect(car.wheels).not.toBeUndefined();
  });
});