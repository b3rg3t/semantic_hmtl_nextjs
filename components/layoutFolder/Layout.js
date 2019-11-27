import Header from "../headerFolder/Header";
import Footer from "../footerFolder/Footer";
import "../layoutFolder/layout.scss";
import Headtags from "../Headtags";
import Head from "next/head";

const Layout = ({ children, title }) => (
  <div className="wrapper">
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Headtags />
    <Header />
    <h1>{title}</h1>
    {children}
    <Footer />
  </div>
);

export default Layout;
