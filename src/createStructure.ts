import {TypedCSVData, RacesMap, ResultType, RaceEntry, Id} from "./types"

export const mergeLists = (starts: TypedCSVData[], ends: TypedCSVData[]): TypedCSVData[] => {
    return [...starts, ...ends].sort((a, b) => a.time - b.time)
}
export const createStructure = (list: TypedCSVData[]): RacesMap => {

    let allRaces: RacesMap = {}

    for (const entry of list) {

        if (!allRaces[entry.id]) {
            allRaces = addNewRacer(allRaces, entry.id)
        }

        const someRaces = allRaces[entry.id]

        const entryHandlers = createEntryHandlers(someRaces, entry.time)

        switch (entry.type) {
            case ResultType.START:
                entryHandlers.start()
                break;

            case ResultType.END:
                entryHandlers.end()
                break;
        }
    }

    return allRaces
}

export const addNewRacer = (races: RacesMap, newRacerId: Id) => {
    return {...races, [newRacerId]: []}
}

export const createEntryHandlers = (races: RaceEntry[], time: number) => {
    const lastElement = getLastElement(races)
    const isCurrentlyRacing = getIsCurrentlyRacing(lastElement)

    return {
        start() {
            if (isCurrentlyRacing) {
                endCurrentRace(lastElement)
            }

            races.push({start: time, end: undefined})
        },
        end() {
            if (!isCurrentlyRacing) {
                races.push({start: null, end: undefined})
            }

            lastElement.end = time
        }
    }
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

export const endCurrentRace = (lastElement: RaceEntry) => {
    lastElement.end = null
}

