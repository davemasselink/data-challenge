import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, withStyles, withTheme, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import DCMenu from './DCMenu/DCMenu.js';
import DCStationTable from './DCStationTable/DCStationTable.js';

const title = 'DataChallenge';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

const styles = theme => ({
  menu: {}
});

class DCApp extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <DCMenu title={title} classes={styles.menu}/>
          <DCStationTable/>
        </MuiThemeProvider>
      </div>
    );
  }
}

DCApp.propTypes = {
  theme: PropTypes.object.isRequired,
};

ReactDOM.render(
  <DCApp theme={theme}/>,
  document.getElementById('app')
);

export default withStyles(styles)(withTheme()(DCApp));