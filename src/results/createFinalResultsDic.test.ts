import {
  buildEntry,
  createFinalResultsDic,
  computeRaceInstances,
} from "./createFinalResultsDic";
import {
  AnonymousEndTimingEvent,
  AnonymousStartTimingEvent,
  EndTimingEvent,
  ResultRecords,
  StartTimingEvent,
} from "../types";
import { createTimingEventDic } from "./createTimingEventDic";

const buildResultsWithNames = (
  starts: StartTimingEvent[],
  ends: EndTimingEvent[]
): ResultRecords => {
  const names = [
    {
      id: "0",
      name: "Jeff",
    },
    {
      id: "1",
      name: "Kyle",
    },
  ];

  const timingEventDic = createTimingEventDic(names, starts, ends);

  return createFinalResultsDic(timingEventDic);
};

describe("build entry", () => {
  test("startless", () => {
    expect(
      buildEntry.startless({
        time: 9,
        penalties: {},
      })
    ).toEqual({
      start: null,
      end: 9,
      penalties: {},
    });
  });

  test("endless", () => {
    expect(buildEntry.endless(9)).toEqual({
      start: 9,
      end: null,
      penalties: null,
    });
  });

  test("base", () => {
    expect(
      buildEntry.base(9, {
        time: 10,
        penalties: {},
      })
    ).toEqual({
      start: 9,
      end: 10,
      penalties: {},
    });
  });
});

describe("interate over obj", () => {
  test("empty lists", () => {
    expect(buildResultsWithNames([], [])).toEqual({
      0: {
        name: "Jeff",
        races: [],
      },
      1: {
        name: "Kyle",
        races: [],
      },
    });
  });

  test("single id, single end, no starts", () => {
    expect(
      buildResultsWithNames(
        [],
        [
          {
            id: "1",
            time: 1,
            penalties: {},
          },
        ]
      )
    ).toEqual({
      0: {
        name: "Jeff",
        races: [],
      },
      1: {
        name: "Kyle",
        races: [
          {
            end: 1,
            start: null,
            penalties: {},
          },
        ],
      },
    });
  });

  test("single id, several ends, no starts", () => {
    expect(
      buildResultsWithNames(
        [],
        [
          {
            id: "1",
            time: 1,
            penalties: {},
          },
          {
            id: "1",
            time: 10,
            penalties: {},
          },
        ]
      )
    ).toEqual({
      0: {
        name: "Jeff",
        races: [],
      },
      1: {
        name: "Kyle",
        races: [
          {
            end: 1,
            start: null,
            penalties: {},
          },
          {
            end: 10,
            start: null,
            penalties: {},
          },
        ],
      },
    });
  });

  test("single id, several start", () => {
    expect(
      buildResultsWithNames(
        [
          {
            id: "1",
            time: 1,
          },
          {
            id: "1",
            time: 2,
          },
        ],
        []
      )
    ).toEqual({
      0: {
        name: "Jeff",
        races: [],
      },
      1: {
        name: "Kyle",
        races: [
          {
            start: 1,
            end: null,
            penalties: null,
          },
          {
            start: 2,
            end: null,
            penalties: null,
          },
        ],
      },
    });
  });

  test("regular case", () => {
    expect(
      buildResultsWithNames(
        [
          {
            id: "1",
            time: 100,
          },
        ],
        [
          {
            id: "1",
            time: 200,
            penalties: {},
          },
        ]
      )
    ).toEqual({
      0: {
        name: "Jeff",
        races: [],
      },
      1: {
        name: "Kyle",
        races: [
          {
            start: 100,
            end: 200,
            penalties: {},
          },
        ],
      },
    });
  });

  test("traverse several starts", () => {
    expect(
      buildResultsWithNames(
        [
          {
            id: "1",
            time: 10,
          },
          {
            id: "1",
            time: 20,
          },
        ],
        [
          {
            id: "1",
            time: 25,
            penalties: {},
          },
        ]
      )
    ).toEqual({
      0: {
        name: "Jeff",
        races: [],
      },
      1: {
        name: "Kyle",
        races: [
          {
            start: 10,
            end: null,
            penalties: null,
          },
          {
            start: 20,
            end: 25,
            penalties: {},
          },
        ],
      },
    });
  });
});

describe("single person iterator", () => {
  const s = (num: number): AnonymousStartTimingEvent => ({
    time: num,
  });

  const e = (num: number): AnonymousEndTimingEvent => ({
    time: num,
    penalties: {},
  });

  test("regular case", () => {
    expect(
      computeRaceInstances({
        starts: [10, 20, 30].map(s),
        ends: [15, 25, 35].map(e),
      })
    ).toEqual([
      {
        start: 10,
        end: 15,
        penalties: {},
      },
      {
        start: 20,
        end: 25,
        penalties: {},
      },
      {
        start: 30,
        end: 35,
        penalties: {},
      },
    ]);
  });

  test("all starts", () => {
    expect(
      computeRaceInstances({
        starts: [10, 20, 30].map(s),
        ends: [],
      })
    ).toEqual([
      {
        start: 10,
        end: null,
        penalties: null,
      },
      {
        start: 20,
        end: null,
        penalties: null,
      },
      {
        start: 30,
        end: null,
        penalties: null,
      },
    ]);
  });

  test("all ends", () => {
    expect(
      computeRaceInstances({
        starts: [],
        ends: [15, 25, 35].map(e),
      })
    ).toEqual([
      {
        start: null,
        end: 15,
        penalties: {},
      },
      {
        start: null,
        end: 25,
        penalties: {},
      },
      {
        start: null,
        end: 35,
        penalties: {},
      },
    ]);
  });

  test("random case", () => {
    const createArray = (maxLength: number, maxValue: number): number[] => {
      const rand = (val: number): number => Math.floor(Math.random() * val);

      return Array.from(
        {
          length: rand(maxLength),
        },
        () => rand(maxValue)
      );
    };

    expect(() =>
      computeRaceInstances({
        starts: createArray(100, 1000).map(s),
        ends: createArray(100, 1000).map(e),
      })
    ).not.toThrow();
  });
});
