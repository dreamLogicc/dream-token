import '../styles/globals.css'
import Navbar from '../components/navbar'
import Head from 'next/head'




function MyApp({ Component, pageProps }) {

  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/icon.png" />
      </Head>
      <Navbar/>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
