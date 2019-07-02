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
import SEO from '../components/SEO'
import styled from '@emotion/styled'

const Typeform = styled.a`
  text-decoration: none;
  margin: 0 2rem;
  padding: 1.2rem 2.4rem;
  font-size: 1.8rem;
  background-color: #278400;
    &:hover {
      color: #ECEFF4;
      background-color: #15A3A6;
    }
`

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
            <Typeform href="https://jpvalery.typeform.com/to/y96C4A" rel="noopener noreferrer" alt="Contact Form Button" target="_blank">Let's get started</Typeform>
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
