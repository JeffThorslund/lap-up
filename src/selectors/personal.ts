import { Id, ResultRecord, ResultRecords } from "../types";

// sorted alpha by name
export interface PersonalResult {
  id: Id;
  name: string;
  numberOfRaces: number;
}

export const personal = (data: ResultRecords): PersonalResult[] => {
  const results: PersonalResult[] = [];

  Object.entries(data)
    .map<PersonalResult>(addProperties)
    .sort((a, b) => b.name.localeCompare(a.name));

  return results;
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
