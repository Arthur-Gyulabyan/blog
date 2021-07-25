import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import LogIn from '../LogIn/LogIn';
import Posts from '../Posts/Posts';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      posts: [
        {
          author: 'Arthur',
          title: 'Hello',
          content: 'May the force be with you!',
          date: new Date().toDateString(),
        },
        {
          author: 'Hayk',
          title: 'Bye',
          content: 'Hastala-Vista Baby',
          date: new Date().toDateString(),
        },
        {
          author: 'Eminem',
          title: 'Sing For The Moment',
          content: 'Bla Bla Bla',
          date: new Date().toDateString(),
        },
        {
          author: 'Mad Max',
          title: 'Max Rockatansky',
          content: 'Bla Bla Bla',
          date: new Date().toDateString(),
        },
      ],
    };
  }

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

            <Route path="/login">
              <LogIn />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}
