import React from 'react'
import { graphql } from 'gatsby'
import find from 'lodash/find'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'
import PostHead from '../components/Post/PostHead'
import PostHero from '../components/Post/PostHero'
import PostArticle from '../components/Post/PostArticle'
import SEO from '../components/SEO'

const PostTemplate = ({ data, location }) => {
  const {
    title,
    slug,
    id,
    heroImage,
    body,
    publishDate,
    tags,
  } = data.contentfulPost
  const postNode = data.contentfulPost

  const postIndex = find(
    data.allContentfulPost.edges,
    ({ node: post }) => post.id === id
  )
  return (
    <Layout location={location}>
      <Helmet>
        <title>{`${config.siteTitle} - ${title}`}</title>
      </Helmet>
      <SEO pagePath={slug} postNode={postNode} postSEO />
      <PostHead
        title={title}
        date={publishDate}
        tags={tags}
        time={body.childMarkdownRemark.timeToRead}
      />
      <Wrapper>
        <PostHero image={heroImage} />
        <PostArticle
          body={body}
          previous={postIndex.previous}
          next={postIndex.next}
        />
      </Wrapper>
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
      publishDate(formatString: "D MMMM YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
      }
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
