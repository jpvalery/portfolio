import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import WrapperGallery from '../components/Gallery/WrapperGallery'
import GalleryHead from '../components/Gallery/GalleryHead'
import SEO from '../components/SEO'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Lightbox from 'react-images'

const GalleryTemplate = ({ data }) => {
  const { title, slug, tags, images } = data.contentfulGallery
  const galleryNode = data.contentfulGallery
  const { width } = images
  console.log(images)

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pagePath={slug} galleryNode={galleryNode} gallerySEO />
      <GalleryHead title={title} tags={tags} />
      <WrapperGallery>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="1rem">
            {images &&
              images.map((images, index) => (
                <Img
                  key={index}
                  sizes={images.fluid}
                  alt={images.title}
                  title={images.title}
                />
              ))}
          </Masonry>
        </ResponsiveMasonry>
        <Lightbox
          images={images}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevLightboxImage}
          onClickNext={this.gotoNextLightboxImage}
          onClose={this.closeLightbox}
        />
      </WrapperGallery>
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
          ...GatsbyContentfulFluid_tracedSVG
        }
        ogimg: resize(width: 1800) {
          src
          width
          height
        }
      }

      images {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_tracedSVG
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
export default GalleryTemplate
