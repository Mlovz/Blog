import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IUserAvatar, RootStore } from "../../utils/TypeScript";
import Avatar from "../global/Avatar";
import Form from "../global/Form";
import Input from "../global/Input";
import Title from "../global/Title";
import Button from "../global/Button";
import GlobalButton from "../global/GlobalButton";
import {
  resetPassword,
  updateUserProfile,
} from "../../redux/actions/profileAction";
import { checkImage } from "../../utils/validImage";
import { ALERT } from "../../redux/types/alertType";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const UserInfo = () => {
  const { auth } = useSelector((state: RootStore) => state);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name field is required")
      .min(4, "Minimum name length 4 characters."),
    // password: yup.string().min(6, "Minimum password length 6 characters."),
    // cf_password: yup
    //   .string()
    //   .min(6, "Minimum cf_password length 6 characters."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    defaultValues: {
      name: auth.user?.name,
      account: auth.user?.account,
      password: "",
      cf_password: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { dirtyFields } = useFormState({ control });

  const [avatar, setAvatar] = useState<File>();
  const dispatch = useDispatch();
  const handleChangeAvatar = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const check = checkImage(file);
      console.log(check);

      if (check) return dispatch({ type: ALERT, payload: { error: check } });
      setAvatar(file);
    }
  };

  const updateProfile = (data: any) => {
    if (avatar || dirtyFields.name) {
      dispatch(updateUserProfile(data, avatar as File, auth));
    }
    if (data.password && data.cf_password && auth.token) {
      dispatch(resetPassword(data, auth.token));
    }
  };

  return (
    <>
      {auth.user && (
        <Form onSubmit={handleSubmit(updateProfile)}>
          <div className="form-group user__info__avatar">
            <div className="user__info__avatar__img">
              <Avatar
                src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                size="super__avatar"
              />
            </div>
            <div className="user__info__avatar__btn">
              <i className="fal fa-plus-circle"></i>
              <input type="file" name="avatar" onChange={handleChangeAvatar} />
              <Title
                component="span"
                fz={16}
                fw={500}
                color="#fff"
                margin=" 0 0 0 0"
              >
                Upload new photo
              </Title>
            </div>
          </div>
          <div className="form-group">
            <Title
              component="label"
              color="#5F5F6E"
              htmlFor="name"
              fz={14}
              fw={500}
            >
              Name
            </Title>
            <Input
              {...register("name")}
              type="text"
              defaultValue={auth.user.name}
              id="name"
              name="name"
            />
            <small>{errors?.name?.message}</small>
          </div>
          <div className="form-group">
            <Title
              component="label"
              color="#5F5F6E"
              htmlFor="name"
              fz={14}
              fw={500}
            >
              Account
            </Title>
            <Input
              {...register("account")}
              type="text"
              defaultValue={auth.user.account}
              id="account"
              name="account"
            />
          </div>
          <div className="form-group">
            <Title
              component="label"
              color="#5F5F6E"
              htmlFor="name"
              fz={14}
              fw={500}
            >
              Password
            </Title>
            <Input
              {...register("password")}
              type="password"
              id="password"
              name="password"
            />
            <small>{errors?.password?.message}</small>
          </div>
          <div className="form-group">
            <Title
              component="label"
              htmlFor="name"
              color="#5F5F6E"
              fz={14}
              fw={500}
            >
              Confirm password
            </Title>
            <Input
              {...register("cf_password")}
              type="password"
              id="cf_password"
              name="cf_password"
            />
            <small>{errors?.cf_password?.message}</small>
          </div>
          <div>
            <GlobalButton
              w="137px"
              h="50px"
              border="2px solid #4447E2"
              bg="transparent"
              margin="40px 0 0 0"
              disabled={
                !dirtyFields.name &&
                !avatar &&
                !dirtyFields.password &&
                !dirtyFields.cf_password
              }
            >
              Save Changes
            </GlobalButton>
          </div>
        </Form>
      )}
    </>
  );
};

export default UserInfo;
