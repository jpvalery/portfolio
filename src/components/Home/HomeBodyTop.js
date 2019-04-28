import React from 'react'
import styled from 'react-emotion'

const Wrapper = styled.section`
  background-color: transparent;
  grid-area: HomeBodyTop;
  margin: 6rem 0px 1rem 0px;
  padding-left:2rem; padding-right:2rem;
  display: grid;
  grid-template-rows: repeat(auto);
    animation: fadeuptop 3.5s;
    animation-timing-function: cubic-bezier(.25,.1,.25,1) ;
    @keyframes fadeuptop { from { opacity: 0; transform: translateY(4rem);} to { opacity: 1; transform: translateY(0) }}
@media screen and (min-width: ${props => props.theme.responsive.medium}) {padding: 2rem;}
`
const Body = styled.div`
  margin: 0;
  padding: 0;
  background-clip: text; -webkit-background-clip: text;
  background-size: cover;
  background-image:url("sunset-bg.jpg");
  h1 {
    @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    font-size: 4rem;
    margin-bottom: 2rem;}
  }
  h1,
  h2,
  h3 {
    color: transparent !important;
    font-weight: 600;
    line-height: 1.25;
    text-transform: capitalize;
  }
  p {
    line-height: 1.6;
    @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    font-size: 2rem;
    margin-bottom: 0.5rem;}
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
