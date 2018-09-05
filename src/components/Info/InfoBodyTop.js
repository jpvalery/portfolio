import React from 'react'
import styled from 'styled-components'
require('prismjs/themes/prism.css')
import Social from '../../components/Social'

const Wrapper = styled.section`
  grid-area: InfoBodyTop;
  margin: 0;
  padding: 0;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin: 3.5rem 0 0;
  }
`
const Body = styled.div`
  margin: 0;
  padding: 2rem;
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
    &:last-child {
      margin: 0;
    }
  }

  a {
    transition: 0.2s;
    color: ${props => props.theme.colors.tertiary};
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

const InfoBodyTop = props => {
  return (
    <Wrapper>
      <Body
        dangerouslySetInnerHTML={{
          __html: props.body.childMarkdownRemark.html,
        }}
      />
    </Wrapper>
  )
}

export default InfoBodyTop
