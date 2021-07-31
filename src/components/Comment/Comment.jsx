import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

const theme = createTheme();

const styles = {
  root: {
    width: '100%',
    marginBottom: '0.7rem',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
};

function Comment({ classes, author, date, content }) {
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {author[0]}
          </Avatar>
        }
        title={content}
        subheader={date}
      />
    </Card>
  );
}

Comment.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default withStyles(styles)(Comment);
