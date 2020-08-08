import Document, { Html, Main, Head, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity=""></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity=""></script>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
