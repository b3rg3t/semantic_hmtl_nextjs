import Document, {Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
    }
    
    render() {
      return (
        <html lang="en">
          <Head>
          <meta name="theme-color" content="#2859a3"/>
          <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
          <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>

          <script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>
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