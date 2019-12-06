import { BASE_URL } from "../paths/url";
import { useEffect } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import nextCookie from 'next-cookies'

const axios = require("axios");

export const Register = async (username, password, email) => {
  let response;
  try {
    const res = await axios.post(`${BASE_URL}auth/users/`, {
      password: password,
      username: username,
      email: email
    });
    response = await res;
    console.log(response);
    if (res.status === 201) {
      Router.push("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

export const LogIn = async (username, password) => {
  let response;
  try {
    const res = await axios.post(`${BASE_URL}auth/jwt/create/`, {
      username: username,
      password: password
    });
    response = await res;
    if (response.status === 200) {
      Cookies.set("token", `${response.data.access}`);
      Router.push("/");
    }
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const LogOut = () => {
  Cookies.remove("token", { path: "/" });
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
};

export const auth = ctx => {
  const { token } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!token) {
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
        console.log("logged out from storage!");
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
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx, token));
    return { ...componentProps, token };
  };

  return Wrapper;
};
