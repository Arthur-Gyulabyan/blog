import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
    padding: '0 2.5rem',
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
  const { classes, isLoggedIn } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar className={classes.toolbar}>
          <Link exact to="/" style={{ all: 'unset' }}>
            <Button
              edge="start"
              className={classes.homeButton}
              color="inherit"
              aria-label="menu">
              <HomeIcon className={classes.homeIcon} />
              <Typography variant="h6" className={classes.title}>
                BLOG
              </Typography>
            </Button>
          </Link>
          {isLoggedIn ? (
            <Button color="inherit" className={classes.logButton}>
              LogOut
            </Button>
          ) : (
            <Link to="/login" style={{ all: 'unset' }}>
              <Button color="inherit" className={classes.logButton}>
                LogIn
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.defaultProps = {
  isLoggedIn: false,
};

NavBar.propTypes = {
  classes: PropTypes.shape.isRequired,
  isLoggedIn: PropTypes.bool,
};

export default withStyles(styles)(NavBar);
