import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

import DCStationMap from '../DCStationMap/DCStationMap.js';
import DCStationDataViz from '../DCStationDataViz/DCStationDataViz.js';


const styles = {
  card: {
    overflow: 'scroll',
    height: '1080px'
  },
  input: {},
};

class DCStationTable extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;

    this.state = {
      rawStations: [],
      filteredStations: [],
      filterStr: ''
    };
  }

  componentDidMount() {
    this.fetchGetStations();
  }

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item sm={12} md={6}>
          <Card className={this.classes.card}>
            <CardHeader title="Station List"/>
            <Divider/>
            <CardContent>
              <Input
                label={'Filter'}
                placeholder={'Filter by name...'}
                value={this.state.filterStr}
                onChange={this.handleFilterChange}
                className={this.classes.input}
                inputProps={{
                  'aria-label': 'Description',
                }}
              />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Zip Code</TableCell>
                    <TableCell>Build Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.filteredStations.map((val,index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{val.name}</TableCell>
                        <TableCell>{val.status}</TableCell>
                        <TableCell>{val.city}</TableCell>
                        <TableCell>{val.state}</TableCell>
                        <TableCell numeric>{val.zip_code}</TableCell>
                        <TableCell numeric>{val.completion_date.split('T')[0]}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={6}>
          <DCStationDataViz stations={this.state.filteredStations}/>
          <Divider/>
          <DCStationMap stations={this.state.filteredStations}/>
        </Grid>
      </Grid>
    );
  }

  fetchGetStations = () => {
    //the following string is broken up to limit the chance that
    //someone would find this project in an online search
    return fetch("https://api.vol" + "taapi.com/v1/stations") //alternatively, fetch "stations.json" to grab the project local copy of data
      .then(res => res.json())
      .then((stations) => {
          this.setState({
            rawStations: stations,
            filteredStations: stations
          });
        },
        (error) => {
          this.setState({error});
        }
      );
  };

  handleFilterChange = event => {
    let filterStr = event.target.value;
    let filteredStations = this.state.rawStations.filter(station => {
      //only let thru stations with the filter string in their name
      return (station.name.toLowerCase().indexOf(filterStr.toLowerCase()) > -1);
    });

    this.setState({
      filterStr: filterStr,
      filteredStations: filteredStations
    });
  };
}

DCStationTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DCStationTable);