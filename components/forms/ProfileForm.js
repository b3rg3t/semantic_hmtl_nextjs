import { useState } from "react";

const ProfileForm = props => {
  const [user, setUser] = useState(props.user);
  //   const userInfo = ...user;
  return (
    <>
      {user && (
        <form className="form__profile">
        <h3>Edit profile</h3>
          <label>
            First name:
            <input type="text" value={user.first_name} onChange={() => setUser()} placeholder="John.."/>
          </label>
          <label>
            Last name:
            <input type="text" value={user.last_name} onChange={() => setUser()} placeholder="Doe.."/>
          </label>    
          <label>
            Location:
            <input type="text" value={user.profile ? user.profile.location : ""} onChange={() => setUser()} placeholder="ex. Stockholm"/>
          </label>
          <label>
            Email:
            <input type="email" value={user.email} onChange={() => setUser()} placeholder="JohnDoe@mail.com"/>
          </label>
          <label>
            Description:
            <textarea rows="10" cols="28" value={user.profile ? user.profile.description : ""} onChange={() => setUser()} placeholder="Write a descripton.."/>
          </label>
          <button className="">Edit profile</button>
        </form>
      )}
    </>
  );
};

export default ProfileForm;

//
