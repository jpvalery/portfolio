import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import WrapperGrid from '../components/WrapperGrid'
import PortfolioHero from '../components/Portfolio/PortfolioHero'
import PortfolioBody from '../components/Portfolio/PortfolioBody'
import PortfolioBodyTop from '../components/Portfolio/PortfolioBodyTop'
import PortfolioBodyBottom from '../components/Portfolio/PortfolioBodyBottom'
import PortfolioLink from '../components/Portfolio/PortfolioLink'

import SEO from '../components/SEO'

const Index = ({ data }) => {
  const galleries = data.allContentfulGallery.edges
  const home = data.contentfulHome

  return (
    <Layout>
      <SEO />
      <WrapperGrid>
        <PortfolioHero image={home.heroImage} />
        <PortfolioBody>
          <PortfolioBodyTop body={home.body} />
          <PortfolioBodyBottom>
            {galleries.map(({ node: gallery }) => (
              <PortfolioLink
                key={gallery.id}
                slug={gallery.slug}
                image={gallery.heroImage}
                title={gallery.title}
                date={gallery.publishDate}
                excerpt={gallery.body}
              />
            ))}
          </PortfolioBodyBottom>
        </PortfolioBody>
      </WrapperGrid>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulGallery(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          heroImage {
            title
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          body {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 140)
            }
          }
        }
      }
    }
    contentfulHome {
      title
      id
      heroImage {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp
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

export default Index
