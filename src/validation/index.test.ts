import { index } from "./index";

describe("end results validation based on config", () => {
  test("does function run", () => {
    expect(
      index(
        [
          {
            id: "0",
            time: 1,
            missedGates: 1,
            touchedGates: 1,
          },
        ],
        {
          touchedGates: 50,
          missedGates: 50,
        }
      )
    ).toBeTruthy();
  });
});
