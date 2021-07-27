import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { pink } from '@material-ui/core/colors';

const theme = createTheme();

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 4, 3),
  },
  centeredText: {
    textAlign: 'center',
  },
  approveButton: {
    backgroundColor: pink['600'],
    color: '#fafafa',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
};

function LogOutModal({ classes, handleClose, isOpen }) {
  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" className={classes.centeredText}>
        Are you sure?
      </h2>
      <Button className={classes.approveButton}>Yes</Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  );
}

LogOutModal.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired,
    centeredText: PropTypes.string.isRequired,
    approveButton: PropTypes.string.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(LogOutModal);
