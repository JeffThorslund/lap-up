import { ResultRecords } from "../types";

export interface OverallRaceResult {
  numberOfCompetitors: number;
  numberOfRaces: number;
}

export const overall = (resultRecords: ResultRecords): OverallRaceResult => ({
  numberOfCompetitors: getNumberOfCompetitors(resultRecords),
  numberOfRaces: getNumberOfRaces(resultRecords),
});

const getNumberOfCompetitors = (resultRecords: ResultRecords): number =>
  Object.keys(resultRecords).length;

const getNumberOfRaces = (resultRecords: ResultRecords): number =>
  Object.values(resultRecords).reduce<number>(
    (acc, cur) => acc + cur.races.length,
    0
  );
