import React from 'react';
import Table from 'react-bootstrap/Table';
import './Table.css';

export default function TableComponent({ columns, rows, rowOrder }) {
  const renderColumns = (
    <thead>
      <tr>
        {columns.map((column, i) => <th key={i}>{column}</th>)}
      </tr>
    </thead>
  );

  const renderRows = rows.map((row, i) => (
    <tr key={i}>
      {rowOrder.map((item, j) => <td key={j}>{row[item]}</td>)}
    </tr>
  ));

  return (
    <div className="table-container">
    <Table responsive striped borderless hover>
      {columns && renderColumns}
      <tbody>
        {rows && renderRows}
      </tbody>
    </Table>
    </div>

  )
}
