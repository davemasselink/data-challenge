import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigationMenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class DCMenu extends React.Component {
  constructor(props){
    super(props);
    this.classes = props.classes;
  }
  render() {
    return (
      <div className={this.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={this.classes.menuButton} aria-label="Menu">
              <NavigationMenuIcon/>
            </IconButton>
            <Typography variant="title" className={this.classes.flex}>
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

DCMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DCMenu);