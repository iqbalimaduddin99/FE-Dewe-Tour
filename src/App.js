import {
  BrowserRouter as Router,
  // Route,
  Switch,
  // useHistory,
} from "react-router-dom";
import "./App.css";
import PrivateRoute from "./pages/PrivateRoute";
// import { API, setAuthToken } from "./config/api";

function App() {

  return (
    <Router>
      <Switch>
        <PrivateRoute />
      </Switch>
    </Router>
  );
}

export default App;

// const history = useHistory();
// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }
// const cekAuthorization = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await API.get("/authorization");
//     console.log(res)
//     const response = res.data.data;

//     dispatch({
//       type: "login_success",
//       payload: { ...response, token },
//     });
//   } catch (error) {
//     console.log(error)
//     if (error.status === "failed") {
//       dispatch({
//         type: "logout",
//         payload: {},
//       });
//       history.push("/");
//     }
//   }
// };

// useEffect(() => {
//   cekAuthorization();
// }, []);
