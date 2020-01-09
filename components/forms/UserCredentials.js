import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Loading from "../Loading";
import { BASE_URL } from "../../paths/url";

const axios = require("axios");

const UserCredentials = props => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    let response;
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}auth/jwt/create/`, {
        username: username,
        password: password
      });
      response = await res;
      if (response.status === 200) {
        console.log(response.data);
        props.onSubmitCallback(e, username, password);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        console.log(error.response);
        let errorMessage = (
          <>
            <p>Wrong Username or Password</p>
            {/* <p>{`${error.response.statusText}`}</p>
          <p>{`${error.response.data.detail}`}</p> */}
          </>
        );
        updateIsLoggingIn(false, errorMessage);
      } else {
        updateIsLoggingIn(false, error.response.data.detail);
      }
    }
  };
  const updateIsLoggingIn = (booleanCallback, errorMessage) => {
    setError(errorMessage);
    setLoading(booleanCallback);
  };
  return (
    <>
      <div className="form">
        <form className="form__profile" onSubmit={onSubmit}>
          <button
            type="button"
            onClick={props.showCredentialCallback}
            className="x-button close-profile-form"
            type="button"
          >
            <FaTimes />
          </button>
          <h3>Input user credentials</h3>
          <label>
            <input
              aria-label="Username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </label>
          <label>
            <input
              aria-label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
          <div className="loginform__div">
            {loading ? <Loading loading={loading} /> : error}
          </div>
          <div>
            <button type="submit" className="profile-form-submit">
              Submit
            </button>
            <button
              type="button"
              className="profile-form-submit"
              onClick={props.showCredentialCallback}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserCredentials;
