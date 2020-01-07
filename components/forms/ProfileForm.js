import { useState } from "react";

const ProfileForm = props => {
  const [user, setUser] = useState(props.user);
  const [firstName, setFirstName] = useState(props.user.first_name);
  const [lastName, setLastName] = useState(props.user.last_name);
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState(props.user.email);
  const [description, setDescription] = useState("props.user.profile.description")

  const [showProfileForm, setShowProfileForm] = useState(false);

  const ShowForm = () => {
    showProfileForm ? setShowProfileForm(false) : setShowProfileForm(true);
  };
  return (
    <>
      {showProfileForm && (
        <form className="form__profile">
          <h3>Edit profile</h3>
          <label>
            First name:
            <input
              aria-label="First name"
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="John..⚡"
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="JohnDoe@mail.com"
            />
          </label>
          <label>
            Description:
            <textarea
              rows="10"
              cols="28"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a descripton.."
            />
          </label>
          <button onClick={ShowForm}>Save profile</button>
        </form>
      )}
      <button onClick={ShowForm} className="submit-button">
        Edit profile
      </button>
    </>
  );
};

export default ProfileForm;