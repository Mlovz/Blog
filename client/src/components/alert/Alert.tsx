import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import Loading from "../global/Loading";
import Toast from "./Toast";

const Alert = () => {
  const { alert } = useSelector((state: RootStore) => state);

  return (
    <>
      {alert.error && <Toast bg="#fa5757" body={alert.error} />}
      {alert.loading && <Loading />}
    </>
  );
};

export default Alert;
