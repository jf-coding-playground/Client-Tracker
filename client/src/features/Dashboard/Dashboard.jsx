import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { Table, Stats } from '../../components';

export default function Dashboard({
  timesheets,
  clients,
  data,
  onClientSelection
}) {
  const options = clients.map((client, i) => <option key={i} value={client}>{client}</option>);
  const tableColumns = ["Name", "Client", "Hours", "Billable Hours", "Billable Amount"];
  const rowOrder = ['Project', 'Client', 'Hours', 'Hours', 'Billable_Amount'];
  const tableRows = timesheets.map(timesheet => {
    const { Client, Project, Hours, Billable_Amount } = timesheet;

    return { Project, Client, Hours, Billable_Amount }
  });

  return (
    <div className="dashboard container">
      {clients.length > 2 &&
        <div className="dashboard-options">
          <div className="form-group dashboard-options-select">
            <label className="control-label" htmlFor="website">Clients</label>
            <select onChange={onClientSelection} id="clients" className="form-control">
              <option value="/">All</option>
              {options}
            </select>
          </div>
          <Button className="add-timesheet" variant="success">Add Timesheet</Button>
        </div>
      }
      {clients.length < 2 &&
        <Link className="mr-auto" to="/">
          <Button className="add-timesheet" variant="success">Go Back</Button>
        </Link>
      }
      <Stats data={data} />
      <span className="dashboard-timesheets-num ml-auto">{timesheets.length} timesheets</span>
      <Table
        columns={tableColumns}
        rows={tableRows}
        rowOrder={rowOrder}
      />
    </div>
  );
}

