import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Home from '../components/Home'
import Container from '../components/Container'
import SEO from '../components/SEO'
import PageTransition from 'gatsby-plugin-page-transitions'

const Index = ({ data }) => {
  const galleries = data.allContentfulGallery.edges

  return (
    <Layout>
      <SEO />
      <PageTransition>
        <Container>
          {galleries.map(({ node: gallery }) => (
            <Home
              key={gallery.id}
              slug={gallery.slug}
              image={gallery.heroImage}
              title={gallery.title}
              date={gallery.publishDate}
              excerpt={gallery.body}
            />
          ))}
        </Container>
      </PageTransition>
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
