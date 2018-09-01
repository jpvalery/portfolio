import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import Container from '../components/Container'
import SEO from '../components/SEO'

const Blog = ({ data }) => {
  const posts = data.allContentfulPost.edges

  return (
    <Layout>
      <SEO />
      <Container>
        {posts.map(({ node: post }) => (
          <BlogList
            key={post.id}
            slug={post.slug}
            image={post.heroImage}
            title={post.title}
            date={post.publishDate}
            excerpt={post.body}
          />
        ))}
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulPost(
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

export default Blog
