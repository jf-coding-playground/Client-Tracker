import React from 'react';
import './Stats.css';

export default function Stats({ data }) {
  const { totalHoursTracked, totalBillableHours,
    totalBillableAmount } = data;
  return (
    <div className="container stats">
      <div className="row">
        <div className="col">
          <div>Hours Tracked</div>
          <div>{totalHoursTracked}</div>
        </div>
        <div className="col">
          <div>{totalBillableHours}</div>
          <div>Billable Hours</div>
        </div>
        <div className="col">
          <div>Billable Amount</div>
          <div>${totalBillableAmount}</div>
        </div>
      </div>
    </div>
  )
}
