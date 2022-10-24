import { nameList } from "./dataBank";
//import { NameRecord } from "slalom-parser/lib/types";

type NameRecord = any;

const generateMockData = (numberOfRacers: number) => {
  const names = createNamesArray(numberOfRacers, nameList);
  const { starts, ends } = createResults(names);

  return {
    names: names,
    starts: starts,
    ends: ends,
  };
};

export const getRandomSubArray = (arr: string[], size: number) => {
  var shuffled = [...arr].slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
};

export const createNamesArray = (
  numberOfNames: number,
  names: string[]
): NameRecord[] => {
  return getRandomSubArray(names, numberOfNames).map((name, index) => {
    return { id: index.toString(), name };
  });
};

const createResults = (names: NameRecord[]) => {
  const starts = [];
  const ends = [];

  const maxTime = 3600;

  for (let i = 0; i < names.length; i++) {
    const numberOfRaces = randomIntFromInterval(0, 5);
    let time = randomIntFromInterval(0, maxTime);

    for (let j = 0; j < numberOfRaces; j++) {
      // starts the race
      starts.push({
        id: names[i].id,
        time: time,
      });

      // time it takes to complete race
      time += randomIntFromInterval(10, 100);

      ends.push({
        id: names[i].id,
        time: time,
        penalties: {
          touchedGates: randomIntFromInterval(0, 4),
          missedGates: randomIntFromInterval(0, 1),
        },
      });

      // time before next racer goes
      time += randomIntFromInterval(10, 100);
    }
  }

  return {
    starts: starts.sort((a, b) => a.time - b.time),
    ends: ends.sort((a, b) => a.time - b.time),
  };
};

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default generateMockData;
