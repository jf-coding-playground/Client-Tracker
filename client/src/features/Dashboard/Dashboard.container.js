import React, { Component } from 'react';
import Dashboard from './Dashboard';
import { Loader, Layout } from '../../components';
import { mapTimesheetData, formFields, formCheckBoxes } from './Dashboard.helpers';

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
        maxBillableHour: 0
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
      .then(timesheets => timesheets.map(timesheet => mapTimesheetData(timesheet)))
      .then(timesheets => this.getDataFromTimesheets(timesheets))
      .catch(err => console.log(err))
  }

  getDataFromTimesheets = (timesheets) => {
    let clients = [];
    let totalHoursTracked = 0;
    let totalBillableHours = 0;
    let totalBillableAmount = 0;
    let maxBillableHours = 0;
    let billableHours = 0;
    let billablePercentage = 0;

    const newTimesheets = timesheets.map(timesheet => {
      const { client, hours, billable, billableRate } = timesheet;
      let billableAmount = (billableRate * hours);
      billableHours = hours;

      clients.push(client);
      totalHoursTracked += hours;

      if (billable) {
        totalBillableHours += hours;
        totalBillableAmount += billableAmount;
        billableAmount = billableAmount.toFixed(2)
        billablePercentage = Math.floor((billableHours / hours) * 100);

        if (hours > maxBillableHours) maxBillableHours = hours;
      } 
      else {
        billableAmount = '-';
        billablePercentage = 0;
      }

      return { 
        ...timesheet, 
        billableAmount, 
        billableHours,
        billablePercentage 
      };
    });

    clients = new Set(clients);

    this.setState({
      timesheets: newTimesheets,
      clients: [...clients],
      data: {
        totalHoursTracked: totalHoursTracked.toFixed(2),
        totalBillableHours: totalBillableHours.toFixed(2),
        totalBillableAmount: totalBillableAmount.toFixed(2),
        maxBillableHours
      }
    });
  }

  handleClientSelection = ({ target }) => {
    const client = target.value;

    this.props.history.push(`/${client}`);
    this.fetchTimeSheets(client);
  }

  handleSubmitTimesheet = (event) => {
    let newTimesheet = {}
    
    formFields.forEach(field => newTimesheet[field.name] = event.target[field.name].value)
    formCheckBoxes.forEach(checkBox => {
      const checkBoxValue = event.target[checkBox].checked
      const value = checkBoxValue ? 'Yes' : 'No'
      
      newTimesheet[checkBox] = value
    })

    newTimesheet = {
      ...newTimesheet,
      'Date': new Date(),
      'Hours Rounded': Math.floor(newTimesheet['Hours']),
      'Cost Amount': newTimesheet['Cost Rate'] * newTimesheet['Hours']
    }

    console.log(newTimesheet)
    const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTimesheet)
    }

    fetch('/api/v1/timesheet', options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
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