import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface FeatureItem {
  title: string;
  description: React.ReactElement;
}

const FeatureList: FeatureItem[] = [
  {
    title: "⚡️ Instantly Compile Race Data",
    description: (
      <>
        Record when racers <strong>start</strong>, and when they cross the{" "}
        <strong>finish line</strong>. Input that data in <strong>Lap Up</strong>{" "}
        to see a full breakdown of awards, statistics and analytics.
      </>
    ),
  },
  {
    title: "🚵‍ Flexible Race Format",
    description: (
      <>
        There are no recommendations on what type of race you can host.{" "}
        <strong>Lap Up</strong> is intentionally <strong>un-opinionated</strong>{" "}
        so you can mould it around your specific needs.{" "}
        <strong>Any sport. Any format.</strong>
      </>
    ),
  },
  {
    title: "🏆 Proven Track Record",
    description: (
      <>
        This tool was used in a slalom kayaking race,{" "}
        <a
          href={"https://www.mamquammeltdown.com/results"}
          target={"_blank"}
          rel="noreferrer"
        >
          Mamquam Meltdown
        </a>
        , which included former Canadian National Athletes, to track over{" "}
        <strong>50 racers</strong> and over{" "}
        <strong>130 individual races</strong>.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.ReactElement {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
