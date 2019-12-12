import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";
import LogInForm from "../components/forms/LogInForm";

const LogIn = () => (
  <Layout title="Log in">
    <Head>
    <title>Log in</title> 
    </Head>
    <main>
      <section className="login">
        <LogInForm />
      </section>
    </main>
  </Layout>
);

export default LogIn;
