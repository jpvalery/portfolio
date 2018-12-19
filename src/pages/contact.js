import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import WrapperGrid from '../components/WrapperGrid'
import ContactHero from '../components/Contact/ContactHero'
import ContactBody from '../components/Contact/ContactBody'
import ContactBodyTop from '../components/Contact/ContactBodyTop'
import ContactBodyBottom from '../components/Contact/ContactBodyBottom'
import ContactForm from '../components/Contact/ContactForm'
import SEO from '../components/SEO'

const Contact = ({ data, location }) => {
  const postNode = {
    title: `Contact - ${config.siteTitle}`,
  }
  const info = data.contentfulAbout
  const contactNode = data.contentfulAbout
  return (
    <Layout location={location}>
      <Helmet>
        <title>{`${config.siteTitle} - Contact`}</title>
      </Helmet>
      <SEO postNode={contactNode} pagePath="contact" customTitle pageSEO />
      <WrapperGrid>
        <ContactHero image={info.heroImage} />
        <ContactBody>
          <ContactBodyTop body={info.body} />
          <ContactBodyBottom>
            <ContactForm />
          </ContactBodyBottom>
        </ContactBody>
      </WrapperGrid>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulAbout {
      title
      id
      heroImage {
        title
        fluid(maxWidth: 1000) {
          ...GatsbyContentfulFluid_withWebp
        }
        ogimg: resize(width: 900) {
          src
          width
          height
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default Contact
