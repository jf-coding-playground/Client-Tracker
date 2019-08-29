import React, { Component } from 'react';
import Dashboard from './Dashboard';
import { Loader, Layout } from '../../components';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timesheets: [],
      clients: [],
      data: {
        totalHoursTracked: 0,
        totalBillableAmount: 0,
        totalBillableHours: 0,
      }
    }
    this.urlParams = this.props.match.params.client;
  }

  componentDidMount() {
    const client = this.urlParams;

    client ? this.fetchTimeSheets(client) : this.fetchTimeSheets();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const newURL = nextProps.match.params.client;

    this.fetchTimeSheets(newURL);
  }

  fetchTimeSheets = (client = '') => {
    const url = `/api/v1/timesheets${client ? '/' + client : ''}`;

    fetch(url)
      .then(data => data.json())
      .then(timesheets => this.getDataFromTimesheets(timesheets))
      .catch(err => console.log(err))
  }

  getDataFromTimesheets = (timesheets) => {
    let clients = [];
    let totalHoursTracked = 0
    let totalBillableHours = 0
    let totalBillableAmount = 0

    const newTimesheets = timesheets.map(timesheet => {
      const hours = parseInt(timesheet.Hours);
      const billable = timesheet["Billable?"] === "Yes" ? true : false;
      const billableRate = timesheet["Billable Rate"]
      let Billable_Amount = billableRate * hours

      clients.push(timesheet.Client);
      totalHoursTracked += hours;

      if (billable) {
        totalBillableHours += hours
        totalBillableAmount += Billable_Amount
      } else {
        Billable_Amount = '-'
      }

      return { ...timesheet, Billable_Amount };
    });

    clients = new Set(clients);

    this.setState({
      timesheets: newTimesheets,
      clients: [...clients],
      data: {
        totalHoursTracked,
        totalBillableHours,
        totalBillableAmount
      }
    })
  }

  handleClientSelection = ({ target }) => {
    const client = target.value;

    this.props.history.push(`/${client}`);
    this.fetchTimeSheets(client);
  }

  handleSubmitTimesheet = (event) => {
    event.preventDefault();
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify(newTimesheet)
    // }

    // fetch('/api/v1/timesheet', options)
    // .then(res => console.log(res));
  }

  render() {
    const { timesheets, clients, data  } = this.state;

    return (
      <Layout>
        {timesheets.length < 1 ? <Loader /> :
          <Dashboard
            timesheets={timesheets}
            clients={clients}
            data={data}
            onClientSelection={this.handleClientSelection}
            onSubmitTimesheet={this.handleSubmitTimesheet}
          />
        }
      </Layout>
    )
  }
}
