import Document, {Head, Main, NextScript} from 'next/document';


class MyDocument extends Document {
    static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
    }
  
    render() {
      return (
        <html lang="sv">
          <Head>
          <meta name="theme-color" content="#2859a3"/>

          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      )
    }
  }

  export default MyDocument;