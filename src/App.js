import * as ReactDOM from "react-dom";
import SearchParams from "./components/SearchParams/SearchParams";
import { StrictMode } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Details from "./components/Details/Details";

const App = () => {
  return (
    <div>
      <Router>
        <header>
          <Link to="/">
            <h1>Adopt me!</h1>
          </Link>
        </header>
        <Switch>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/">
            <SearchParams />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
