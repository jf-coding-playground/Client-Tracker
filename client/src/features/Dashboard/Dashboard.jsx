import React from 'react';
import './Dashboard.css';
import { Layout, Table, Stats, Loader } from '../../components';

export default function Dashboard({ timesheets, clients, onTimeSheetSubmit }) {
  const renderLoading = () => <Loader />;

  const renderDashboard = () => (
    <div className="dashboard">
      <Stats />
      <Table
        data={timesheets}
      />
    </div>
  );

  return (
    <Layout>
      {timesheets.length < 1 ? renderLoading() : renderDashboard()}
    </Layout>
  );
}

