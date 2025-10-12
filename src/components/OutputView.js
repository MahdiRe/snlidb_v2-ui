import React from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";

const OutputView = ({ output }) => {
  // If reset or no result yet → show nothing
  if (!output) return null;

  // If it's an error
  if (output.type === "error") {
    return (
      <Typography color="error" style={{ marginTop: "20px" }}>
        ❌ {output.message}
      </Typography>
    );
  }

  // If it's NOT a SELECT, e.g. insert/update/delete
  if (output.type !== "select") {
    return (
      <Typography style={{ marginTop: "20px" }}>
        ✅ {output.message} <br />
        Rows affected: {output.rows_affected}
      </Typography>
    );
  }

  // If it's a SELECT but no rows
  if (!Array.isArray(output.data) || output.data.length === 0) {
    return (
      <Typography style={{ marginTop: "20px" }}>
        No results found.
      </Typography>
    );
  }

  // ✅ Now render the table...
  const rows = output.data;
  const preferredOrder = ["id", "name", "age", "marks"];
  const actualColumns = Object.keys(rows[0]);

  const orderedColumns = preferredOrder.filter((col) =>
    actualColumns.includes(col)
  );
  const remainingColumns = actualColumns.filter(
    (col) => !preferredOrder.includes(col)
  );
  const finalColumns = [...orderedColumns, ...remainingColumns];

  return (
    <div style={{ marginTop: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Query Result:
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {finalColumns.map((col, index) => (
                <TableCell key={index}>
                  <strong>{col}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {finalColumns.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    {row[col] !== null && row[col] !== undefined
                      ? row[col].toString()
                      : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OutputView;
