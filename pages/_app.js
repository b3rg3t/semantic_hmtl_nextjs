import React from "react";
import App from "next/app";
import cookies from "next-cookies";

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    const allCookies = cookies(appProps);
    console.log(allCookies)
    return { ...appProps, token: cookies(appContext).token || "" };
  }

  render() {
    const { Component, pageProps, token } = this.props;
    return <Component {...pageProps} token={token} />;
  }
}

export default MyApp;
