import { useState } from "react";
import { FaCog, FaTimes } from "react-icons/fa";
import { BASE_URL } from "../../paths/url";
import UserCredentials from "./UserCredentials";

const axios = require("axios");

const ProfileForm = props => {
  const [firstName, setFirstName] = useState(props.user.first_name);
  const [lastName, setLastName] = useState(props.user.last_name);
  const [location, setLocation] = useState(
    props.user.profile ? props.user.profile.location : ""
  );
  const [email, setEmail] = useState(props.user.email);
  const [description, setDescription] = useState(
    props.user.profile ? props.user.profile.description : ""
  );

  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showCredentialsForm, setShowCredentialFrom] = useState(false);
  const ShowForm = () => {
    showProfileForm ? setShowProfileForm(false) : setShowProfileForm(true);
  };
  const closeForm = event => {
    if (event.target.id === "close") {
      ShowForm();
    }
  };
  const onSubmit = async (e, username, password) => {
    e.preventDefault();
    let data = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      email: email,
      profile: {
        description: description,
        location: location
      }
    };
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${props.token}`
    };
    let response;
    try {
      const postProfile = await axios.patch(`${BASE_URL}auth/users/me/`, data, {
        headers: headers
      });
      response = await postProfile;
      console.log(response);
      if (response.status === 200) {
        console.log("success");
        props.updateProfile();
        showUserCredentials();
      } else {
        console.log("Something went wrong" + response.status);
      }
    } catch (error) {
      console.log(error);
    }
    ShowForm();
  };
  const showUserCredentials = () => {
    showCredentialsForm
      ? setShowCredentialFrom(false)
      : setShowCredentialFrom(true);
  };
  return (
    <>
      {showProfileForm && (
        <div id="close" className="form" onClick={closeForm}>
          <form className="form__profile">
            <button
              className="x-button close-profile-form"
              type="button"
              onClick={ShowForm}
            >
              <FaTimes />
            </button>
            <h3>Edit profile</h3>
            <label>
              First name:
              <input
                aria-label="First name"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="John.."
              />
            </label>
            <label>
              Last name:
              <input
                aria-label="Last name"
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Doe.."
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="ex. Stockholm"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="JohnDoe@mail.com"
              />
            </label>
            <label>
              Description:
              <textarea
                rows="10"
                cols="28"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Write a descripton.."
              />
            </label>
            <div className="form__profile__buttons">
              <button
                className="profile-form-submit"
                type="button"
                onClick={showUserCredentials}
              >
                Save
              </button>
              <button
                className="profile-form-submit"
                type="button"
                onClick={ShowForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <button
        onClick={ShowForm}
        className="settings-button"
        title="Edit profile"
      >
        <FaCog />
      </button>
      {showCredentialsForm ? (
        <UserCredentials
          onSubmitCallback={onSubmit}
          showCredentialCallback={showUserCredentials}
        />
      ) : null}
    </>
  );
};

export default ProfileForm;
