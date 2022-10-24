import React from "react";
import Layout from "@theme/Layout";
import ReactJson from "react-json-view";
import { slalomX } from "slalomx";
import { useMockData } from "@site/src/_utils/generator/useMockData";
import { NewDataButton } from "@site/src/components/Demo/NewDataButton";

export default function Hello() {
  const { data, createNewDataSet } = useMockData(2);

  const config = {
    missedGates: 5,
    touchedGates: 8,
  };

  const results = slalomX(data.names, data.starts, data.ends, config);

  return (
    <Layout title="Hello" description="Hello React Page">
      <NewDataButton onClick={createNewDataSet} />
      <JSONDataRow title={"Input"}>
        <JSONDataColumn name={"names"} src={data.names} />
        <JSONDataColumn name={"starts"} src={data.starts} />
        <JSONDataColumn name={"ends"} src={data.ends} />
        <JSONDataColumn name={"config"} src={config} />
      </JSONDataRow>

      <JSONDataRow title={"Output"}>
        <JSONDataColumn name={"ordered"} src={results.ordered} />
        <JSONDataColumn name={"personal"} src={results.personal} />
        <JSONDataColumn name={"overall"} src={results.overall} />
      </JSONDataRow>
    </Layout>
  );
}

const JSONDataColumn = (props: { name: string; src: any }) => {
  return (
    <div style={{ flexGrow: 1, margin: 10 }}>
      <h2>{props.name}</h2>
      <ReactJson
        name={props.name}
        src={props.src}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        // @ts-ignore
        displayArrayKey={false}
        theme={"ocean"}
        style={{ padding: 10 }}
        collapsed={2}
      />
    </div>
  );
};

const JSONDataRow = (props: { children: React.ReactNode; title: string }) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{props.title}</h1>
      </div>
      <div style={{ display: "flex", padding: 10 }}>{props.children}</div>
    </div>
  );
};
