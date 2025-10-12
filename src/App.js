import React from "react";
import InputView from "./components/InputView";
import TableView from "./components/TableView";
import './App.css';

const App = () => {
  return (
    <div className="main-panel">
      <div className="left-panel">
        <InputView />
      </div>

      <div className="right-panel">
        <TableView />
      </div>
    </div>
  );
};

export default App;
