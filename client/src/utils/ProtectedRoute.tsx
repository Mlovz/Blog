import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const firstLogin = localStorage.getItem("logged");

  return firstLogin ? <Route {...props} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
