import {
  EndTimingEvent,
  NameRecord,
  StartTimingEvent,
  TimingEventDic,
} from "../types";

export const createTimingEventDic = (
  names: NameRecord[],
  starts: StartTimingEvent[],
  ends: EndTimingEvent[]
): TimingEventDic => {
  const timingEventDic = createBlankTimingEventDic(names);

  // starts
  const sortedStarts = starts.sort((a, b) => a.time - b.time);
  assignStarts(timingEventDic, sortedStarts);

  // ends
  const sortedEnds = ends.sort((a, b) => a.time - b.time);
  assignEnds(timingEventDic, sortedEnds);

  return timingEventDic;
};

export const createBlankTimingEventDic = (
  names: NameRecord[]
): TimingEventDic => {
  const timingEventRecords: TimingEventDic = {};

  for (const { id, name } of names) {
    timingEventRecords[id] = {
      name,
      timingEvents: {
        starts: [],
        ends: [],
      },
    };
  }

  return timingEventRecords;
};

export const assignStarts = (
  timingEventDic: TimingEventDic,
  starts: StartTimingEvent[]
): void => {
  for (const start of starts) {
    timingEventDic[start.id].timingEvents.starts.push({ time: start.time });
  }
};

export const assignEnds = (
  timingEventDic: TimingEventDic,
  ends: EndTimingEvent[]
): void => {
  for (const end of ends) {
    timingEventDic[end.id].timingEvents.ends.push({
      time: end.time,
      penalties: end.penalties,
    });
  }
};
