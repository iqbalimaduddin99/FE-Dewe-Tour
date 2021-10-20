import { BrowserRouter as Router, Route } from "react-router-dom";
// import DetailPost from "./DetailPost";
import Home from "./Home";
import Payment from "./Payment";
import PostDetail from "./PostDetail";
import Profile from "./Profile";
import List from "./List";
import Post from "./Post";
// import Profile from "./Profile";
// import List from "./LIst";
// import History from "./HIstory";
// import HistoryPost from "./HistoryPost";
// import Logout from "./Logout";

function PrivateRoute() {
  return (
    <Router>
      <>
        <Route exact path="/" component={Home} />
        <Route exact path="/post-detail/:id" component={PostDetail} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/transaction" component={List} />
        <Route exact path="/post" component={Post} />
      </>
    </Router>
  );
}

export default PrivateRoute;

// {state.user.fullName === "admin" ? (
//   <>
//     <Route exact path="/" component={Home} />
//     <Route exact path="/detail-post/:id" component={DetailPost} />
//     <Route exact path="/profile" component={Profile} />
//     <Route exact path="/posting" component={Posting} />
//     <Route exact path="/history" component={History} />
//     <Route exact path="/post-history" component={HistoryPost} />
//     <Route exact path="/logout" component={Logout} />
//   </>
// ) : (
//   <>
//     <Route exact path="/" component={Home} />
//     <Route exact path="/detail-post/:id" component={DetailPost} />
//     <Route exact path="/profile" component={Profile} />
//     <Route exact path="/posting" component={Posting} />
//     <Route exact path="/logout" component={Logout} />
//     <Route exact path="/history" component={History} />
//     <Route exact path="/post-history" component={HistoryPost} />
//   </>
// )}
