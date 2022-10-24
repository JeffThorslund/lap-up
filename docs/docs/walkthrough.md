---
sidebar_position: 2
---

# Let's Run A Race

![Example banner](img.png)
Put on that imagination cap, let's walk through this from start to finish.

## Who Am I?

You are a whitewater kayaker who is itching to host a slalom kayaking race on your local
river. You spent your last dollar on cheap beer, so you can't afford any fancy race
management tools. The river is out of cell service you can't use anything that requires
internet connection.

That's not going to stop you because you have **Lap Up**, a pencil & paper, and a couple
pals to help you out.

## 1. Choose Your Race Format

You have a lot of options.

### Starting Formats

#### Mass Start

Everyone starts together with the same `start` time.

* Marathons

#### Staggered Start

Each person starts individual with varying `start` times.

* Slalom Races
* Time Trials

### Penalty Structure

Are there any penalties in this race? 


## 2. Sign Up

This happens any time before the event. Record the persons `name`, and give them an 
`id`. This `id` is what ties everything together so make sure they have it written on 
a bracelet, bib, hand or handout. You should end up with a handwritten list that 
resembles `SignUpRecord[]`.

```typescript
interface SignUpRecord {
  name: string;
  id: string;
}
```

:::caution

**Lap Up** does not take gender into account. If your race categories are gender based,
keep separate `SignUpRecord[]` lists for each gender.

:::

## Race Format






