import React, { Component } from 'react';
import Chart from 'react-apexcharts';

export default class RadialChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ['#38ab18'],
        plotOptions: {
          radialBar: {
            hollow: {
              size: `50%`
            },
            track: {
              background: ['#ade19b']
            },
            dataLabels: {
              show: false,
            }
          },
        },
        labels: [`${props.percentage}%`]

      },
      series: [props.percentage]
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { percentage } = nextProps;

    if (percentage !== this.props.percentage) {
      const { options } = this.state;

      options.plotOptions.radialBar.hollow.size = percentage;
      options.labels[0] = `${percentage}%`;

      this.setState({
        options,
        series: [percentage]
      });
    }
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
        />
      </div>
    )
  }
}