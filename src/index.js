import React from "react";
import "./app.css";
import { hydrate } from "react-dom";

import App from "./App";
import MegaMenu from "./MegaMenu";
import Data from "./users";

Data().then(menuData => {
  hydrate(<MegaMenu menu={menuData} />, document.getElementById("root"));
});
