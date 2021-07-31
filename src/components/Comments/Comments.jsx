import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';

export default function Comments({ comments }) {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <Comment
            author={comment.author}
            content={comment.content}
            date={comment.date}
            key={comment.id}
          />
        );
      })}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
};
