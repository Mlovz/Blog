import React, { useState } from "react";

const AuthSms = () => {
  const [phone, setPhone] = useState("");

  return (
    <form>
      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          Phone number
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="form-group mt-4">
        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={phone ? false : true}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default AuthSms;
