import 'tailwindcss/tailwind.css'

import Head from 'next/head'

import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo-config'

import { Footer, Header, MainBody } from '@jpvalery/mistral'

import menus from '../content/menu.json'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <Header menus={menus} />
      <MainBody>
        <Component {...pageProps} />
      </MainBody>
      <Footer displaySocial socialSelection="Photography" />
    </div>
  )
}

export default MyApp
