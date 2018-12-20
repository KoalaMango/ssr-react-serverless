import React,{Fragment} from "react";

const App = (props) => {
  return (
    <Fragment>
    <h1>Users</h1>
    <ul>
      {console.log(props.data)}
    </ul>
 </Fragment>
  )
}

export default App;
