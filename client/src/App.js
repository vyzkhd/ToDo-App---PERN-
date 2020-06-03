import React, { Fragment } from "react";
import InputTodo from "./components/inputTogo";
import ListTodos from "./components/ListTodos";

import "./App.css";

const App = () => {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
};

export default App;
