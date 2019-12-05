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
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            onChange={event => setEmail(event.target.value)}
            value={email}
            placeholder="Email"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={event => setPassword(event.target.value)}
            value={password}
            placeholder="Password"
          />
        </label>
        <label>
          Retype Password:
          <input
            type="password"
            onChange={event => setPassword2(event.target.value)}
            value={password2}
            placeholder="Password"
          />
        </label>
        {isInvalid && password2.length > 0 ? "Passwords is not matching" : null}
        <span>
          Already a user,{" "}
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </span>
        <div className="errorDiv"></div>
        <button>Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
