import { useState } from "react";
import generateMockData from "./generateMockData";

export const useMockData = (numberOfRacers: number) => {
  const [data, setData] = useState(generateMockData(numberOfRacers));

  return {
    data,
    createNewDataSet: () => setData(() => generateMockData(numberOfRacers)),
  };
};
