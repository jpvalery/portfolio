import React from 'react'
import { graphql } from 'gatsby'
import sortBy from 'lodash/sortBy'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import WrapperTag from '../components/Tag/WrapperTag'
import TagList from '../components/Tag/TagList'
import TagTitle from '../components/Tag/TagTitle'

const TagTemplate = ({ data }) => {
  const { title, slug } = data.contentfulTag

  const posts = sortBy(data.contentfulTag.post, 'publishDate').reverse()
  const galleries = sortBy(data.contentfulTag.gallery, 'publishDate').reverse()

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
              slug={`/blog/${post.slug}/`}
              image={post.heroImage}
              title={post.title}
              date={post.publishDate}
            />
          ))}
          {galleries.map(gallery => (
            <TagList
              key={gallery.id}
              slug={gallery.slug}
              image={gallery.heroImage}
              title={gallery.title}
              date={gallery.publishDate}
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
      gallery {
        id
        title
        slug
        publishDate(formatString: "MMMM DD, YYYY")
      }
      post {
        id
        title
        slug
        publishDate(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

export default TagTemplate
