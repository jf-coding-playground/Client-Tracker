import React from 'react';
import Table from 'react-bootstrap/Table';
import './Table.css';

export default function TableComponent({ columns, rows }) {
  const renderColumns = (
    <thead>
      <tr>
        {columns.map((column, i) => <th key={i}>{column}</th>)}
      </tr>
    </thead>
  );

  const renderRows = rows.map((row, i) => (
    <tr key={i}>
      {row.map((rowItem, j) => <td key={j}>{rowItem}</td>)}
    </tr>
  ));

  return (
    <div className="table-container shadow">
    <Table responsive striped borderless hover>
      {columns && renderColumns}
      <tbody>
        {rows && renderRows}
      </tbody>
    </Table>
    </div>
  )
}
