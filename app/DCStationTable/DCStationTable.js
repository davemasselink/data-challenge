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


const styles = {
  card: {},
  input: {},
};

class DCStationTable extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;

    this.state = {
      //stations: props.stations,
      searchFilter: ''
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.stations !== nextProps.stations){
      console.log('receiving props: ' + nextProps);
    }
  }

  handleFilterChange = event => {
    this.setState({
      searchFilter: event.target.value
    });
  };

  render() {
    return (
      <Card className={this.classes.card}>
        <CardHeader title="Station List"/>
        <Divider/>
        <CardContent>
          <Input
            label={'Filter'}
            placeholder={'Filter by name...'}
            value={this.state.searchFilter}
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
              {this.props.stations.
              filter(station => {
                return (station.name.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) > -1)}).
              map((val,index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {val.name}
                    </TableCell>
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
    );
  }
}

DCStationTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DCStationTable);