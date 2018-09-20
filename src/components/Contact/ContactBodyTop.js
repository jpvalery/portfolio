import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  grid-area: ContactBodyTop;
  margin: 0;
  padding: 0;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin: 3.5rem 0 0;
  }
`
const Body = styled.div`
  margin: 2rem;
  h1,
  h2,
  h3 {
    font-weight: 800;
    line-height: 1.25;
    text-transform: none;
    margin: 0 0 1rem 0;
  }

  p {
    line-height: 1.6;
    margin: 0 0 1rem 0;
  }

  a {
    transition: 0.2s;
    color: ${props => props.theme.colors.tertiary};
    font-weight: 700;
    font-style: italic;
    text-decoration: none;
    text-shadow: 1px 1px 0 ${props => props.theme.colors.base},
      -1px 1px 0 ${props => props.theme.colors.base},
      2px 0 0 ${props => props.theme.colors.base},
      -2px 0 0 ${props => props.theme.colors.base};
    box-shadow: inset 0 -1px 0 0 ${props => props.theme.colors.base},
      inset 0 -2px 0 0 ${props => props.theme.colors.tertiary};
    &:hover {
      color: ${props => props.theme.colors.highlight};
      box-shadow: inset 0 -1px 0 0 ${props => props.theme.colors.base},
        inset 0 -2px 0 0 ${props => props.theme.colors.highlight};
    }
  }

  del {
    text-decoration: line-through;
  }
  strong {
    font-weight: 800;
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

const ContactBodyTop = props => {
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

export default ContactBodyTop
