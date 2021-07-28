import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Container,
} from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';
import LogOutModal from '../LogOutModal/LogOutModal';

const styles = {
  root: {
    flexGrow: 1,
  },
  leftContainer: {
    margin: 0,
  },
  toolbar: {
    justifyContent: 'space-between',
    padding: '0 2.5rem',
  },
  homeButton: {
    color: 'inherit',
    borderRadius: '0',
    marginRight: '4rem',
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

function NavBar({ classes, isLoggedIn, handleClick }) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar className={classes.toolbar}>
          <Container className={classes.leftContainer}>
            <Link exact="true" to="/" style={{ all: 'unset' }}>
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
            <Button
              onClick={() => {
                isLoggedIn ? history.push('/add-post') : history.push('/login');
              }}
              edge="start"
              className={classes.homeButton}
              color="inherit"
              aria-label="menu">
              <Typography variant="h6" className={classes.title}>
                ADD POST
              </Typography>
            </Button>
          </Container>
          {isLoggedIn ? (
            <Button
              color="inherit"
              className={classes.logButton}
              onClick={handleOpen}>
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
      <LogOutModal
        handleClose={handleClose}
        isOpen={open}
        handleClick={handleClick}
      />
    </div>
  );
}

NavBar.defaultProps = {
  isLoggedIn: false,
};

NavBar.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
    homeButton: PropTypes.string.isRequired,
    homeIcon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    logButton: PropTypes.string.isRequired,
    leftContainer: PropTypes.string.isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(NavBar);
