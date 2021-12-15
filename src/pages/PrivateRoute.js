import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Payment from "./Payment";
import PostDetail from "./PostDetail";
import Profile from "./Profile";
import List from "./List";
import Post from "./Post";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import IncomeTrip from "./IncomeTrip";
import Bookmark from "./Bookmark";
import Logout from "./Logout";
// import Logout from "./Logout";
import NotFound from "./Not Found";

function PrivateRoute() {
  const [state] = useContext(UserContext);

  console.log(state);

  return (
    <>
      {state.user.data.status === "admin" ? (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/income-trip" component={IncomeTrip} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/transaction" component={List} />
          <Route exact path="/logout" component={Logout} />
          <Route component={NotFound} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post-detail/:id" component={PostDetail} />
          <Route exact path="/payment/:id" component={Payment} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/bookmark" component={Bookmark} />
          <Route exact path="/logout" component={Logout} />
          <Route component={NotFound} />
        </Switch>
      )}
    </>
  );
}

export default PrivateRoute;
