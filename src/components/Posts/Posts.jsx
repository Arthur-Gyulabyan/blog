import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Post from '../Post/Post';
import getUniqueID from '../../helpers/idGenerator';

export default function Posts({ posts }) {
  return (
    <Container maxWidth="sm">
      {posts.map((item) => {
        const { title, content, author, date } = item;
        const id = getUniqueID();

        return (
          <Post
            title={title}
            content={content}
            author={author}
            date={date}
            key={id}
          />
        );
      })}
    </Container>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};
