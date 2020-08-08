import NProgress from '../components/next-progress';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NProgress />
      <Head >
        <title>Spotify Album</title>
        <meta name="Description" content="Spotify Album"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Keywords" content="spotify, album, music"></meta>
        <meta name="robots" content="index,follow" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/static/fonts/font-awesome-4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/util.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/main.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/album.css" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
