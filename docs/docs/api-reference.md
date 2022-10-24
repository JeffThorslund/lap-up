# API Reference

## Parameters

### `names`

*required*

A list of `names` and corresponding `ids` from the signup sheet.

```typescript
interface NameRecord {
  /** name of the racer **/
  name: string;
  /** id assigned to the racer **/
  id: string;
}
```

:::caution

Any race timing events that do not correspond with a `NameRecord` will be disregarded.

:::

#### Example

```typescript
const names: NameRecord[] = [
  {
    name: "Jeff Thorslund",
    id: "0"
  },
  {
    name: "Sam Gregory",
    id: "1"
  }
]
```

### `starts`

*required*

A list of recorded start times. 

```typescript
interface StartTimingEvent {
  /** id assigned to the racer **/
  id: string;
  /** start time in Unix Epoch format **/
  time: number;
}
```

#### Example

```typescript
const starts: StartTimingEvent[] = [
  {
    id: "0",
    time: 1666635444
  },
  {
    id: "1",
    time: 1666632494
  },
]
```

### `ends`

*required*

A list of recorded end times.

```typescript
interface EndTimingEvent {
  /** id assigned to the racer **/
  id: string;
  /** end time in Unix Epoch format **/
  time: number;
  /** amount of each penalty type from this race **/
  penalties: PenaltyConfig;
}

/** These fields match the global penalty configuration**/
type PenaltyConfig = Record<
  /** penalty type **/
  keyof GlobalPenaltyConfig,
  /** number of penalties accrued during race **/
  number
  >
```

:::caution

Any fields in `PenaltyConfig` that do not exist on `GlobalPenaltyConfig` will be ignored.

:::


#### Example

```typescript
const starts: StartTimingEvent[] = [
  {
    id: "0",
    time: 1666635444,
    penalties: {
      missedGate: 0
    }
  },
  {
    id: "1",
    time: 1666632494,
    penalties: {
      missedGate: 3
    }
  },
]
```

### `config`

*required*

A dictionary indicating the `time` deduction of each penalty type.

```typescript
type GlobalPenaltyConfig = Record<
  /** penalty type **/
  string,
  /** number of milliseconds deducted per penalty **/
  number
  >
```

#### Example

In this example, missing a gate results in a deduction of `5000ms` (`5s`).

```typescript
const config: GlobalPenaltyConfig = {
  missedGates: 5000
}
```

## Return Value

```typescript
export interface Selectors {
  ordered: OrderedSelectorResults[];
  personal: PersonalResult[];
  overall: OverallRaceResult;
}
```

### `ordered`

A list of participants and their race results, sorted by fastest race.

```typescript
interface OrderedSelectorResults {
  id: string;
  name: string;
  results: CompleteComputedRaceInstance[];
}

interface CompleteComputedRaceInstance {
  start: number,
  end: number,
  penalties: PenaltyRecord,
  time: number | null,
  adjustedTime: number | null
}
```

#### Example

```typescript
const ordered: OrderedSelectorResults = [
  {
    id: "0",
    name: "Jeff",
    results: [
      {
        start: 1666635444,
        end: 1666637098,
        penalties: {},
        time: 1654,
        adjustedTime: 1654
      }
    ]
  }
]
```

### `personal`

Alphabetically ordered list of racers, with personal statistics on for each.

```typescript
interface PersonalResult {
  id: string;
  name: string;
  numberOfRaces: number;
}
```

#### Example

```typescript
const personal: PersonalResult[] = [
  {
    id: "0",
    name: "Jeff",
    numberOfRaces: 4
  }
]
```

### `overall`

Statistics regarding the overall data set.

```typescript
interface OverallRaceResult {
  numberOfCompetitors: number;
  numberOfRaces: number;
}
```

#### Example

```typescript
const overall: OverallRaceResult = {
  numberOfCompetitors: 2,
  numberOfRaces: 5
}
```


