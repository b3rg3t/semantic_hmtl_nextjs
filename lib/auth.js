import { BASE_URL } from "../paths/url";
import React, { useEffect, useContext } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import nextCookie from "next-cookies";

const axios = require("axios");

export const Register = async (username, password, email, updateLoading) => {
  let response;
  try {
    updateLoading(true);
    const res = await axios.post(`${BASE_URL}auth/users/`, {
      password: password,
      username: username,
      email: email
    });
    response = await res;
    // console.log(response);
    if (response.status === 201) {
      Router.push("/login");
    }
  } catch (error) {
    // console.log(error.response.status);
    updateLoading(false, error.response.status);
  }
};
// const IsLoggedInContext = React.createContext(false);
// export const IsLoggedInProvider = props => {
//   return (
//     <IsLoggedInProvider.Provider>{props.children}</IsLoggedInProvider.Provider>
//   );
// };
// const [loggedIn, setLoggedIn] = useContext(IsLoggedInContext);
export const LogIn = async (username, password, updateIsLoggingIn) => {
  let response;
  try {
    updateIsLoggingIn(true);
    const res = await axios.post(`${BASE_URL}auth/jwt/create/`, {
      username: username,
      password: password
    });
    response = await res;
    // console.log(response)
    if (response.status === 200) {
      Cookies.set("token", `${response.data.access}`);
      // setLoggedIn(true)
      Router.push("/");
    }
  } catch (error) {
    // console.log(error);
    if (error.response.status === 401) {
      console.log(error.response);
      let errorMessage = (
        <>
        <p>Wrong Username or Password</p>
          <p>{`${error.response.statusText}`}</p>
          <p>{`${error.response.data.detail}`}</p>
        </>
      );
      updateIsLoggingIn(false, errorMessage);
    } else {
      updateIsLoggingIn(false, error.response.data.detail);
    }
  }
};

export const LogOut = () => {
  Cookies.remove("token", { path: "/" });
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
};

export const auth = async ctx => {
  const { token } = nextCookie(ctx);
  const tokenIsValid = await verifyToken(token);
  // If there's no token, it means the user is not logged in.
  if (!token || !tokenIsValid) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    } else {
      Router.push("/login");
    }
  }

  return token;
};
export const withAuthSync = WrappedComponent => {
  //if logout exist in local storage, log out users
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        // console.log("logged out from storage!");
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);
      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = await auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx, token));
    return { ...componentProps, token };
  };

  return Wrapper;
};

export const verifyToken = async ctx => {
  // console.log("verify");
  const token = ctx;
  let response;
  try {
    const res = await axios.post(`${BASE_URL}auth/jwt/verify/`, {
      token: token
    });
    response = await res;
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    // console.log(error);
    return false;
  }
};
