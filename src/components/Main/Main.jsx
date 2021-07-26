import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import LogIn from '../LogIn/LogIn';
import Posts from '../Posts/Posts';
import PostCreator from '../PostCreator/PostCreator';
import getUniqueId from '../../helpers/idGenerator';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      posts: [],
    };
  }

  addPost = (title, content) => {
    if (title && content) {
      this.setState((prevState) => {
        return {
          posts: [
            ...prevState.posts,
            {
              title,
              content,
              author: 'Hendo Pendo',
              date: new Date().toDateString(),
              id: getUniqueId(),
            },
          ],
        };
      });
    }
  };

  deletePost = (id) => {
    const { posts } = this.state;
    const newPosts = posts.filter((item) => item.id !== id);

    this.setState({ posts: newPosts });
  };

  render() {
    const { isLoggedIn, posts } = this.state;

    return (
      <>
        <Router>
          <NavBar isLoggedIn={isLoggedIn} />
          <Switch>
            <Route exact path="/">
              <Posts posts={posts} deleteHandler={this.deletePost} />
            </Route>
            <Route exact path="/add-post">
              <PostCreator clickHandler={this.addPost} />
            </Route>

            <Route path="/login">
              <LogIn />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}
