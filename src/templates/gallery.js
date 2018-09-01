import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import GalleryContainer from '../components/GalleryContainer'
import GalleryHead from '../components/GalleryHead'
import GalleryTitle from '../components/GalleryTitle'
import TagList from '../components/TagList'
import SEO from '../components/SEO'
import sizeMe from 'react-sizeme'
import StackGrid from 'react-stack-grid'
import PageTransition from 'gatsby-plugin-page-transitions'

const GalleryTemplate = ({ data }) => {
  const { title, slug, tags, images } = data.contentfulGallery
  const galleryNode = data.contentfulGallery
  const { width } = images

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pagePath={slug} galleryNode={galleryNode} gallerySEO />
      <PageTransition>
        <GalleryHead>
          <GalleryTitle>{title}</GalleryTitle>
          {tags && <TagList tags={tags} />}
        </GalleryHead>
        <GalleryContainer>
          <StackGrid
            columnWidth={width <= 768 ? '100%' : '33.333%'}
            gutterWidth={32}
            gutterHeight={32}
            duration={0}
          >
            {images &&
              images.map((images, index) => (
                <Img
                  key={index}
                  sizes={images.fluid}
                  alt={images.title}
                  title={images.title}
                />
              ))}
          </StackGrid>
        </GalleryContainer>
      </PageTransition>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulGallery(slug: { eq: $slug }) {
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
        }
      }
      images {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
    }
    allContentfulGallery(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`
export default sizeMe()(GalleryTemplate)
