---
sidebar_position: 2
---

# Let's Host A Race

Let's walk through this from start to finish. This is your game plan.

![Kayakers banner](assets/img.png)

## Set The Scene

You are a whitewater kayaker who is itching to host a **slalom kayaking race on your local
river**. You spent your last dollar on **cheap beer**, so you can't afford any fancy
**race management tools**. The river is outside of cell service so you can't use anything
that requires internet connection.

That's not going to stop you because you have **Lap Up**, a pencil & paper, and a couple
pals to help you out.

## Choose Your Race Format

You have a lot of options.

* **Mass Start** - Everyone starts together with the same `start` time.
* **Slalom Race** - Racers go one by one, going through gates on the way down. Missed
  gates result in a time deduction (more on that later).
* **Time Trials** - Racers to from start to finish with nothing to worry about except
  sheer speed.

You choose a **SLALOM RACE** where each competitor needs to navigate through hanging
gates, while racing to the finish.

![Phil banner](assets/phil.png)

## Sign Up

This happens any time before the event. Record the persons `name`, and give them an
`id`. This `id` is what ties everything together so make sure they have it written on a
bracelet, bib, hand or handout. You should end up with a handwritten list that
resembles `NameRecord[]`.

```typescript
interface NameRecord {
  name: string;
  id: string;
}
```

:::caution

**Lap Up** does not take gender into account. If your race categories are gender based,
keep separate `NameRecord[]` lists for each gender.

:::

## Plan Your Penalty Configuration

If your race involves penalties for certain actions, plan out how they will be tracked,
and how many seconds will be deducted for each penalty type.

Turn this data into a simple `GlobalPenaltyConfig` object (see API Reference for more
info).

## Explain The Rules

Make sure that all racers understand the format of the race, and any safety or operational
concerns.

![Explain](assets/explain.png)

## Get In Position

**Lap Up** requires 2 people to write, each with a pencil and paper.

The *start time recorder* stays at the beginning of the race. They record the `id`
and `time` whenever a racer leaves the gates.

The *end time recorder* stays at the finish of the race. They record the `id`, the `time`,
and the `number of penalties` that occurred when a racer crosses the finish line.

:::info

Luckily, there is no need for the *start time recorder* and the *end time recorder* to
have any form of verbal or visual contact! They are both responsible for recording the
current time when their respective racers start/end.

:::

## Ready, Set, GO!

We'll leave this up to you!

![Jump](assets/jump.png)

## Parse The Data

Once, all the races have finished, these papers full of scribbles must be parsed into
usable data. The easiest way to do this is a **2-step process**.

### 1. Transfer to CSV

With your partner, transcribe the data into Google Sheets or Excel, using column headers
that correspond with parameter fields in the API Reference.

### 2. Convert to JSON

Use an online converter to create a JSON object out of the CSV data.

This is a converter we recommend:

[CSV JSON Converter](https://csvjson.com/)

:::caution

As there is so much variability in data entry, **Lap Up** puts the onus on you to parse
your raw data into a structure that matches the `parameters` outlined in the API
Reference. There are no calculations or data modification, but it is still important to
perform this step with care.

:::

## Fire it Up!

This is the moment you have been waiting for. Call the function in any way you choose. See
the Usage tab for more information. Explore the possible options of either writing the
returned value to a `JSON` file, or feeding the data to a publicly available web
interface.

**Explore the data. Use it for your awards ceremony. Post it online for everyone to see.**

You did a great thing! Don't forget to enjoy the moment and **smile**!

![Jump](assets/archie.png)





