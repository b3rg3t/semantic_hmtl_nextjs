import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => (
  <Layout title="Register">
    <Head>
    <title>Register</title> 
    </Head>
    <main>
    <h1 style={{textAlign: "center"}}>Sign up</h1>
      <section className="login">
      <RegisterForm />
      </section>
    </main>
  </Layout>
);

export default Register;