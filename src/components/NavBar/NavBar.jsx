import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    justifyContent: 'space-between',
  },
  homeButton: {
    color: 'inherit',
    borderRadius: '0',
  },
  homeIcon: {
    width: '2rem',
    height: '2rem',
  },
  title: {
    flexGrow: 1,
    fontSize: '2rem',
  },
  logButton: {
    fontSize: '1.5rem',
    textTransform: 'none',
  },
};

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function NavBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.flex}>
          <IconButton
            edge="start"
            className={classes.homeButton}
            color="inherit"
            aria-label="menu">
            <HomeIcon className={classes.homeIcon} />
            <Typography variant="h6" className={classes.title}>
              BLOG
            </Typography>
          </IconButton>
          <Button color="inherit" className={classes.logButton}>
            LogIn
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.shape.isRequired,
};

export default withStyles(styles)(NavBar);
