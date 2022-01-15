import React, { useState } from "react";
import Button from "../global/Button";
import Form from "../global/Form";
import Input from "../global/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authAction";

const AuthForm = () => {
  const [typePass, setTypePass] = useState(false);
  const schema = yup.object().shape({
    account: yup.string().required("Email or phone field is required"),
    password: yup
      .string()
      .required("Password field is required")
      .min(6, "Minimum password length 6 characters."),
  });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const loginSubmit = (data: any) => {
    dispatch(login(data));
  };

  return (
    <Form onSubmit={handleSubmit(loginSubmit)}>
      <div className="form-group">
        <label htmlFor="account" className="form-label">
          Email / Phone number
        </label>
        <Input
          {...register("account")}
          type="text"
          id="account"
          name="account"
        />
        <small>{errors?.account?.message}</small>
      </div>
      <div className="form-group mt-1">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="type__pass">
          <Input
            {...register("password")}
            type={typePass ? "text" : "password"}
            id="password"
            name="password"
          />
          <span onClick={() => setTypePass(!typePass)}>
            {typePass ? (
              <i className="fal fa-eye-slash"></i>
            ) : (
              <i className="fad fa-eye"></i>
            )}
          </span>
        </div>
        <small>{errors?.password?.message}</small>
      </div>
      <div className="form-group mt-4">
        <Button type="submit" fullwidth bg="dark" disabled={!isValid}>
          Login
        </Button>
      </div>
    </Form>
  );
};

export default AuthForm;
