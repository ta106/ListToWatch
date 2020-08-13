import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignIn } from "../redux/actions/authActions";
import Form from "./common/Form";

const Login = () => {
  const error = useSelector((state) => state.session.error);
  const dispatch = useDispatch();
  return (
    <Form
      name="Login"
      onsubmit={(e) => {
        e.preventDefault();
        let email = e.target[`email`].value;
        let password = e.target[`password`].value;

        dispatch(SignIn({ email, password }));
      }}
      inputs={[{ name: "email" }, { name: "password", type: "password" }]}
      error={error}
    />
  );
};

export default Login;
