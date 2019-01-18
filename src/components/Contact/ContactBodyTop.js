import React from 'react'
import styled from 'react-emotion'

const Wrapper = styled.section`
  grid-area: ContactBodyTop;
  margin: 0;
  padding: 0;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin: 6rem 0 2rem 0;
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
    font-weight: 700;
    font-style: italic;
    text-decoration: none;
    text-shadow: 1px 1px 0 var(--color-base), -1px 1px 0 $var(--color-base),
      2px 0 0 var(--color-base), -2px 0 0 var(--color-base);
    box-shadow: inset 0 -1px 0 0 var(--color-base),
      inset 0 -2px 0 0 var(--color-tertiary);
    &:hover {
      color: var(--color-highlight);
      box-shadow: inset 0 -1px 0 0 var(--color-base),
        inset 0 -2px 0 0 var(--color-highlight);
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
    border-color: var(--color-secondary);
    margin: 0 0 2em 0;
  }

  blockquote {
    font-style: italic;
    border-left: 4px solid var(--color-secondary);
    padding: 0 0 0 0.5em;
  }

  pre {
    margin: 0 0 2em 0;
    border-radius: 2px;
    background: var(--color-secondary) !important;
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
