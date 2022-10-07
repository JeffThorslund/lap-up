import {CSVInput} from "./types";
import {prepStartResults, prepEndResults} from "./prepResults"
import {mergeLists, createStructure} from "./createStructure"

export const index = (starts: CSVInput, ends: CSVInput) => {
    const preppedStarts = prepStartResults(starts)
    const preppedEnds = prepEndResults(ends)
    const mergedResults = mergeLists(preppedStarts, preppedEnds)
    const races = createStructure(mergedResults)
    return races
}