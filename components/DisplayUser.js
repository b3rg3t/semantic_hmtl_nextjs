import { DeleteUser } from "../components/DeleteUser";
import ProfileForm from "../components/forms/ProfileForm";
import { useState } from "react";
import { BASE_URL } from "../paths/url";
export const DisplayUser = props => {
  const [firstName, setFirstName] = useState(props.user.first_name);
  const [lastName, setLastName] = useState(props.user.last_name);
  const [location, setLocation] = useState(
    props.user.profile ? props.user.profile.location : ""
  );
  const [email, setEmail] = useState(props.user.email);
  const [description, setDescription] = useState(
    props.user.profile ? props.user.profile.description : ""
  );

  const axios = require("axios");

  const updateProfile = async () => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${props.token}`
    };
    let response;
    try {
      const postProfile = await axios.get(`${BASE_URL}auth/users/me/`, {
        headers: headers
      });
      response = await postProfile;
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setLocation(response.data.profile.location);
        setEmail(response.data.email);
        setDescription(response.data.profile.description);
      } else {
        console.log("Something went wrong" + response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {props.user && (
        <>
          <div className="header">
            <div className="header__left">
              <h1>{props.user.username}</h1>
            </div>
            <div className="header__right">
              <ProfileForm
                user={props.user}
                token={props.token}
                updateProfile={updateProfile}
              />
              <DeleteUser user={props.user} token={props.token} />
            </div>
          </div>
          <div className="flex-container">
            <div className="img">
              <img src="../images/cat1.jpg" alt="profile pix" />
            </div>
            <div className="columns fname">
              <div>
                <p>First name:</p>
              </div>
              <div>
                <p>{firstName}</p>
              </div>
            </div>
            <div className="columns lname">
              <div>
                <p>Last name:</p>
              </div>
              <div>
                <p>{lastName}</p>
              </div>
            </div>
            <div className="columns email">
              <div>
                <p>Email:</p>
              </div>
              <div>
                <p>{email}</p>
              </div>
            </div>

            <div className="columns location">
              <div>
                <p>Location:</p>
              </div>
              <div>
                <p>{location}</p>
              </div>
            </div>

            <div className="columns description">
              <>
                <p>Description:</p>
                <div>
                  <p>{description}</p>
                </div>
              </>
            </div>

            {props.user ? (
              <div className="columns date">
                <p>Created: </p>
                <p>{props.user.date_joined.substring(0, 10)}</p>
              </div>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};
