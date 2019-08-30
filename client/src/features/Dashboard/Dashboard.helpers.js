export const mapTimesheetData = function(timesheet) {
  return {
    date: timesheet["Date"],
    client: timesheet["Client"],
    project: timesheet["Project"],
    projectCode: timesheet["Project Code"],
    task: timesheet["Task"],
    hours: timesheet["Hours"],
    hoursRounded: timesheet["Hours Rounded"],
    billable: timesheet["Billable?"],
    invoiced: timesheet["Invoiced?"],
    approved: timesheet["Approved?"],
    firstName: timesheet["First Name"],
    lastName: timesheet["Last Name"],
    department: timesheet["Department"],
    employee: timesheet["Employee?"],
    billableRate: timesheet["Billable Rate"],
    costRate: timesheet["Cost Rate"],
    costAmount: timesheet["Cost Amount"],
    currency: timesheet["Currency"],
    externalReferenceUrl: timesheet["External Reference URL"]
  };
}

export const tableColumns = [
  "Name",
  "Client",
  "Hours",
  "Billable Hours",
  "Billable Amount"
];

export const formFields = [
  {name: 'Client', type: 'text'},
  {name: 'Project', type: 'text'},
  {name: 'Project Code', type: 'text'},
  {name: 'Task', type: 'text'},
  {name: 'Hours', type: 'number'},
  {name: 'First Name', type: 'text'},
  {name: 'Last Name', type: 'text'},
  {name: 'Department', type: 'text'},
  {name: 'Billable Rate', type: 'number'},
  {name: 'Cost Rate', type: 'number'},
  {name: 'Currency', type: 'text'},
  {name: 'External Reference URL', type: 'text', required: false}
];

export const formCheckBoxes = [
  'Billable?',
  'Invoiced?',
  'Approved?',
  'Employee?'
];