import * as ReactDOM from "react-dom";
import { StrictMode, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ThemeContext from "./Context/ThemeContext";

const Details = lazy(() => import("./components/Details/Details"));
const SearchParams = lazy(() =>
  import("./components/SearchParams/SearchParams")
);

const App = () => {
  const theme = useState("darkblue");

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className="p-0 m-0"
        style={{
          background:
            "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
        }}
      >
        <Suspense
          fallback={
            <div className="w-full h-screen flex justify-center items-center">
              <h2>loading ...</h2>
            </div>
          }
        >
          <Router>
            <header className="w-full mb-10 p-7 text-center bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
              <Link to="/" className="text-6xl text-white hover:text-gray-200">
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
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
