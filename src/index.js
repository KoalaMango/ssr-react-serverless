import React from "react";
import { hydrate } from "react-dom";
import Data from "./Data";
import App from "./App";

import "./App.css";

Data().then(menuData => {
  hydrate(<App data={menuData} />, document.getElementById("root"));
});
