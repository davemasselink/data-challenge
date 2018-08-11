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
  }

  render() {
    //count each enum across each station's status
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
        text: 'Statuses of Filtered Stations'
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