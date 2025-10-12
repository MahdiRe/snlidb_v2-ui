import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@material-ui/core";
import OutputView from "./OutputView";

const InputView = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [intent, setIntent] = useState("");
  const [entities, setEntities] = useState([]);
  const [error, setError] = useState(false);
  const [output, setOutput] = useState([]);

  const handleGenerate = async () => {
    if (!inputQuery.trim()) {
      setError(true);
      return;
    }
    setError(false);

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
    setError(false);
    setOutput([]);
  };

  const executeQuery = async () => {
    try {
      const res = await axios.post("http://localhost:5000/execute", {
        query: sqlQuery,
      });

      setOutput(res.data)
    } catch (err) {
      console.error(err);
      setSqlQuery("Error executing SQL");
    }
  }

  return (
    <Paper elevation={3} style={{ padding: "30px" }}>
      <Typography variant="h4" gutterBottom>
        Sinhala Text to SQL
      </Typography>

      {/* Input */}
      <TextField
        fullWidth
        variant="outlined"
        label="Enter Sinhala Query"
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        error={error}
        helperText={error ? "Please enter a Sinhala query before generating." : ""}
        style={{ marginBottom: "20px" }}
      />

      {/* Buttons */}
      <Box display="flex" justifyContent="flex-start" mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerate}
          style={{ marginRight: "10px" }}
        >
          Generate SQL Query
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      {/* Output SQL */}
      <Typography variant="subtitle1" gutterBottom>
        Generated SQL Query:
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        value={sqlQuery}
        disabled
        multiline
        rows={3}
        style={{ marginBottom: "20px" }}
      />

      {/* Intent */}
      {intent && (
        <Box mb={3}>
          <Typography variant="h6">SQL Intent:</Typography>
          <Typography color="primary">{intent}</Typography>
        </Box>
      )}

      {/* Entities Table */}
      {entities.length > 0 && (
        <div>
          <Typography variant="h6" gutterBottom>
            Sinhala Root Word & NER
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Sinhala Root Word</strong></TableCell>
                  <TableCell><strong>NER Label</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entities.map((entity, index) => (
                  <TableRow key={index}>
                    <TableCell>{entity.text}</TableCell>
                    <TableCell>{entity.label}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <br />

      {sqlQuery !== "" &&
        <Button
          variant="contained"
          onClick={executeQuery}
          style={{ marginRight: "10px", backgroundColor: "green", color: "white" }}
        >
          Execute SQL Query
        </Button>
      }

      <OutputView output={output} />
    </Paper>
  );
};

export default InputView;
