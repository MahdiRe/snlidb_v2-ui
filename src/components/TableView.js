import React, { useEffect, useState } from "react";

const TableView = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Age</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{s.id}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{s.name}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{s.age}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{s.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
