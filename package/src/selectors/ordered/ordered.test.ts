import { ordered } from "./ordered";
import { OrderedSelectorResults, ResultRecords } from "../../types";

describe("end to end", () => {
  test("empty dataset", () => {
    expect(ordered({}, {})).toEqual([]);
  });

  test("single user", () => {
    const results: ResultRecords = {
      1: {
        name: "jeff",
        races: [
          {
            start: 1,
            end: 15,
            penalties: { missedGate: 1 },
          },
        ],
      },
    };

    const expected: OrderedSelectorResults[] = [
      {
        id: "1",
        name: "jeff",
        results: [
          {
            adjustedTime: 10,
            end: 15,
            start: 1,
            time: 14,
            penalties: { missedGate: 1 },
          },
        ],
      },
    ];

    expect(ordered(results, { missedGate: 4 })).toEqual(expected);
  });

  test("example race", () => {
    const results: ResultRecords = {
      1: {
        name: "Jeff",
        races: [
          {
            start: 1,
            end: 1000,
            penalties: {
              missedGate: 0,
              didNotSmile: 4,
            },
          },
          {
            start: 2000,
            end: 2100,
            penalties: {
              missedGate: 1,
              didNotSmile: 3,
            },
          },
        ],
      },
      2: {
        name: "Joey",
        races: [
          {
            start: 3000,
            end: null,
            penalties: null,
          },
        ],
      },
      3: {
        name: "Jim",
        races: [],
      },
      4: {
        name: "Archie",
        races: [
          {
            start: null,
            end: 4000,
            penalties: {
              missedGate: 1,
              didNotSmile: 0,
            },
          },
          {
            start: 1500,
            end: 6000,
            penalties: {
              missedGate: 1,
              didNotSmile: 0,
            },
          },
        ],
      },
    };

    const expected: OrderedSelectorResults[] = [
      {
        id: "1",
        name: "Jeff",
        results: [
          {
            adjustedTime: 90,
            end: 2100,
            penalties: {
              didNotSmile: 3,
              missedGate: 1,
            },
            start: 2000,
            time: 100,
          },
          {
            adjustedTime: 991,
            end: 1000,
            penalties: {
              didNotSmile: 4,
              missedGate: 0,
            },
            start: 1,
            time: 999,
          },
        ],
      },
      {
        id: "4",
        name: "Archie",
        results: [
          {
            adjustedTime: 4496,
            end: 6000,
            penalties: {
              didNotSmile: 0,
              missedGate: 1,
            },
            start: 1500,
            time: 4500,
          },
          {
            adjustedTime: null,
            end: 4000,
            penalties: {
              didNotSmile: 0,
              missedGate: 1,
            },
            start: null,
            time: null,
          },
        ],
      },
      {
        id: "2",
        name: "Joey",
        results: [
          {
            adjustedTime: null,
            end: null,
            penalties: null,
            start: 3000,
            time: null,
          },
        ],
      },
      {
        id: "3",
        name: "Jim",
        results: [],
      },
    ];

    const config = {
      missedGate: 4,
      didNotSmile: 2,
    };

    expect(ordered(results, config)).toEqual(expected);
  });
});
