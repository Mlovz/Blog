import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import AuthSms from "../components/auth/AuthSms";
import { RootStore } from "../utils/TypeScript";

const Login = () => {
  const [sms, setSms] = useState(false);
  const { auth } = useSelector((state: RootStore) => state);
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  return (
    <div className="auth__page">
      <div className="auth__box">
        <h3 className="text-center mb-4">Login</h3>

        {sms ? <AuthSms /> : <AuthForm />}

        <div className="row my-2 text-primary">
          <Link to="/forgot_password" className="col-6">
            Forgot password?
          </Link>
          <span
            className="col-6 text-end"
            style={{ cursor: "pointer" }}
            onClick={() => setSms(!sms)}
          >
            {sms ? "Sign in with password" : "Sign in with SMS"}
          </span>
        </div>

        <p>
          You have dont an account?{" "}
          <Link className="text-danger" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
