import 'tailwindcss/tailwind.css'

import Head from 'next/head'

import { DefaultSeo } from 'next-seo'

import SEO from '../next-seo-config'

import Footer from '../components/Footer'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <div className="mx-auto max-w-7xl px-6 pb-6">
        <Header />
        <div className="mx-auto max-w-7xl py-12">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default MyApp
