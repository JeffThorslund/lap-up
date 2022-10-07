import {mergeLists, createStructure, getLastElement} from './createStructure'
import {ResultType} from './types'


describe('merge', () => {

    const raceEntry1 = {id: '1', time: 123, type: ResultType.START}

    const raceEntry2 = {
        id: '2',
        time: 456,
        type: ResultType.END
    }

    test('merge lists', () => {
        expect(mergeLists([raceEntry2], [raceEntry1])).toEqual([raceEntry1, raceEntry2])
    })
})

describe('structure creation', function () {
    test('add new racer', () => {
        expect(createStructure([
            {id: "1", type: ResultType.START, time: 123},
            {
                id: "1",
                type: ResultType.END,
                time: 130
            }
        ])).toEqual({"1": [{start: 123, end: 130}]})
    })
});

describe('last element getter', function () {
    test('empty array', () => {
        expect(getLastElement([])).toEqual(undefined)
    })

    test('single element', () => {
        const entry = {start: 123, end: 321}
        expect(getLastElement([{start: 123, end: 321}])).toEqual(entry)
    })
});