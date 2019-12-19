import React from "react";
import App from "next/app";
import cookies from "next-cookies";
import nprogress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import { IconContext } from "react-icons/lib";

function handleRouteChangeStart() {
  nprogress.start();
}
function handleRouteChangeComplete() {
  nprogress.done();
}
function handleRouteChangeError() {
  nprogress.done();
}
Router.events.on("routeChangeStart", handleRouteChangeStart);
Router.events.on("routeChangeComplete", handleRouteChangeComplete);
Router.events.on("routeChangeError", handleRouteChangeError);

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //

  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`

    const token = cookies(appContext.ctx).token || "";

    const appProps = await App.getInitialProps(appContext, token);
    // if (appContext.Component.getInitialProps) {
    //   pageProps = await appContext.Component.getInitialProps(appContext, token);
    // }
    return { ...appProps, token: cookies(appContext.ctx).token || "" };
  }

  render() {
    const { Component, pageProps, token } = this.props;
    return (
      <IconContext.Provider value={{ className: "react-icons" }}>
        <Component {...pageProps} token={token} />
      </IconContext.Provider>
    );
  }
}

export default MyApp;
