import React from 'react';
import { createTheme, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { pink } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Delete from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const theme = createTheme();

const styles = {
  root: {
    width: '100%',
    marginBottom: '1rem',
    '&:nth-child(1)': {
      marginTop: '1rem',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  commentInput: {
    width: '100%',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.complex,
    }),
    margin: '1rem 0',
    '& .MuiInputBase-root': {
      width: '50%',
    },

    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },

    '& .Mui-focused': {
      width: '100%',
    },
  },
  commentsHeader: {
    borderTop: '1px solid rgba(0, 0, 0, 0.42)',
  },
  avatar: {
    width: '100%',
    backgroundColor: pink.A400,
    borderRadius: '1rem',
    padding: '0.5rem',
  },
};

function Post({ classes, author, title, date, content, deleteHandler, id }) {
  const [liked, setLiked] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleFavoriteClick = () => {
    setLiked(!liked);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {author}
          </Avatar>
        }
        action={
          <IconButton aria-label="delete" onClick={() => deleteHandler(id)}>
            <Delete />
          </IconButton>
        }
        title={<Typography variant="h5">{title}</Typography>}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
          color={liked ? 'secondary' : 'default'}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ position: 'relative' }}>
          <Typography variant="h6" className={classes.commentsHeader}>
            Comments
          </Typography>
          <TextField
            required
            id="standard-basic"
            label="Add Comment"
            color="secondary"
            className={classes.commentInput}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}

Post.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    expand: PropTypes.string.isRequired,
    expandOpen: PropTypes.string.isRequired,
    commentInput: PropTypes.string.isRequired,
    commentsHeader: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(styles)(Post);
