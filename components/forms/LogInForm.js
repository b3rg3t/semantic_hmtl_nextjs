import { useState } from "react";
import Link from "next/link";

const LogInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    console.log("submit ran");
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
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
        </label>
        <span>
          Not a user? {" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </span>
        <button>Log in</button>
      </form>
    </>
  );
};

export default LogInForm;
