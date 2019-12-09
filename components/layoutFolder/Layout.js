import Header from "../headerFolder/Header";
import Footer from "../footerFolder/Footer";
import "../layoutFolder/layout.scss";
import Head from "next/head";

const Layout = ({ children, title, token }) => (
  <div className="wrapper">
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
        rel="stylesheet"
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header token={token} />
    <h1>{title}</h1>
    {children}
    <Footer />
  </div>
);

export default Layout;
