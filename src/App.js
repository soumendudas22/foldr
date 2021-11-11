
import './App.css';
import Login from "@pages/Login";
import Home from "@pages/Home/Home";
import AuthenticatedRoute from "@components/AuthRoute/AuthenticatedRoute";

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '@components/404';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <AuthenticatedRoute
              path="/home"
              component={Home}
            />
            <Route exact path="/" render={() => (<Redirect to="/home" />)} />
            <Route path="" component={NotFound} />
          </Switch>
        </Router>
      </div>
    </div >
  );
}

export default App;
