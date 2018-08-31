import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
require('prismjs/themes/prism.css')

const Wrapper = styled.div`
  grid-area: right;
  display: flex;
  flex-direction: column;
  margin: 4rem 4rem 2rem 2rem;
  a {
    background: ${props => props.theme.colors.base};
    color: white;
    padding: 1em;
    border-radius: 2px;
    text-decoration: none;
    transition: 0.2s;
    &:hover {
      background: ${props => props.theme.colors.highlight};
    }
  }
`

const Body = styled.div`
  margin: 0;
  h1,
  h2,
  h3 {
    font-weight: 600;
    line-height: 1.25;
    text-transform: capitalize;
  }

  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.25em;
  }
  h3 {
    font-size: 1em;
  }

  p {
    line-height: 1.6;
    margin: 0 0 2em 0;
  }

  a {
    transition: 0.2s;
    color: ${props => props.theme.colors.base};
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
  }

  del {
    text-decoration: line-through;
  }
  strong {
    font-weight: 600;
  }
  em {
    font-style: italic;
  }

  ul,
  ol {
    margin: 0 0 2em 0;
  }

  ul {
    li {
      list-style: disc;
      list-style-position: inside;
      line-height: 1.25;
      &:last-child {
        margin: 0;
      }
    }
  }

  ol {
    li {
      list-style: decimal;
      list-style-position: inside;
      line-height: 1.25;
      &:last-child {
        margin: 0;
      }
    }
  }

  hr {
    border-style: solid;
    border-color: ${props => props.theme.colors.secondary};
    margin: 0 0 2em 0;
  }

  blockquote {
    font-style: italic;
    border-left: 4px solid ${props => props.theme.colors.secondary};
    padding: 0 0 0 0.5em;
  }

  pre {
    margin: 0 0 2em 0;
    border-radius: 2px;
    background: ${props => props.theme.colors.secondary} !important;
    span {
      background: inherit !important;
    }
  }
`
const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  a {
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.base};
    padding: 1em;
    border-radius: 2px;
    text-decoration: none;
    transition: 0.2s;
    &:hover {
      background: ${props => props.theme.colors.highlight};
    }
  }
`
const PreviousLink = styled(Link)`
  margin-right: 1rem;
  order: 1;
`

const NextLink = styled(Link)`
  margin-left: 1rem;
  order: 2;
`

const PageBody = props => {
  return (
    <Wrapper>
      <Body
        dangerouslySetInnerHTML={{
          __html: props.body.childMarkdownRemark.html,
        }}
      />
      <LinkWrapper>
        {props.previous && (
          <PreviousLink to={`/blog/${props.previous.slug}/`}>
            Prev Post
          </PreviousLink>
        )}
        {props.next && (
          <NextLink to={`/blog/${props.next.slug}/`}>Next Post</NextLink>
        )}
      </LinkWrapper>
    </Wrapper>
  )
}

export default PageBody
