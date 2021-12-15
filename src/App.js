import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import PrivateRoute from "./pages/PrivateRoute";

import { useContext, useEffect } from "react";

import { UserContext } from "./context/UserContext";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import { API, setAuthToken } from "./config/api";
import NotFound from "./pages/Not Found";

function App() {
  const [state, dispatch] = useContext(UserContext);
  const history = useHistory();

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/authorization");

      if (!token) {
        dispatch({
          type: "logout",
          payload: {},
        });
        history.push("/");
      }
      dispatch({
        type: "login_success",
        payload: { ...response.data, token },
      });
    } catch (error) {
      console.log(error);
      if (error.status === "failed") {
        dispatch({
          type: "logout",
          payload: {},
        });
        history.push("/");
      }
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <Switch>
        {state.isLogin ? (
            <PrivateRoute />
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post-detail/:id" component={PostDetail} />
            <Route component={NotFound} />
          </Switch>
        )}
      </Switch>
    </Router>
  );
}

export default App;
