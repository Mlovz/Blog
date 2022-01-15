import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Title from "../components/global/Title";
import OtherInfo from "../components/profile/OtherInfo";
import UserBlogs from "../components/profile/UserBlogs";
import UserInfo from "../components/profile/UserInfo";
import { IParams } from "../utils/TypeScript";
import { RootStore } from "../utils/TypeScript";

const Profile = () => {
  const { id }: IParams = useParams();
  const { auth } = useSelector((state: RootStore) => state);

  return (
    <div className="profile">
      <Title component="h1" fz={26} fw={500} color="#fff" margin=" 0 0 35px 0">
        Profile
      </Title>
      <div className="row">
        <div className="col-4">
          {auth.user?._id === id ? <UserInfo /> : <OtherInfo id={id} />}
        </div>
        <div className="col-8">
          <UserBlogs id={id} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
