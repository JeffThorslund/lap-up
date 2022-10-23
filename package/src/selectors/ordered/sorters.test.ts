import { sortRacesByNonIncreasing } from "./sorters";

describe("sort by smallest time, with nulls last", () => {
  test("null a", () => {
    expect(sortRacesByNonIncreasing(null, 1)).toBe(1);
  });

  test("null b", () => {
    expect(sortRacesByNonIncreasing(1, null)).toBe(-1);
  });

  test("both null", () => {
    expect(sortRacesByNonIncreasing(null, null)).toBe(1);
  });

  test("a > b", () => {
    expect(sortRacesByNonIncreasing(10, 1)).toBe(9);
  });

  test("a < b", () => {
    expect(sortRacesByNonIncreasing(1, 19)).toBe(-18);
  });

  // implement func with sort
  test("full  with empty arr", () => {
    expect([].sort(sortRacesByNonIncreasing)).toEqual([]);
  });

  test("full function", () => {
    expect(
      [1, 4, null, 1, 7, 8, null, 3, 122, null, 6, 34].sort(
        sortRacesByNonIncreasing
      )
    ).toEqual([1, 1, 3, 4, 6, 7, 8, 34, 122, null, null, null]);
  });
});
