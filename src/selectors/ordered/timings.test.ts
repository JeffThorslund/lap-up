import { calculateTotalTimeOfSinglePenaltyType, getTimings } from "./timings";

describe("penalty calculator", function () {
  test("zeros", () => {
    expect(calculateTotalTimeOfSinglePenaltyType(0, 0)).toBe(0);
  });

  test("real numbers", () => {
    expect(calculateTotalTimeOfSinglePenaltyType(11, 15)).toBe(165);
  });
});

describe.skip("time finder", () => {
  test("valid", () => {
    expect(getTimings({ start: 1, end: 99, penalties: {} }, {})).toBe(39);
  });

  test("invalid start", () => {
    expect(getTimings({ start: null, end: 99, penalties: {} }, {})).toBe(null);
  });

  test("invalid end", () => {
    expect(getTimings({ start: 100, end: null, penalties: null }, {})).toBe(
      null
    );
  });
});

// describe("time adjustor", () => {
//   const nullPenaltyConfig = {
//     number: null,
//     penalty: 0,
//   };
//
//   test("invalid time", () => {
//     expect(getAdjustedTime(null, nullPenaltyConfig, nullPenaltyConfig)).toBe(
//       null
//     );
//   });
//
//   test("valid no penalty config", () => {
//     expect(getAdjustedTime(6, nullPenaltyConfig, nullPenaltyConfig)).toBe(6);
//   });
//
//   const touchedPenaltyConfig: PenaltyConfig = {
//     number: 4,
//     penalty: 2,
//   };
//
//   const missedPenaltyConfig: PenaltyConfig = {
//     number: 1,
//     penalty: 50,
//   };
//
//   test("valid with missed and touched config", () => {
//     expect(
//       getAdjustedTime(1000, touchedPenaltyConfig, missedPenaltyConfig)
//     ).toBe(942);
//   });
// });
