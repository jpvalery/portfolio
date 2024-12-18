import 'tailwindcss/tailwind.css'

import Head from 'next/head'

import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo-config'

import Footer from '../components/Footer'
import Header from '../components/Header'

import menus from '../content/menu.json'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />

      <Header menus={menus} />
      <div className="mx-auto max-w-4xl py-12">
        <Component {...pageProps} />
      </div>
      <Footer displaySocial socialSelection="Photography" />
    </div>
  )
}

export default MyApp
