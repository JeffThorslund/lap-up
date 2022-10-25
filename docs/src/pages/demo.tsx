import React from "react";
import Layout from "@theme/Layout";
import ReactJson, { ThemeKeys } from "react-json-view";
import { slalomX } from "slalomx";
import { useMockData } from "@site/src/_utils/generator/useMockData";
import { NewDataButton } from "@site/src/components/Demo/NewDataButton";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./demo.module.css";

export default function Demo() {
  const { data, createNewDataSet } = useMockData(2);

  const config = {
    missedGates: 5,
    touchedGates: 8,
  };

  const results = slalomX(data.names, data.starts, data.ends, config);

  return (
    <Layout title="Hello" description="Hello React Page">
      <Header createNewDataSet={createNewDataSet} />

      <JSONDataRow title={"Parameters"}>
        <JSONDataColumn name={"names"} src={data.names} />
        <JSONDataColumn name={"starts"} src={data.starts} />
        <JSONDataColumn name={"ends"} src={data.ends} />
        <JSONDataColumn name={"config"} src={config} />
      </JSONDataRow>

      <JSONDataRow title={"Return Value"}>
        <JSONDataColumn name={"ordered"} src={results.ordered} />
        <JSONDataColumn name={"personal"} src={results.personal} />
        <JSONDataColumn name={"overall"} src={results.overall} />
      </JSONDataRow>
    </Layout>
  );
}

const Header = (props: { createNewDataSet: () => void }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Simulate a Race</h1>
      <div className={styles.subtitle}>
        Use this tool to create mock race data, and see how{" "}
        <strong>Lap Up</strong> creates a race roster.
      </div>
      <NewDataButton onClick={props.createNewDataSet} />
    </div>
  );
};

const JSONDataColumn = (props: { name: string; src: any }) => {
  const { colorMode } = useColorMode();

  const colorDependentProps: { theme: ThemeKeys; borderColor: string } =
    colorMode === "dark"
      ? {
          theme: "railscasts",
          borderColor: "#c54e4e",
        }
      : {
          theme: "rjv-default",
          borderColor: "#5c7abb",
        };

  return (
    <div style={{ flexGrow: 1, margin: 10 }}>
      <h3>{props.name}</h3>
      <ReactJson
        name={props.name}
        src={props.src}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        // @ts-ignore
        displayArrayKey={false}
        theme={colorDependentProps.theme}
        style={{
          padding: 10,
          border: `3px solid`,
          borderColor: colorDependentProps.borderColor,
        }}
        collapsed={2}
      />
    </div>
  );
};

const JSONDataRow = (props: { children: React.ReactNode; title: string }) => {
  return (
    <div className={styles.row}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>{props.title}</h2>
      </div>
      <div style={{ display: "flex", padding: 10 }}>{props.children}</div>
    </div>
  );
};
