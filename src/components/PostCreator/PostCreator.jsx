import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

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
  disabledBtn: {
    '&:hover': {
      cursor: 'not-allowed',
    },
  },
};

function PostCreator({ classes, clickHandler }) {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    const text = e.target.value;
    setTitle(text);
  };

  const handleContentChange = (e) => {
    const text = e.target.value;

    setContent(text);
  };

  const clearTextField = () => {
    setTitle('');
    setContent('');
  };

  return (
    <Container maxWidth="sm" className={classes.flexContainer}>
      <form>
        <TextField
          required
          id="standard-basic"
          label="Title"
          color="secondary"
          className={classes.flexItem}
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          required
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
        {Boolean(title) && Boolean(content) ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              clickHandler(title, content);
              clearTextField();
              history.push('/');
            }}>
            Add Post
          </Button>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.disabledBtn}>
            Add Post
          </Button>
        )}
      </form>
    </Container>
  );
}

PostCreator.propTypes = {
  classes: PropTypes.shape({
    flexContainer: PropTypes.string.isRequired,
    flexItem: PropTypes.string.isRequired,
    disabledBtn: PropTypes.string.isRequired,
  }).isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(PostCreator);
