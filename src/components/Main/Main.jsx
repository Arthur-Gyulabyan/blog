import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import NavBar from '../NavBar/NavBar';
import LogIn from '../LogIn/LogIn';
import Posts from '../Posts/Posts';
import PostCreator from '../PostCreator/PostCreator';
import { saveData, getData } from '../../helpers/localStorage';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      posts: getData('posts') ?? [],
      users: getData('users') ?? [],
      currentUser: {
        name: '',
        userId: '',
      },
    };
  }

  addPost = (title, content) => {
    const {
      currentUser: { name },
    } = this.state;

    if (title && content) {
      this.setState((prevState) => {
        const newPosts = [
          ...prevState.posts,
          {
            title,
            content,
            author: name,
            date: new Date().toDateString(),
            id: generateUniqueID(),
          },
        ];

        saveData('posts', newPosts);

        return {
          posts: newPosts,
        };
      });
    }
  };

  deletePost = (id) => {
    const { posts } = this.state;
    const newPosts = posts.filter((item) => item.id !== id);

    saveData('posts', newPosts);
    this.setState({ posts: newPosts });
  };

  handleLogIn = (name, userId, password) => {
    this.setState((prevState) => {
      const newUsers = [...prevState.users, { name, id: userId, password }];

      saveData('users', newUsers);

      return {
        isLoggedIn: true,
        users: newUsers,
        currentUser: {
          name,
          userId,
        },
      };
    });
  };

  handleLogOut = () => {
    this.setState({ isLoggedIn: false, currentUser: {} });
  };

  render() {
    const { isLoggedIn, posts, currentUser, users } = this.state;
    console.log(users);

    return (
      <>
        <Router>
          <NavBar isLoggedIn={isLoggedIn} handleClick={this.handleLogOut} />
          <Switch>
            <Route exact path="/">
              <Posts posts={posts} deleteHandler={this.deletePost} />
            </Route>
            <Route exact path="/add-post">
              <PostCreator
                clickHandler={this.addPost}
                currentUserName={currentUser.name}
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
