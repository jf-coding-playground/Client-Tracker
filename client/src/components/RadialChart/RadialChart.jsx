import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

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
            }, track: {
              background: ['#ade19b']
            }
          },
        },
        labels: [`${props.percentage}%`]
      },
      series: [props.percentage],
    }
  }

  componentWillReceiveProps(nextProps) {
    const { percentage } = nextProps;

    if (percentage !== this.props.percentage) {
      const { options } = this.state;

      options.plotOptions.radialBar.hollow.size = percentage;
      options.labels = [`${percentage}%`];

      this.setState({
        options,
        series: [percentage]
      });
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
        />
      </div>
    )
  }
}