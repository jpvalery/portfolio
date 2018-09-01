import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import WrapperPortfolio from '../components/WrapperPortfolio'
import Portfolio from '../components/Portfolio'
import PortfolioHero from '../components/PortfolioHero'
import SEO from '../components/SEO'

const Index = ({ data }) => {
  const galleries = data.allContentfulGallery.edges

  return (
    <Layout>
      <SEO />
      <PortfolioHero />
      <WrapperPortfolio>
        {galleries.map(({ node: gallery }) => (
          <Portfolio
            key={gallery.id}
            slug={gallery.slug}
            image={gallery.heroImage}
            title={gallery.title}
            date={gallery.publishDate}
            excerpt={gallery.body}
          />
        ))}
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
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          body {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 80)
            }
          }
        }
      }
    }
  }
`

export default Index
