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

  if (!Array.isArray(output) || output.length === 0) {
    return null;
  }

  // Preferred order
  const preferredOrder = ["id", "name", "age", "marks"];

  // Actual columns returned from query
  const actualColumns = Object.keys(output[0]);

  // Step 1: Keep the preferred columns that exist
  const orderedColumns = preferredOrder.filter((col) =>
    actualColumns.includes(col)
  );

  // Step 2: Add any remaining columns (not in preferred list)
  const remainingColumns = actualColumns.filter(
    (col) => !preferredOrder.includes(col)
  );

  // Final column order to display
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
            {output.map((row, rowIndex) => (
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
