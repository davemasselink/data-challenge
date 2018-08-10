import React from 'react';

import Grid from '@material-ui/core/Grid';

import DCStationTable from '../DCStationTable/DCStationTable.js';
import DCStationMap from '../DCStationMap/DCStationMap.js';
import DCStationDataViz from '../DCStationDataViz/DCStationDataViz.js';

export default class DCColumnView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: []
    };
  }

  componentDidMount() {
    this.fetchGetStations();
  }

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item sm={12} md={6}>
          <DCStationTable stations={this.state.stations}/>
        </Grid>
        <Grid item sm={12} md={6}>
          <DCStationDataViz stations={this.state.stations}/>
          <DCStationMap stations={this.state.stations}/>
        </Grid>
      </Grid>
    );
  }

  fetchGetStations = () => {
    //return fetch("https://api.voltaapi.com/v1/stations")
    //TODO: turn me back live
    return fetch("stations.json")
      .then(res => res.json())
      .then((stations) => {
          this.setState({stations});
        },
        (error) => {
          this.setState({error});
        }
      );
  };
}