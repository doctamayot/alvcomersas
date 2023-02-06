import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initalProps = await Document.getInitialProps(ctx);

    return initalProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;700&family=Rubik+Dirt&display=swap"
            rel="stylesheet"
          />

          <meta
            name="description"
            content="Productos militares, acero inoxidable, tienda militar"
          />
          <meta property="og:title" content="Productos en acero inoxidable" />
          <meta
            property="og:description"
            content="Productos militares, acero inoxidable, tienda militar"
          />
          <meta property="og:URL" content="https://alvcomer.com.co/" />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
