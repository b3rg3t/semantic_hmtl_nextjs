import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";
import LogInForm from "../components/forms/LogInForm";
import { useRouter } from 'next/router'

const LogIn = (props) => (
  <Layout title="Log in" token={props.token}>
    <Head>
    <title>Log in</title> 
    </Head>
    <main>
      <section>
        <LogInForm />
      </section>
    </main>
  </Layout>
);

export default LogIn;
