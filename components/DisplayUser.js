export const DisplayUser = props => (
  <>
    {props.user && (
      <>
        <div className="header">
          <h1>{props.user.username}</h1>
        </div>
        <div className="flex-container">
          <div className="columns">
            <div>
              <p>First name:</p>
            </div>
            <div>
              <p>{props.user.first_name}</p>
            </div>
          </div>
          <div className="columns">
            <div>
              <p>Last name:</p>
            </div>
            <div>
              <p>{props.user.last_name}</p>
            </div>
          </div>
          <div className="columns">
            <div>
              <p>Email:</p>
            </div>
            <div>
              <p>{props.user.email}</p>
            </div>
          </div>
          {props.user.profile ? (
            <div className="columns">
              <div>
                <p>Location:</p>
              </div>
              <div>
                <p>{props.user.profile.location}</p>
              </div>
            </div>
          ) : null}
          {props.user.profile ? (
            <div className="columns description">
              <>
                <p>Description:</p>
                <div>
                  <p>{props.user.profile.description}</p>
                </div>
              </>
            </div>
          ) : null}
          {props.user ? (
            <div className="columns">
              <div>
                <p>Created:</p>
              </div>
              <div>
                <p>{props.user.date_joined.substring(0, 10)}</p>
              </div>
            </div>
          ) : null}
        </div>
      </>
    )}
  </>
);
