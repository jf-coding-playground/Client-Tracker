import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { Table, Stats, Modal, Form } from '../../components';
import { formFields, formCheckBoxes, tableColumns } from './Dashboard.helpers';

export default function Dashboard({
  timesheets,
  clients,
  data,
  onClientSelection,
  onSubmitTimesheet
}) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const options = clients.map((client, i) => <option key={i} value={client}>{client}</option>);

  const tableRows = timesheets.map(({ client, project, hours, billableAmount }) => (
    [project, client, hours, hours, billableAmount]
  ));

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
          <Button onClick={handleShowModal} className="" variant="success">Add Timesheet</Button>
          <Modal
            show={showModal}
            onClose={handleCloseModal}
            title={'Add Timesheet'}>
            <Form
              fields={formFields}
              checkBoxes={formCheckBoxes}
              onSubmit={onSubmitTimesheet}
            />
          </Modal>
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
      />
    </div>
  );
}

