import * as React from "react";
import * as ReactDOM from "react-dom";
import Hello from "../components/hello";
import { Looker, VisualizationDefinition } from "../common/types";
import { handleErrors } from "../common/utils";
import "./my-custom-viz.scss";

declare var looker: Looker;

interface WhateverNameYouWantVisualization extends VisualizationDefinition {
  elementRef?: HTMLDivElement;
}

const vis: WhateverNameYouWantVisualization = {
  id: "some id", // id/label not required, but nice for testing and keeping manifests in sync
  label: "Some Name",
  options: {
    title: {
      type: "string",
      label: "Title",
      display: "text",
      default: "Default Text",
    },
  },
  // Set up the initial state of the visualization
  create(element, config) {
    this.elementRef = element;
  },
  // Render in response to the data or settings changing
  update(data, element, config, queryResponse) {
    const errors = handleErrors(this, queryResponse, {});
    if (errors) {
      element.innerHTML = "<div id='vizContainer'>Hello Looker!</div>";
      this.chart = ReactDOM.render(
        <Hello data={"toto"} />,
        document.querySelector('#vizContainer')
      );
    }
  },
};

looker.plugins.visualizations.add(vis);
