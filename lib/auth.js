import {BASE_URL} from "../paths/url"

const axios = require("axios");



export const Register = async (username, password, email) => {
  console.log("Register");
  let response;
  console.log(username, password, email)
  try {
    const {
      data
    } = await axios.post(`${BASE_URL}auth/users/`, {
      password: password,
      username: username,
      email: email
    });
    response = await data;
    console.log(response)
  } catch (error) {
    console.log(error);
  }
};
