import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const UserCredentials = props => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    console.log("On submit");
    props.onSubmitCallback(password, username);
  };
  return (
    <>
      <div className="form">
        <form className="form__profile">
          <button className="x-button close-profile-form" type="button">
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
            />
          </label>
          <label>
            <input
              aria-label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
          </label>
          <button className="profile-form-submit" onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UserCredentials;
