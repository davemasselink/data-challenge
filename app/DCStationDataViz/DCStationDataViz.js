import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const styles = {
  card: {}
};

class DCStationDataViz extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;

    this.state = {
      stations: [],
      //data: options.series.data,
      data: props.stations,
      page: 0,
      rowsPerPage: 5,
      dialogOpen: false
    };
  }

  componentDidMount() {
  }

  render() {
    //process data
    // walk while counting status values
    let active = 0;
    let needsService = 0;
    let underConstruction = 0;

    this.props.stations.forEach((val) => {
      switch (val.status){
        case 'active':
          active += 1;
          break;
        case 'needs service':
          needsService += 1;
          break;
        case 'under construction':
          underConstruction += 1;
          break;
      }
    });


    const seriesData = [{y: active, name: 'active'},
      {y: needsService, name: 'needs_service'},
      {y: underConstruction, name: 'under_construction'}];

    const chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Status Breakdown for Selected Stations'
      },
      series: [{
        data: seriesData
      }]
    };

    return (
      <Card className={this.classes.card}>
        <CardHeader title="Station Data">
        </CardHeader>
        <Divider/>
        <CardContent>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}/>
        </CardContent>
      </Card>
    );
  }
}

DCStationDataViz.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DCStationDataViz);