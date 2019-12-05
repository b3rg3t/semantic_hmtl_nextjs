import { BASE_URL } from "../paths/url";
import Router from "next/router";
import Cookies from "js-cookie";

const axios = require("axios");

export const Register = async (username, password, email) => {
  console.log("Register");
  let response;
  console.log(username, password, email);
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
      console.log(response)
      Cookies.set("token", `${response.data.access}`);
      Router.push("/");
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const LogOut = () => {
  Cookies.remove("token", { path: "/" });
  Router.push("/login");
};
