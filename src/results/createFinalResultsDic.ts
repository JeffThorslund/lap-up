import {
  AnonymousEndTimingEvent,
  AnonymousStartTimingEvent,
  ComputedRaceInstance,
  InitialPassRaceEntry,
  ResultRecords,
  TimingEventDic,
} from "../types";

export const createFinalResultsDic = (
  timingEventDic: TimingEventDic
): ResultRecords =>
  Object.entries(timingEventDic).reduce<ResultRecords>(
    (prevResultRecords, [id, timingEventRecord]) => ({
      ...prevResultRecords,
      [id]: {
        name: timingEventRecord.name,
        races: computeRaceInstances(timingEventRecord.timingEvents),
      },
    }),
    {}
  );

export const computeRaceInstances = (timingEvents: {
  starts: AnonymousStartTimingEvent[];
  ends: AnonymousEndTimingEvent[];
}): ComputedRaceInstance[] => {
  const initialPassRaceEntries: InitialPassRaceEntry[] =
    timingEvents.starts.map((start) => ({
      start: start.time,
      end: undefined,
    }));

  const finals: ComputedRaceInstance[] = [];

  let pointer = 0;

  for (const end of timingEvents.ends) {
    if (
      initialPassRaceEntries[pointer] === undefined ||
      end.time < initialPassRaceEntries[pointer].start
    ) {
      finals.push(buildEntry.startless(end));
    } else if (end.time >= initialPassRaceEntries[pointer].start) {
      while (
        initialPassRaceEntries[pointer + 1] !== undefined &&
        end.time > initialPassRaceEntries[pointer + 1].start
      ) {
        finals.push(buildEntry.endless(initialPassRaceEntries[pointer].start));
        pointer++;
      }
      finals.push(buildEntry.base(initialPassRaceEntries[pointer].start, end));
      pointer++;
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }

  const startsAfterCurrentIndex = initialPassRaceEntries.slice(pointer);
  finals.push(
    ...startsAfterCurrentIndex.map((e) => buildEntry.endless(e.start))
  );

  return finals;
};

export const buildEntry = {
  startless(end: AnonymousEndTimingEvent): ComputedRaceInstance {
    return {
      start: null,
      end: end.time,
      penalties: end.penalties,
    };
  },
  endless(startTime: number): ComputedRaceInstance {
    return {
      start: startTime,
      end: null,
      penalties: null,
    };
  },
  base(startTime: number, end: AnonymousEndTimingEvent): ComputedRaceInstance {
    return {
      start: startTime,
      end: end.time,
      penalties: end.penalties,
    };
  },
};
