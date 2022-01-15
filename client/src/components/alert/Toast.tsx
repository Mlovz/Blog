import { motion } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import { ALERT } from "../../redux/types/alertType";

interface IToast {
  bg: string;
  body: string | string[];
}

const Toast = ({ bg, body }: IToast) => {
  const dispatch = useDispatch();

  const removeAlert = () => {
    dispatch({ type: ALERT, payload: {} });
  };

  return (
    <motion.div
      initial={{ y: "0px" }}
      animate={{ y: "-60px" }}
      exit={{ y: "0px" }}
      className={`toast show position-fixed align-items-center`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        bottom: "10%",
        left: "41%",
        zIndex: 999,
        background: bg,
      }}
    >
      <div className="d-flex">
        <div className="toast-body text-light">
          {typeof body === "string" ? (
            body
          ) : (
            <ul>
              {body.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={removeAlert}
          style={{ color: "#fff" }}
          type="button"
          className="btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </motion.div>
  );
};

export default Toast;
