import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import WrapperGrid from '../components/WrapperGrid'
import Hero from '../components/Hero'
import ContactBody from '../components/Contact/ContactBody'
import ContactBodyTop from '../components/Contact/ContactBodyTop'
import ContactBodyBottom from '../components/Contact/ContactBodyBottom'
import { ReactTypeformEmbed } from 'react-typeform-embed';
import SEO from '../components/SEO'

const Contact = ({ data, location }) => {
  const info = data.contentfulAbout
  return (
    <Layout location={location}>
      <Helmet>
        <title>{`${config.siteTitle} - Contact`}</title>
      </Helmet>
      <SEO postNode={info} pagePath="contact" customTitle pageSEO />
      <WrapperGrid>
        <Hero image={info.heroImage} />
        <ContactBody>
          <ContactBodyTop body={info.body} />
          <ContactBodyBottom>
            <ReactTypeformEmbed url="https://jpvalery.typeform.com/to/y96C4A" hideHeaders="true" hideFooter="true" opacity="0" style="{{ position: `fixed` }}" />
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
