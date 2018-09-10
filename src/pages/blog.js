import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import WrapperBlog from '../components/Blog/WrapperBlog'
import BlogHero from '../components/Blog/BlogHero'
import BlogBody from '../components/Blog/BlogBody'
import BlogList from '../components/Blog/BlogList'
import SEO from '../components/SEO'

const Blog = ({ data }) => {
  const posts = data.allContentfulPost.edges
  const blog = data.contentfulBlog

  return (
    <Layout>
      <SEO />
      <WrapperBlog>
        <BlogHero image={blog.heroImage} />
        <BlogBody>
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
        </BlogBody>
      </WrapperBlog>
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
              ...GatsbyContentfulFluid_noBase64
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
    contentfulBlog {
      title
      id
      heroImage {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_noBase64
        }
      }
    }
  }
`

export default Blog
