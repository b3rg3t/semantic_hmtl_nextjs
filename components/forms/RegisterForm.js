import { useState } from "react";
import Link from "next/link";
import { Register } from "../../lib/auth";
import Loading from "../Loading";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    Register(username, password, email, updateLoading);
  };
  const isInvalid = password !== password2;
  const isDisabled =
    password.length &&
    password2.length &&
    email.length &&
    username.length > 0 &&
    !isInvalid;
  const updateLoading = (booleanCallback, errorMessage) => {
    setLoading(booleanCallback);
    if (errorMessage) {
      setError("Error " + errorMessage);
    }
  };
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
          Email:
          <input
            type="email"
            onChange={event => setEmail(event.target.value)}
            value={email}
            placeholder="Email"
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
        <label>
          Retype Password:
          <input
            type="password"
            onChange={event => setPassword2(event.target.value)}
            value={password2}
            placeholder="Password"
            minLength="8"
            required
          />
        </label>
        {isInvalid ? (
          <div className="loginform__error">
            <p>Passwords is not matching</p>
          </div>
        ) : null}
        <span>
          Already a user,{" "}
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </span>
        <div className="loginform__error">{error && <p>{error}</p>}</div>
        <Loading loading={loading} />
        <button disabled={!isDisabled}>Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
