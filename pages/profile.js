import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";
import { withAuthSync } from "../lib/auth";
import { BASE_URL } from "../paths/url";
import { DeleteUser } from "../components/DeleteUser";
import { DisplayUser } from "../components/DisplayUser";
import ProfileForm from "../components/forms/ProfileForm";

const axios = require("axios");

const ProfilePage = props => (
  <Layout title="Profile" token={props.token}>
    <Head>
      <title>Profile</title>
    </Head>
    <main>
      <section className="profile">
        <div className="profile__div">
          <DisplayUser user={props.user} />
          <DeleteUser user={props.user} token={props.token} />
        </div>
        <div className="form">
          <ProfileForm user={props.user} />
        </div>
      </section>
    </main>
  </Layout>
);

ProfilePage.getInitialProps = async (ctx, token) => {
  let user;
  try {
    const { data } = await axios.get(`${BASE_URL}auth/users/me/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    user = await data;
    console.log(user);
  } catch (error) {
    // console.log(error);
  }
  return { user: user, token: token };
};
export default withAuthSync(ProfilePage);
