import React from "react";
import { hydrate } from "react-dom";
import Data from "./Data";
import MegaMenu from "./MegaMenu";

import "./App.css";

Data().then(menuData => {
  hydrate(<MegaMenu menu={menuData} />, document.getElementById("root"));
});
