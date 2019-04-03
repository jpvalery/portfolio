import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import WrapperGrid from '../components/WrapperGrid'
import Hero from '../components/Hero'
import HomeBody from '../components/Home/HomeBody'
import HomeBodyTop from '../components/Home/HomeBodyTop'
import HomeBodyBottom from '../components/Home/HomeBodyBottom'
import HomeList from '../components/Home/HomeList'

import SEO from '../components/SEO'

const Index = ({ data, location }) => {
  const home = data.contentfulHome
  const galleries = data.allContentfulExtendedGallery.edges
  return (
    <Layout location={location}>
      <SEO />
      <WrapperGrid>
        <Hero image={home.heroImage} />
        <HomeBody>
          <HomeBodyTop body={home.body} />
          <HomeBodyBottom>
            {galleries.map(({ node: gallery }) => (
              <HomeList
                key={gallery.id}
                slug={gallery.slug}
                image={gallery.heroImage}
                title={gallery.title}
                year={gallery.year}
                tags={gallery.tags}
                date={gallery.publishDate}
                excerpt={gallery.body}
              />
            ))}
          </HomeBodyBottom>
        </HomeBody>
      </WrapperGrid>
    </Layout>
  )
}

export const query = graphql`
  query Index {
    allContentfulExtendedGallery(
      limit: 20
      sort: { fields: [publishDate], order: DESC }
      filter: {displayHome: {eq:true}}
    ) {
      edges {
        node {
          title
          id
          slug
          year
          tags {
            title
            id
            slug
          }
          publishDate(formatString: "DD MMM YYYY h:mm a")
          heroImage {
            title
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          body {
            childMarkdownRemark {
              excerpt(pruneLength: 140)
            }
          }
          displayHome
        }
      }
    }
    contentfulHome {
      title
      id
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
    }
  }
`

export default Index
