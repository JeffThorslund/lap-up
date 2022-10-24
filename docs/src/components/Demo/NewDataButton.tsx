import React from "react";

export function NewDataButton(props: { onClick: () => void }) {
  return (
    <button
      className={"button button--secondary button--lg"}
      onClick={props.onClick}
    >
      Create New Race
    </button>
  );
}
