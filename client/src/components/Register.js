import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignUp } from "../redux/actions/authActions";
import Form from "./common/Form";
const Register = () => {
  const serror = useSelector((state) => state.session.serror);
  const dispatch = useDispatch();
  return (
    <Form
      name="Register"
      error={serror}
      onsubmit={async (e) => {
        e.preventDefault();
        console.log("submitted");
        let name = e.target[`name`].value;
        let email = e.target[`email`].value;
        let password = e.target[`password`].value;
        await dispatch(SignUp({ name, email, password }));
      }}
      inputs={[
        { name: "name" },
        { name: "email" },
        { name: "password", type: "password" },
      ]}
    />
  );
};

export default Register;
