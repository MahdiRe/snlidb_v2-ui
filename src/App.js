import React, { useState } from "react";
import InputView from "./components/InputView";
import TableView from "./components/TableView";
import './App.css';

const App = () => {
  const [update, setUpdate] = useState(true);

  const refresh = () => {
    setUpdate(!update);
  }
  return (
    <div className="main-panel">
      <div className="left-panel">
        <InputView refresh={refresh} />
      </div>

      <div className="right-panel">
        <TableView update={update} />
      </div>
    </div>
  );
};

export default App;
