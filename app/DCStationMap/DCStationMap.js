import React from 'react';
import PropTypes from 'prop-types';

import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from "@material-ui/core/styles/index";

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

import {GMAPS_API_KEY} from '../constants.js';

const styles = {
  card: {},
  map: {
    width: '46%',
    height: '43%'
  },
  mapContainer: {
    height: '460px'
  }

};

export class DCStationMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let bounds = new this.props.google.maps.LatLngBounds();
    let points = [];
    for(let i = 0; i < this.props.stations.length; i++){
      let val = this.props.stations[i];
      let lat = val.location.coordinates[1];
      let lng = val.location.coordinates[0];
      bounds.extend({lat, lng});
      points.push({lat, lng});
    }

    return (
      <Card>
        <CardHeader title="Station Map"/>
        <Divider/>
        <CardContent>
          <div className="box box-default" style={styles.mapContainer}>
            <div className="box-body">
              <div className="row">
                <Map google={this.props.google}
                  style={styles.map}
                  zoom={2}
                  initialCenter={{
                    lat: 37.752450,
                    lng: -122.408087
                  }}
                  bounds={bounds}>
                  {points.map((pt,idx) => {
                    return (
                    <Marker key={idx}
                      position={pt} /> )
                  })}
                </Map>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

DCStationMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default GoogleApiWrapper({
  apiKey: (GMAPS_API_KEY)
})(withStyles(styles)(DCStationMap))