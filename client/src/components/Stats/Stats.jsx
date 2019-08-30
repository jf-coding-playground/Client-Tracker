import React from 'react';
import './Stats.css';

export default function Stats({ data }) {
  const { totalHoursTracked, totalBillableHours,
    totalBillableAmount } = data;
  return (
    <div className="container stats shadow">
      <div className="row">
        <div className="col">
          <div className="stats-title">Hours Tracked</div>
          <div>{totalHoursTracked}</div>
        </div>
        <div className="col stats-graph">
          <div>{totalBillableHours}</div>
          <div className="stats-title">Billable Hours</div>
        </div>
        <div className="col">
          <div className="stats-title">Billable Amount</div>
          <div>${totalBillableAmount}</div>
        </div>
      </div>
    </div>
  )
}
