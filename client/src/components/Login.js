import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignIn } from "../redux/actions/authActions";

const Login = () => {
  const error = useSelector((state) => state.session.error);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Login </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let email = e.target[`email`].value;
          let password = e.target[`password`].value;

          dispatch(SignIn({ email, password }));
        }}
      >
        <div className="form-group">
          <input className="form-control" name="email" placeholder="email" />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="password"
          />
        </div>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <button className="btn btn-primary" type="submit">
          login
        </button>
      </form>
    </>
  );
};

export default Login;
