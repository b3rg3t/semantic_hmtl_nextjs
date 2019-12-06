import { useState } from "react";
import Link from "next/link";
import { Register } from "../../lib/auth";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const onSubmit = event => {
    event.preventDefault();
    Register(username, password, email);
  };
  const isDisabled = password.length && password2.length && email.length && username.length > 0;
  const isInvalid = password !== password2;
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
            minlength="8"
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
            minlength="8"
            required
          />
        </label>
        {isInvalid && password2.length > 0 ? <div className="loginform__error"><p>Passwords is not matching</p></div> : null}
        <span>
          Already a user,{" "}
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </span>
        <div className="errorDiv"></div>
        <button disabled={!isDisabled}>Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
