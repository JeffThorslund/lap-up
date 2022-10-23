import { calculateTotalTimeOfSinglePenaltyType } from "./timings";

describe("penalty calculator", function () {
  test("zeros", () => {
    expect(calculateTotalTimeOfSinglePenaltyType(0, 0)).toBe(0);
  });

  test("real numbers", () => {
    expect(calculateTotalTimeOfSinglePenaltyType(11, 15)).toBe(165);
  });
});
