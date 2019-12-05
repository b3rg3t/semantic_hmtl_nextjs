import { useState } from "react";
import Link from "next/link";
import { LogIn } from "../../lib/auth";

const LogInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    LogIn(username, password)
  };
  const isDisabled = password.length &&  username.length > 0;
  return (
    <>
      <form onSubmit={onSubmit} className="loginform">
        <label>
          Username:
          <input
            type="text"
            onChange={event => setUsername(event.target.value)}
            value={username}
            placeholder="Username"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={event => setPassword(event.target.value)}
            value={password}
            placeholder="Password"
            required
          />
        </label>
        <span>
          Not a user? {" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </span>
        <button disabled={!isDisabled}>Log in</button>
      </form>
    </>
  );
};

export default LogInForm;
