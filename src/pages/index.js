import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import WrapperGrid from '../components/WrapperGrid'
import PortfolioHero from '../components/Portfolio/PortfolioHero'
import PortfolioBody from '../components/Portfolio/PortfolioBody'
import PortfolioBodyTop from '../components/Portfolio/PortfolioBodyTop'
import PortfolioBodyBottom from '../components/Portfolio/PortfolioBodyBottom'
import PortfolioList from '../components/Portfolio/PortfolioList'

import SEO from '../components/SEO'

const Index = ({ data, location }) => {
  const home = data.contentfulHome
  const galleries = data.allContentfulGallery.edges
  return (
    <Layout location={location}>
      <SEO />
      <WrapperGrid>
        <PortfolioHero image={home.heroImage} />
        <PortfolioBody>
          <PortfolioBodyTop body={home.body} />
          <PortfolioBodyBottom>
            {galleries.map(({ node: gallery }) => (
              <PortfolioList
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
  query Index {
    allContentfulGallery(
      limit: 1000
      sort: { fields: [publishDate], order: ASC }
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "DD MMM YYYY")
          heroImage {
            title
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          body {
            childMarkdownRemark {
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
        fluid(maxWidth: 1000) {
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
