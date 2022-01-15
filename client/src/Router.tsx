import React from "react";
import { Switch, Route } from "react-router-dom";
import Alert from "./components/alert/Alert";
import Navbar from "./components/Navbar/Navbar";
import AuthorizatedRoute from "./utils/AuthorizatedRoute";
import Category from "./routes/Category";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import CreateBlog from "./routes/CreateBlog";
import ProtectedRoute from "./utils/ProtectedRoute";
import CategoryDetail from "./routes/CategoryDetail";
import DetailBlog from "./routes/DetailBlog";

const LoginPage = React.lazy(() => import("./routes/Login"));
const RegisterPage = React.lazy(() => import("./routes/Register"));

function Router() {
  return (
    <div className="container">
      <Alert />
      <Navbar />
      <div
        style={{
          paddingTop: "70px",
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute path="/profile/:id" component={Profile} />
          <ProtectedRoute path="/category" component={Category} />
          <ProtectedRoute path="/create" component={CreateBlog} />
          <ProtectedRoute path="/blogs/:id" component={CategoryDetail} />
          <ProtectedRoute path="/blog/:id" component={DetailBlog} />
        </Switch>
      </div>
    </div>
  );
}

export default Router;
