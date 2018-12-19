import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import WrapperGallery from '../components/Gallery/WrapperGallery'
import GalleryHead from '../components/Gallery/GalleryHead'
import GalleryComposition from '../components/Gallery/GalleryComposition'
import SEO from '../components/SEO'

const GalleryTemplate = ({ data, location }) => {
  const gallery = data.contentfulExtendedGallery
  const galleryNode = data.contentfulExtendedGallery
  const subGalleries = data.contentfulExtendedGallery.galleries
  return (
    <Layout location={location}>
      <Helmet>
        <title>{`${config.siteTitle} - ${gallery.title} `}</title>
      </Helmet>
      <SEO pagePath={gallery.slug} postNode={galleryNode} gallerySEO />
      <GalleryHead title={gallery.title} tags={gallery.tags} />
      <WrapperGallery>
        {subGalleries.map((subGallery, index) => (
          <div key={index}>
            {subGallery.__typename === 'ContentfulSubGallery' && (
              <GalleryComposition
                key={subGallery.id}
                title={subGallery.title}
                images={subGallery.images}
              />
            )}
          </div>
        ))}
      </WrapperGallery>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulExtendedGallery(slug: { eq: $slug }) {
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
        }
      }
      galleries {
        __typename
        ... on ContentfulSubGallery {
          id
          title
          images {
            title
            fluid(maxWidth: 1800, quality: 90) {
              ...GatsbyContentfulFluid_withWebp
              src
            }
          }
        }
      }
    }
  }
`
export default GalleryTemplate
