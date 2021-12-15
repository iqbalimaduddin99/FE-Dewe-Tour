import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setAuthToken } from "../config/api";
import { UserContext } from "../context/UserContext";

const Logout = () => {
  const history = useHistory();
  const [, dispatch] = useContext(UserContext);
  useEffect(() => {
    dispatch({ type: "logout", payload: {} });
    // localStorage.removeItem('token')
    history.push("/");
    setAuthToken("");
  });
  return <h1>Logout</h1>;
};

export default Logout;
