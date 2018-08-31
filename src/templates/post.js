import React from 'react'
import { graphql } from 'gatsby'
import find from 'lodash/find'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import BlogHero from '../components/BlogHero'
import BlogContainer from '../components/BlogContainer'
import BlogPost from '../components/BlogPost'
import SEO from '../components/SEO'

const PostTemplate = ({ data }) => {
  const {
    title,
    slug,
    id,
    heroImage,
    body,
    publishDate,
    tags,
    timeToRead,
  } = data.contentfulPost
  const postNode = data.contentfulPost

  const postIndex = find(
    data.allContentfulPost.edges,
    ({ node: post }) => post.id === id
  )

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pagePath={slug} postNode={postNode} postSEO />
      {tags && (
        <BlogHero
          title={title}
          date={publishDate}
          image={heroImage}
          tags={tags}
          time={body.childMarkdownRemark.timeToRead}
          height={'50vh'}
        />
      )}

      <BlogContainer>
        <BlogPost
          body={body}
          previous={postIndex.previous}
          next={postIndex.next}
        />
      </BlogContainer>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      id
      slug
      metaDescription {
        internal {
          content
        }
      }
      publishDate(formatString: "MMMM DD, YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
      }
      heroImage {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
        ogimg: resize(width: 1800) {
          src
          width
          height
        }
      }
      body {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
          timeToRead
        }
      }
    }
    allContentfulPost(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          id
        }
        previous {
          slug
        }
        next {
          slug
        }
      }
    }
  }
`

export default PostTemplate
