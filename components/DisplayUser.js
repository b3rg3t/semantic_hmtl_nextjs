export const DisplayUser = props => (
  <>
    {props.user && (
      <>
        <div className="header">
          <h1>{props.user.username}</h1>
        </div>
        <div className="flex-container">
        <div className="img">
            <img src="../images/cat1.jpg" alt="profile pix"/>
        </div>
          <div className="columns fname">
            <div>
              <p>First name:</p>
            </div>
            <div>
              <p>{props.user.first_name}</p>
            </div>
          </div>
          <div className="columns lname">
            <div>
              <p>Last name:</p>
            </div>
            <div>
              <p>{props.user.last_name}</p>
            </div>
          </div>
          <div className="columns email">
            <div>
              <p>Email:</p>
            </div>
            <div>
              <p>{props.user.email}</p>
            </div>
          </div>
          {props.user.profile ? (
            <div className="columns location">
              <div>
                <p>Location:</p>
              </div>
              <div>
                <p>{props.user.profile.location}</p>
              </div>
            </div>
          ) : null}
          
            <div className="columns description">
              <>
                <p>Description:</p>
                <div>
                {props.user.profile ? (
                  <p>{props.user.profile.description}</p>
                  ) : null}
                </div>
              </>
            </div>
          
          {props.user ? (
            <div className="columns date">
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
