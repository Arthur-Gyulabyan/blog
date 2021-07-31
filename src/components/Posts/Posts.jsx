import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Post from '../Post/Post';

export default function Posts({ posts, deleteHandler, enterHandler }) {
  return (
    <Container maxWidth="sm">
      {posts.map((item) => {
        const { title, content, author, date, id } = item;

        return (
          <Post
            title={title}
            content={content}
            author={author}
            date={date}
            key={id}
            id={id}
            deleteHandler={deleteHandler}
            enterHandler={enterHandler}
            comments={item.comments}
          />
        );
      })}
    </Container>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  deleteHandler: PropTypes.func.isRequired,
  enterHandler: PropTypes.func.isRequired,
};
