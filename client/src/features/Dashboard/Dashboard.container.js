import React, { Component } from 'react';
import Dashboard from './Dashboard';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timesheets: [],
      clients: []
    }
    this.urlParams = this.props.match.params;
  }

  componentDidMount() {
    const client = this.urlParams.client;
    console.log("TCL: DashboardContainer -> componentDidMount -> client", client)

    client ? this.fetchTimeSheets(client) : this.fetchTimeSheets();
  }

  fetchTimeSheets = (client = '') => {
    const url = `/api/v1/timesheets${client ? '/' + client : ''}`;
    
    fetch(url)
      .then(data => data.json())
      .then(timesheets => {
        this.setState({ timesheets });
        return timesheets;
      })
      .then(timesheets => this.getClientNames(timesheets))
      .catch(err => console.log(err))
  }

  getClientNames = (timesheets) => {
    const clients = new Set(timesheets.map(timesheet => timesheet.Client));

    this.setState({clients: [...clients]});
  }

  handleTimesheetSubmit = (timesheet) => {
    console.log(timesheet)
  }

  render() {
    const { timesheets, clients } = this.state;

    return (
      <Dashboard
        clients={clients} 
        timesheets={timesheets}
        onTimesheetSubmit={this.handleTimesheetSubmit}
      />
    )
  }
}
