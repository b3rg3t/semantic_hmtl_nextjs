import Header from "../headerFolder/Header";
import Footer from "../footerFolder/Footer";
import Head from "next/head";
import "../../index.scss";
import "../layoutFolder/layout.scss";

const Layout = ({ children, title, token }) => (
  <div className="wrapper">
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Lilita+One&display=swap"
        rel="stylesheet"
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta
        name="description"
        content="This is the best Cat site ever, use this if you love cats. Ask questions about cats."
      />

      <meta
        itemProp="description"
        content="This is the best Cat site ever, use this if you love cats. Ask questions about cats."
      />

      <meta
        name="og:description"
        content="This is the best Cat site ever, use this if you love cats. Ask questions about cats."
      />
    </Head>
    <Header token={token} />
    {children}
    <Footer />
    <style jsx>{`
      .wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        height: 100vh;
      }
    `}</style>
  </div>
);

export default Layout;
