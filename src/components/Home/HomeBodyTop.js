import React from 'react'
import styled from 'react-emotion'
import Social from '../../components/Social'

const Wrapper = styled.section`
  grid-area: HomeBodyTop;
  margin: 6rem 0 4rem 0;
  padding: 2rem;
  display: grid;
  grid-template-rows: repeat(auto);
`
const Body = styled.div`
  margin: 0;
  padding: 0;
  h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
  }
  h1,
  h2,
  h3 {
    color: var(--color-secondary);
    font-weight: 600;
    line-height: 1.25;
    text-transform: capitalize;
  }
  p {
    line-height: 1.6;
    font-size: 2rem;
  }

  a {
    transition: 0.2s;
    font-weight: 700;
    text-decoration: none !important;
    text-shadow: 1px 1px 0 var(--color-base), -1px 1px 0 $var(--color-base),
      2px 0 0 var(--color-base), -2px 0 0 var(--color-base);
    &:hover {
      color: var(--color-highlight);
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

const HomeBodyTop = props => {
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

export default HomeBodyTop
