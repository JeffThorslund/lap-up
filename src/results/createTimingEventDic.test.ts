import {
  assignEnds,
  assignStarts,
  createBlankTimingEventDic,
} from "./createTimingEventDic";

describe("create a blank dictionary with all racers names to store timing events", () => {
  test("provide empty list of racers", () => {
    expect(createBlankTimingEventDic([])).toEqual({});
  });

  test("provide single name", () => {
    expect(createBlankTimingEventDic([{ id: "0", name: "Jeff" }])).toEqual({
      0: { name: "Jeff", timingEvents: { starts: [], ends: [] } },
    });
  });

  test("provide list of names", () => {
    expect(
      createBlankTimingEventDic([
        { id: "0", name: "Jeff" },
        { id: "1", name: "Jennifer" },
      ])
    ).toEqual({
      0: { name: "Jeff", timingEvents: { starts: [], ends: [] } },
      1: { name: "Jennifer", timingEvents: { starts: [], ends: [] } },
    });
  });
});

describe("add events to record dic", () => {
  let timingEventDic = {};

  beforeEach(() => {
    timingEventDic = createBlankTimingEventDic([
      { id: "0", name: "Jeff" },
      { id: "1", name: "Jennifer" },
    ]);
  });

  describe("add start records to timing dic", () => {
    test("no start records", () => {
      assignStarts(timingEventDic, []);
      expect(timingEventDic).toEqual(timingEventDic);
    });

    test("single start record", () => {
      assignStarts(timingEventDic, [{ id: "0", time: 100 }]);
      expect(timingEventDic).toEqual({
        0: {
          name: "Jeff",
          timingEvents: { starts: [{ time: 100 }], ends: [] },
        },
        1: { name: "Jennifer", timingEvents: { starts: [], ends: [] } },
      });
    });

    test("multiple start records", () => {
      assignStarts(timingEventDic, [
        { id: "0", time: 100 },
        { id: "0", time: 200 },
        { id: "1", time: 300 },
      ]);
      expect(timingEventDic).toEqual({
        0: {
          name: "Jeff",
          timingEvents: { starts: [{ time: 100 }, { time: 200 }], ends: [] },
        },
        1: {
          name: "Jennifer",
          timingEvents: { starts: [{ time: 300 }], ends: [] },
        },
      });
    });
  });

  describe("add end records to timing dic", () => {
    test("no end records", () => {
      assignEnds(timingEventDic, []);
      expect(timingEventDic).toEqual(timingEventDic);
    });

    test("single start record", () => {
      assignEnds(timingEventDic, [{ id: "0", time: 100, penalties: {} }]);
      expect(timingEventDic).toEqual({
        0: {
          name: "Jeff",
          timingEvents: { starts: [], ends: [{ time: 100, penalties: {} }] },
        },
        1: { name: "Jennifer", timingEvents: { starts: [], ends: [] } },
      });
    });

    test("multiple start records", () => {
      assignEnds(timingEventDic, [
        { id: "0", time: 100, penalties: { touchedGate: 2 } },
        { id: "0", time: 200, penalties: { touchedGate: 6 } },
        { id: "1", time: 300, penalties: { touchedGate: 9 } },
      ]);
      expect(timingEventDic).toEqual({
        0: {
          name: "Jeff",
          timingEvents: {
            starts: [],
            ends: [
              { time: 100, penalties: { touchedGate: 2 } },
              { time: 200, penalties: { touchedGate: 6 } },
            ],
          },
        },
        1: {
          name: "Jennifer",
          timingEvents: {
            starts: [],
            ends: [{ time: 300, penalties: { touchedGate: 9 } }],
          },
        },
      });
    });
  });
});
