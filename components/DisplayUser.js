export const DisplayUser = props => (
  <>
    {props.user && (
      <div>
        <p>Username: {props.user.username}</p>
        <p>Email: {props.user.email}</p>
        {props.user.profile && <p>{props.user.profile.description}</p>}
      </div>
    )}
  </>
);
