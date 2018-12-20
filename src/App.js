import React,{ Fragment } from "react";
import MegaMenu from "./MegaMenu";

const App = (props) => {
  return (
    <Fragment>
      <h1>CRUK MegaMenu: Server side rendering React with Serverless</h1>
      <MegaMenu
        menu={props.data}
      />
    </Fragment>
  )
};

export default App;
