import React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'

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

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>404 - Page Not Found</title>
      <meta name="description" content="Page not found" />
    </Helmet>

    <Box>
      <Title>Oops. Error 404.</Title>
      <Text>It's not you, it's me. Sorry but that link is broken<br />Where next? See <a href="https://jpvalery.photo">my portfolio</a> or <a href="http://jpvalery.photo/contact">get in touch</a>?</Text>
    </Box>
  </Layout>
)

export default NotFoundPage
