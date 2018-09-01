import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HomeHero from '../components/HomeHero'
import Container from '../components/Container'
import SEO from '../components/SEO'

const Index = ({ data }) => {
  const galleries = data.allContentfulGallery.edges

  return (
    <Layout>
      <SEO />
      <Container>
        <HomeHero />
        <>
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
        </>
      </Container>
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
