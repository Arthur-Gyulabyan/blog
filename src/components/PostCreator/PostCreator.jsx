import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';

const styles = {
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexItem: {
    width: '100%',
    marginBottom: '2rem',
    '&:nth-child(1)': {
      marginTop: '4rem',
    },
  },
  textField: {
    '&:after': {
      borderBottom: '2px solid #3f51b5',
    },
  },
};

function PostCreator({ classes, clickHandler }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const clearTextField = () => {
    setTitle('');
    setContent('');
  };

  return (
    <Container maxWidth="sm" className={classes.flexContainer}>
      <TextField
        id="standard-basic"
        label="Title"
        color="secondary"
        className={classes.flexItem}
        value={title}
        onChange={handleTitleChange}
      />
      <TextField
        id="filled-multiline-flexible"
        label="Content"
        multiline
        rows={6}
        variant="filled"
        color="secondary"
        className={classes.flexItem}
        value={content}
        onChange={handleContentChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => {
          clickHandler(title, content);
          clearTextField();
        }}>
        Add Post
      </Button>
    </Container>
  );
}

PostCreator.propTypes = {
  classes: PropTypes.shape({
    flexContainer: PropTypes.string.isRequired,
    flexItem: PropTypes.string.isRequired,
  }).isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(PostCreator);
