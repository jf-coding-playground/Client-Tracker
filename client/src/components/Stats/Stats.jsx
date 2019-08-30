import React from 'react';
import './Stats.css';
import { RadialChart } from '../';
import { numberWithCommas } from '../../utils/helpers';

export default function Stats({ data }) {
  const { totalHoursTracked, totalBillableHours, totalBillableAmount } = data;
  const billableHoursPercentage = Math.floor((totalBillableHours / totalHoursTracked) * 100);
  const totalNonBillableHours = (totalHoursTracked - totalBillableHours).toFixed(2);

  return (
    <div className="stats shadow container">
      <div className="row">
        <div className="stats-col col-12 col-md-3 center">
          <div>
            <div className="stats-title">Hours Tracked</div>
            <div className="bold">{totalHoursTracked}</div>
          </div>
        </div>
        <div className="stats-graph stats-col col-12 col-md-3 center">
          <div className="stats-graph-percentage">{billableHoursPercentage}%</div>
          <RadialChart
            percentage={billableHoursPercentage}
          />
        </div>
        <div className="stats-col col-12 col-md-3 stats-graph-legend center">
          <div>
            <div className="stats-title mb-1">Billable Hours</div>
            <div className="stats-graph-legend-key">
              <div className="stats-graph-legend-key-item">
                <div className="bg-billable stats-graph-legend-key-item-box"></div>
                <div><span className="bold">${numberWithCommas(totalBillableHours)}</span>&nbsp;&nbsp;Billable</div>
              </div>
              <div className="stats-graph-legend-key-item">
                <div className="bg-non-billable stats-graph-legend-key-item-box"></div>
                <div><span className="bold">${numberWithCommas(totalNonBillableHours)}</span>&nbsp;&nbsp;Non-Billable</div>
              </div>
            </div>
          </div>
        </div>
        <div className="stats-col col-12 col-md-3 center">
          <div>
            <div className="stats-title">Billable Amount</div>
            <div className="bold">${numberWithCommas(totalBillableAmount)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
