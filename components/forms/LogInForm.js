import { useState } from "react";
import Link from "next/link";
import { LogIn } from "../../lib/auth";
import Loading from "../Loading";

const LogInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    LogIn(username, password, updateIsLoggingIn);
  };
  const updateIsLoggingIn = (booleanCallback, errorMessage) => {
    console.log("this ran")
    setError(errorMessage);
    setLoading(booleanCallback)
  };
  const isDisabled = (password.length && username.length > 0) && !loading;

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
            minLength="8"
            required
          />
        </label>

        <span>
          Not a user?{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </span>

        <div className="loginform__error">
          {error && error}
        </div>
        <Loading loading={loading} />

        <button disabled={!isDisabled}>Log in</button>
      </form>
    </>
  );
};

export default LogInForm;
