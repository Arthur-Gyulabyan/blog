import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import LogIn from '../LogIn/LogIn';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <>
        <Router>
          <NavBar isLoggedIn={isLoggedIn} />

          <Switch>
            <Route path="/login">
              <LogIn />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}
