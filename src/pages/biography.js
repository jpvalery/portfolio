import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import WrapperGrid from '../components/WrapperGrid'
import Hero from '../components/Hero'
import BiographyBody from '../components/Biography/BiographyBody'
import BiographyBodyTop from '../components/Biography/BiographyBodyTop'
import BiographyBodyBottom from '../components/Biography/BiographyBodyBottom'

import SEO from '../components/SEO'

const Bio = ({ data, location }) => {
  const biography = data.contentfulBiography
  return (
    <Layout location={location}>
    <SEO />
      <WrapperGrid>
        <Hero image={biography.heroImage} />
        <BiographyBody>
          <BiographyBodyTop body={biography.body} />
        </BiographyBody>
      </WrapperGrid>
    </Layout>
  )
}

export const query = graphql`
  query Bio {
    contentfulBiography {
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

export default Bio
