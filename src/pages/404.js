import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import styled from '@emotion/styled'
import Helmet from 'react-helmet'
import ErrorBodyBottom from '../components/Error/ErrorBodyBottom'
import ErrorList from '../components/Error/ErrorList'

import SEO from '../components/SEO'

const Box = styled.div`
  margin: 0 auto;
  padding: 12em 1.5em 2em;
  text-align: center;
`

const Text = styled.p`
  text-align: center;
  line-height: 1.6;
  margin: 0 0 1em 0;
  font-size: 1.6rem;
`

const Title = styled.h1`
  font-size: 3em;
  text-transform: capitalize;
  font-weight: 600;
  margin: 0 0 3rem 0;
  line-height: 1.2;
  color: var(--color-secondary);
`

const Error = ({ data, location }) => {
  const galleries = data.allContentfulExtendedGallery.edges
  return (
    <Layout location={location}>
      <SEO />
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Box>
        <Title>Oops. Error 404.</Title>
        <Text>It's not you, it's me. Sorry but that link is broken<br />Where next? Browse the projects below or <a href="http://jpvalery.photo/contact">get in touch</a>?</Text>
      </Box>
      <ErrorBodyBottom>
        {galleries.map(({ node: gallery }) => (
          <ErrorList
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
      </ErrorBodyBottom>
    </Layout>
  )
}

export const query = graphql`
  query Error {
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
          displayHome
        }
      }
    }
  }
`

export default Error
