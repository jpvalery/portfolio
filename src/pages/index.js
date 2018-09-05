import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import WrapperPortfolio from '../components/Portfolio/WrapperPortfolio'
import PortfolioHero from '../components/Portfolio/PortfolioHero'
import PortfolioBody from '../components/Portfolio/PortfolioBody'
import PortfolioBodyTop from '../components/Portfolio/PortfolioBodyTop'
import PortfolioBodyBottom from '../components/Portfolio/PortfolioBodyBottom'
import PortfolioContent from '../components/Portfolio/PortfolioContent'

import SEO from '../components/SEO'

const Index = ({ data }) => {
  const galleries = data.allContentfulGallery.edges
  const home = data.contentfulHome

  return (
    <Layout>
      <SEO />
      <WrapperPortfolio>
        <PortfolioHero image={home.heroImage} />
        <PortfolioBody>
          <PortfolioBodyTop body={home.body} />
          <PortfolioBodyBottom>
            {galleries.map(({ node: gallery }) => (
              <PortfolioContent
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
      </WrapperPortfolio>
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
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_tracedSVG
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
          ...GatsbyContentfulFluid_tracedSVG
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
