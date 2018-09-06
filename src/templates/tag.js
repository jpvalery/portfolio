import React from 'react'
import { graphql } from 'gatsby'
import sortBy from 'lodash/sortBy'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import WrapperTag from '../components/Tag/WrapperTag'
import TagHero from '../components/Tag/TagHero'
import TagList from '../components/Tag/TagList'
import TagTitle from '../components/Tag/TagTitle'

const TagTemplate = ({ data }) => {
  const { title, slug } = data.contentfulTag

  const posts = sortBy(data.contentfulTag.post, 'publishDate').reverse()

  return (
    <Layout>
      <Helmet>
        <title>{`Tag: ${title} - ${config.siteTitle}`}</title>
        <meta
          property="og:title"
          content={`Tag: ${title} - ${config.siteTitle}`}
        />
        <meta property="og:url" content={`${config.siteUrl}/tag/${slug}/`} />
      </Helmet>
      <TagHero />

      <WrapperTag>
        <TagTitle small>
          Tag: &ldquo;
          {title}
          &rdquo;
        </TagTitle>
        <>
          {posts.map(post => (
            <TagList
              key={post.id}
              slug={post.slug}
              image={post.heroImage}
              title={post.title}
              date={post.publishDate}
              excerpt={post.body}
            />
          ))}
        </>
      </WrapperTag>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulTag(slug: { eq: $slug }) {
      title
      id
      slug
      post {
        id
        title
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
`

export default TagTemplate
