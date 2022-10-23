import { Id, ResultRecord, ResultRecords } from "../types";

// sorted alpha by name
export interface PersonalResult {
  id: Id;
  name: string;
  numberOfRaces: number;
}

export const personal = (resultRecords: ResultRecords): PersonalResult[] => {
  return Object.entries(resultRecords)
    .map<PersonalResult>(addProperties)
    .sort((a, b) => b.name.localeCompare(a.name));
};

const addProperties = ([id, record]: [
  id: Id,
  record: ResultRecord
]): PersonalResult => {
  return {
    id,
    name: record.name,
    numberOfRaces: record.races.length,
  };
};
