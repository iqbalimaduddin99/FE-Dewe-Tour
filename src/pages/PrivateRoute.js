import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Payment from "./Payment";
import PostDetail from "./PostDetail";
import Profile from "./Profile";
import List from "./List";
import Post from "./Post";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import IncomeTrip from "./IncomeTrip";
import Logout from "./Logout";
// import Logout from "./Logout";

function PrivateRoute() {
  const [state] = useContext(UserContext);

  console.log(state)
  return (
    <>
      {state.user.fullName === "admin" ? (
        <>
          <Route exact path="/" component={ Home} />
          <Route exact path="/income-trip" component={IncomeTrip} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/transaction" component={List} />
          <Route exact path="/logout" component={Logout} />
        </>
      ) : (
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/post-detail/:id" component={PostDetail} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/logout" component={Logout} />
        </>
      )}
    </>
  );
}

export default PrivateRoute;
