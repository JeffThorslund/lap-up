import {TypedCSVData, RacesMap, ResultType, RaceEntry} from "./types"

export const mergeLists = (starts: TypedCSVData[], ends: TypedCSVData[]): TypedCSVData[] => {
    return [...starts, ...ends].sort((a, b) => a.time - b.time)
}
export const createStructure = (list: TypedCSVData[]): RacesMap => {

    const races: RacesMap = {}

    for (const entry of list) {

        // create new racer
        if (!races[entry.id]) {
            races[entry.id] = []
        }

        // get last race element
        const lastElement = getLastElement(races[entry.id])

        const isCurrentlyRacing = getIsCurrentlyRacing(lastElement)

        if (entry.type === ResultType.START) {
            if (isCurrentlyRacing) {
                lastElement.end = null
            }

            races[entry.id].push({start: entry.time, end: undefined})

            //return races
        }

        if (entry.type === ResultType.END) {

            if (!isCurrentlyRacing) {
                races[entry.id].push({start: null, end: undefined})
            }

            lastElement.end = entry.time

            //return races
        }
    }

    return races
}
export const getLastElement = (arr: RaceEntry[]): RaceEntry => {
    return arr[arr.length - 1]
}
export const getIsCurrentlyRacing = (lastElement: RaceEntry): boolean => {
    // racer has not started their first race
    if (lastElement === undefined) {
        return false
    }

    // racer has not finished their current race
    if (lastElement.end !== undefined) {
        return false
    }

    return true
}