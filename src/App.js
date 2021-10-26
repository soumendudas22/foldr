
import './App.css';
import Login from "@pages/Login";
import Home from "@pages/Home/Home";
import AuthenticatedRoute from "@components/AuthRoute/AuthenticatedRoute";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
          </Switch>
        </Router>
      </div>
    </div >
  );
}

export default App;
