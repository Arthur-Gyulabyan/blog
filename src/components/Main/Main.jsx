import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import LogIn from '../LogIn/LogIn';
import Posts from '../Posts/Posts';
import PostCreator from '../PostCreator/PostCreator';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      posts: [],
    };
  }

  addPost = (title, content) => {
    this.setState((prevState) => {
      return {
        posts: [
          ...prevState.posts,
          { title, content, author: 'Hendo', date: new Date().toDateString() },
        ],
      };
    });
  };

  render() {
    const { isLoggedIn, posts } = this.state;

    return (
      <>
        <Router>
          <NavBar isLoggedIn={isLoggedIn} />
          <Switch>
            <Route exact path="/">
              <Posts posts={posts} />
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
