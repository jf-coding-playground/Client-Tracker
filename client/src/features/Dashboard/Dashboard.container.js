import React, { Component } from 'react';
import Dashboard from './Dashboard';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timesheets: []
    }
    this.urlParams = this.props.match.params;
  }

  componentDidMount() {
    const client = this.urlParams.client;

    client ? this.fetchTimeSheets(client) : this.fetchTimeSheets();
  }

  fetchTimeSheets = (client = '') => {
    fetch(`/api/v1/timesheets${client ? '/' + client : ''}`)
    .then(data => data.json())
    .then(timesheets => this.setState({ timesheets }))
  }

  handleTimesheetSubmit = (timesheet) => {
    console.log(timesheet)
  }

  render() {
    const { timesheets } = this.state;

    return (
      <Dashboard 
        timesheets={timesheets}
        onTimesheetSubmit={this.handleTimesheetSubmit}
      />
    )
  }
}
