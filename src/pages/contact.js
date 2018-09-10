import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import WrapperInfo from '../components/Info/WrapperInfo'
import InfoHero from '../components/Info/InfoHero'
import InfoBody from '../components/Info/InfoBody'
import InfoBodyTop from '../components/Info/InfoBodyTop'
import InfoBodyBottom from '../components/Info/InfoBodyBottom'
import ContactForm from '../components/Info/ContactForm'
import SEO from '../components/SEO'

const Contact = ({ data }) => {
  const postNode = {
    title: `Contact - ${config.siteTitle}`,
  }
  const info = data.contentfulAbout

  return (
    <Layout>
      <Helmet>
        <title>{`Contact - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postNode={postNode} pagePath="contact" customTitle />
      <WrapperInfo>
        <InfoHero image={info.heroImage} />
        <InfoBody>
          <InfoBodyTop body={info.body} />
          <InfoBodyBottom>
            <ContactForm />
          </InfoBodyBottom>
        </InfoBody>
      </WrapperInfo>
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
          ...GatsbyContentfulFluid_noBase64
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
