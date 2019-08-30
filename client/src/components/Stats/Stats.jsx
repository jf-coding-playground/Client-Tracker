import React from 'react';
import './Stats.css';

export default function Stats({ data }) {
  const { totalHoursTracked, totalBillableHours, totalBillableAmount } = data;
  const billableHoursPercentage = Math.floor((totalBillableHours / totalHoursTracked) * 100);
  const totalNonBillableHours = (totalHoursTracked - totalBillableHours).toFixed(2);

  return (
    <div className="container stats shadow">
      <div className="row">
        <div className="col">
          <div className="stats-title">Hours Tracked</div>
          <div className="bold">{totalHoursTracked}</div>
        </div>
        <div className="col stats-graph">
          <div>{`${billableHoursPercentage}%`}</div>
          <div>
            <div className="stats-title mb-1">Billable Hours</div>
            <div className="stats-graph-key">
              <div className="stats-graph-key-item">
                <div className="bg-billable stats-graph-key-item-box"></div>
                <div><span className="bold">{totalBillableHours}</span> Billable</div>
              </div>
              <div className="stats-graph-key-item">
                <div className="bg-non-billable stats-graph-key-item-box"></div>
                <div><span className="bold">{totalNonBillableHours}</span> Non-Billable</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="stats-title">Billable Amount</div>
          <div className="bold">${totalBillableAmount}</div>
        </div>
      </div>
    </div>
  )
}
