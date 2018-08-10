import React from 'react';
import PropTypes from 'prop-types';

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from "@material-ui/core/styles/index";

import {GMAPS_API_KEY} from '../constants.js';

const style = {
  width: '50vw',
  height: '75vh'
};//style={style}

const styles = {
  card: {}
};

export class DCStationMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
//
  render() {
    return (
      <Card>
        <CardHeader title="Station Map"/>
        <Divider/>
        <CardContent>
          <Map item
            google={this.props.google}

            zoom={10}>
            {this.props.stations.map((val,idx) => {
              return (
              <Marker key={idx} name={val.name}
                title={val.name + '\n' + val.street_address + '\n' + val.city + ', ' + val.state + ' ' + val.zip_code}
                position={{lat: val.location.coordinates[1], lng: val.location.coordinates[0]}} />
              )
            })}
          </Map>
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