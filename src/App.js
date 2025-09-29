import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [intent, setIntent] = useState("");
  const [entities, setEntities] = useState([]);

  const handleGenerate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/query", {
        query: inputQuery,
      });

      setSqlQuery(res.data.sql || "");
      setIntent(res.data.intent || "");
      setEntities(res.data.entities || []);
    } catch (err) {
      console.error(err);
      setSqlQuery("Error generating SQL");
    }
  };

  const handleReset = () => {
    setInputQuery("");
    setSqlQuery("");
    setIntent("");
    setEntities([]);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h2>Sinhala Text to SQL</h2>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter Sinhala query..."
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      />

      {/* Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleGenerate} style={{ marginRight: "10px" }}>
          Generate SQL Query
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Output SQL */}
      <div>
        <label>Generated SQL Query:</label>
        <textarea
          value={sqlQuery}
          disabled
          rows={3}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
      </div>

      {/* Intent */}
      {intent && (
        <div style={{ marginTop: "15px" }}>
          <strong>SQL Intent:</strong> {intent}
        </div>
      )}

      {/* Entities Table */}
      {entities.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Sinhala Root Word & NER</h4>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Sinhala Root Word
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  NER Label
                </th>
              </tr>
            </thead>
            <tbody>
              {entities.map((entity, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {entity.text}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {entity.label}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
