import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOtherInfo } from "../../redux/actions/profileAction";
import { IUser, RootStore } from "../../utils/TypeScript";
import Avatar from "../global/Avatar";
import Title from "../global/Title";

interface IProps {
  id: string;
}

const OtherInfo: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch();
  const { otherInfo } = useSelector((state: RootStore) => state);
  const [other, setOther] = useState<IUser>();

  useEffect(() => {
    if (!id) return;
    if (otherInfo.every((item) => item._id !== id)) {
      dispatch(getOtherInfo(id));
    } else {
      const newUser = otherInfo.find((user) => user._id === id);
      if (newUser) setOther(newUser);
    }
  }, [id, otherInfo, dispatch]);

  return (
    <>
      {other && (
        <div className="form-group user__info__avatar">
          <div className="user__info__avatar__img">
            <Avatar src={other.avatar} size="super__avatar" />
          </div>
          <div className="user__info__desc">
            {other.role === "admin" && (
              <Title component="h1" fz={20} fw={500}>
                Admin
              </Title>
            )}
            <Title component="span" fz={16} fw={500}>
              {`Name: ${other.name}`}
            </Title>
            <Title component="span" fz={16} fw={500}>
              {`Email: ${other.account}`}
            </Title>
          </div>
        </div>
      )}
    </>
  );
};

export default OtherInfo;
