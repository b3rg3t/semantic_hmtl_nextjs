import { BASE_URL } from "../paths/url";
import Router from "next/router";
import { useState } from "react";
import Loading from "./Loading";
import { LogOut } from "../lib/auth";
import {FaTimes} from "react-icons/fa"
const axios = require("axios");

export const DeleteUser = props => {
  const [password, setPassword] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const DeleteUserWithId = async event => {
    event.preventDefault();
    let res;
    const data = { current_password: password };
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${props.token}`
    };
    setLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL}auth/users/me/`, {
        headers: headers,
        data: data
      });
      res = await response;
      console.log(res);
      if (res.status === 204) {
        setLoading(false);
        LogOut()
        Router.push("/login");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    //current_password
  };
  const ShowDeleteForm = () => {
    showInput ? setShowInput(false) : setShowInput(true);
    setPassword("");
  };
  const isInvalid = password.length >= 8 && !loading;
  //
  const closing = event => {
    if (event.target.id === "close") {
      ShowDeleteForm();
    }
  };
  return (
    <div>
      {showInput && (
        <div id="close" className="delete__popup" onClick={closing}>
          <div className="delete__form">
            <button className="delete x" onClick={ShowDeleteForm}>
            <FaTimes />
            </button>
            <h4>Are you sure you want to delete your account?</h4>
            <form onSubmit={DeleteUserWithId}>
              <label>
                Password:
                <input
                  type="password"
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                  placeholder="Password"
                  minLength="8"
                />
              </label>
              <Loading loading={loading} />
              <div>
                <button
                  className="delete"
                  title="Delete"
                  onClick={DeleteUserWithId}
                  disabled={!isInvalid}
                >
                  Delete me
                </button>
                <button
                  className="cancel"
                  type="button"
                  onClick={ShowDeleteForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button className="delete" onClick={ShowDeleteForm}>
        Delete me
      </button>
    </div>
  );
};
