import React from 'react';
import './Table.css';
import Table from 'react-bootstrap/Table';

export default function TableComponent({ data }) {
  const renderColumns = () => {
    const columns = [
      "Name",
      "Client",
      "Hours",
      "  ",
      "Billable Hours",
      "Billable Amount"
    ]

    return (
      <thead>
        <tr>
          { columns.map((column, i) => <th key={i}>{column}</th>) }
        </tr>
      </thead>
    )
  }

  const renderRows = () => data.map(timesheet => {
    const { Client, Project, Hours } = timesheet;
    const Billable = timesheet["Billable?"] === "Yes" ? true : false;
    const Billable_Amount = timesheet["Billable Rate"] * Hours;

    return (
      <tr>
        <td>{Project}</td>
        <td>{Client}</td>
        <td>{Hours}</td>
        <td>"some visuals here"</td>
        <td>{Hours}</td>
        <td>{Billable ? Billable_Amount : '-'}</td>
      </tr>
    )
  })

  return (
    <div className="table">
      <Table striped bordered hover>
        {data && renderColumns()}
        <tbody>
          {data && renderRows()}
        </tbody>
      </Table>
    </div>
  )
}
