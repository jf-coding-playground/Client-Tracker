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
    let totalHoursTracked = 0
    let totalBillableHours = 0
    let totalBillableAmount = 0

    const newTimesheets = timesheets.map(timesheet => {
      const hours = parseInt(timesheet.hours);
      const billable = timesheet.billable === "Yes" ? true : false;
      const billableRate = timesheet.billableRate
      let billableAmount = billableRate * hours

      clients.push(timesheet.client);
      totalHoursTracked += hours;

      if (billable) {
        totalBillableHours += hours
        totalBillableAmount += billableAmount
      } else {
        billableAmount = '-'
      }

      return { ...timesheet, billableAmount };
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

// "_id": "5d66a8aa9b24883cbe263ac2",
// "Date": "2017-04-03T04:00:00.000Z",
// "Client": "Twitri",
// "Project": "CLOB Rearchitecture",
// "Project Code": "BGC001",
// "Task": "Project Management",
// "Hours": 6.26,
// "Hours Rounded": 6,
// "Billable?": "Yes",
// "Invoiced?": "Yes",
// "Approved?": "Yes",
// "First Name": "Walter",
// "Last Name": "Silva",
// "Department": "Product",
// "Employee?": "Yes",
// "Billable Rate": 50,
// "Cost Rate": 0,
// "Cost Amount": 0,
// "Currency": "United States Dollar - USD",
// "External Reference URL": null,
// "__v": 0
