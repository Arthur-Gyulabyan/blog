import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import NavBar from '../NavBar/NavBar';
import LogIn from '../LogIn/LogIn';
import Posts from '../Posts/Posts';
import PostCreator from '../PostCreator/PostCreator';
import { saveData, getData } from '../../helpers/localStorage';
import { findUserByNameAndPassword } from '../../helpers/checkUsersExistence';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: Boolean(getData('currentUser')),
      posts: getData('posts') ?? [],
      users: getData('users') ?? [],
      currentUser: getData('currentUser'),
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { posts, users, currentUser } = this.state;
    saveData('posts', posts);
    saveData('users', users);
    saveData('currentUser', currentUser);
  }

  addPost = (title, content) => {
    const {
      currentUser: { name, userId },
    } = this.state;

    if (title && content) {
      this.setState((prevState) => {
        const newPosts = [
          ...prevState.posts,
          {
            title,
            content,
            author: name,
            authorId: userId,
            date: new Date().toDateString(),
            id: generateUniqueID(),
            comments: [],
          },
        ];

        return {
          posts: newPosts,
        };
      });
    }
  };

  deletePost = (id) => {
    const { currentUser, posts } = this.state;
    const targetPost = posts.find((item) => item.id === id);
    const deletable = currentUser
      ? targetPost.authorId === currentUser.userId
      : false;

    if (deletable) {
      const newPosts = posts.filter((item) => item.id !== id);

      this.setState({ posts: newPosts });
    }

    this.showNotificationOnDelete(deletable);
  };

  showNotificationOnDelete = (deletable) => {
    const { enqueueSnackbar } = this.props;

    const message = deletable
      ? 'Post deleted.'
      : 'You can delete only your posts';
    enqueueSnackbar(message, {
      variant: deletable ? 'success' : 'error',
    });
  };

  handleLogIn = (name, userId, password) => {
    const { users } = this.state;
    const userFromBase = findUserByNameAndPassword(users, name, password);

    if (userFromBase) {
      this.setState({
        isLoggedIn: true,
        currentUser: {
          name: userFromBase.name,
          userId: userFromBase.id,
        },
      });
    } else {
      this.setState((prevState) => {
        const newUsers = [...prevState.users, { name, id: userId, password }];

        return {
          isLoggedIn: true,
          users: newUsers,
          currentUser: {
            name,
            userId,
          },
        };
      });
    }
  };

  handleLogOut = () => {
    this.setState({ isLoggedIn: false, currentUser: null });
  };

  addComment = (e, id, text) => {
    const { currentUser, posts } = this.state;
    const postsCopy = JSON.parse(JSON.stringify(posts));
    const targetPost = postsCopy.find((item) => item.id === id);
    const newComment = {
      author: currentUser.name,
      content: text,
      date: new Date().toDateString(),
      id: generateUniqueID(),
    };

    targetPost.comments.unshift(newComment);

    this.setState((prevState) => {
      return {
        posts: postsCopy,
      };
    });
  };

  render() {
    const { isLoggedIn, posts, currentUser } = this.state;

    return (
      <>
        <Router>
          <NavBar
            isLoggedIn={isLoggedIn}
            handleClick={this.handleLogOut}
            currentUserName={currentUser ? currentUser.name : ''}
          />
          <Switch>
            <Route exact path="/">
              <Posts
                posts={posts}
                deleteHandler={this.deletePost}
                enterHandler={this.addComment}
              />
            </Route>
            <Route exact path="/add-post">
              <PostCreator
                clickHandler={this.addPost}
                currentUserName={currentUser ? currentUser.name : ''}
              />
            </Route>

            <Route path="/login">
              <LogIn handleLogInClick={this.handleLogIn} />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

Main.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(Main);
