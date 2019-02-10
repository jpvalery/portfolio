import React from 'react'
import styled from 'react-emotion'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const ProjectLink = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 2rem;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    transition: all 0.5s;
    display: inline-block;
    &:hover div {
      @supports (object-fit: cover) {
        opacity: 1;
        visibility: visible;
      }
    }
    &:hover h1 {
      color: var(--color-highlight) !important;
    }
  }
`
const Cover = styled.div`
  div {
    height: 100% !important;
    width: 100%;
    object-fit: cover !important;
    display: block;
  }
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    position: fixed !important;
    pointer-events: none;
    transition: opacity 0.8s, visibility 0.3s;
    width: calc(50% - 3rem);
    height: calc(100vh - 5.5rem);
    top: 4rem;
    right: 2rem;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    div {
      height: 100% !important;
      object-fit: cover !important;
    }
  }
`
const Title = styled.h2`
  text-transform: uppercase;
  margin: 0;
  padding: 1rem 1rem 0;
  &:hover{
    color: var(--color-highlight) !important;
  }
  -webkit-animation: fadeup 3.5s; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: fadeup 3.5s; /* Firefox < 16 */
      -ms-animation: fadeup 3.5s; /* Internet Explorer */
       -o-animation: fadeup 3.5s; /* Opera < 12.1 */
          animation: fadeup 3.5s;

@keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Firefox < 16 */
@-moz-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Internet Explorer */
@-ms-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}

  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 0;
    z-index: 3;
  }
`

const Year = styled.h3`
  text-transform: uppercase;
  font-size: 1rem;
  margin-left: 0.6rem;
  margin-bottom: 0.2rem !important;
  padding: 0.1rem;
  z-index: 3;
  color: #d8d8c7;
  -webkit-animation: fadeup 3.5s; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: fadeup 3.5s; /* Firefox < 16 */
      -ms-animation: fadeup 3.5s; /* Internet Explorer */
       -o-animation: fadeup 3.5s; /* Opera < 12.1 */
          animation: fadeup 3.5s;

@keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Firefox < 16 */
@-moz-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Internet Explorer */
@-ms-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}

`

const List = styled.ul`
  display: contents;
  position: relative;
  -webkit-animation: fadeup 3.5s; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: fadeup 3.5s; /* Firefox < 16 */
      -ms-animation: fadeup 3.5s; /* Internet Explorer */
       -o-animation: fadeup 3.5s; /* Opera < 12.1 */
          animation: fadeup 3.5s;

@keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Firefox < 16 */
@-moz-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Internet Explorer */
@-ms-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}

`

const Tag = styled.li`
  display: inline-block;
  margin: 0 0.25rem;
    text-transform: uppercase;
    text-decoration: none;
    color: #d8d8c7;
`

const Excerpt = styled.p`
  margin-bottom: 0;
  font-weight: normal;
  text-transform: none;
  padding: 1rem 1rem 0;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 0;
  }
  -webkit-animation: fadeup 3.5s; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: fadeup 3.5s; /* Firefox < 16 */
      -ms-animation: fadeup 3.5s; /* Internet Explorer */
       -o-animation: fadeup 3.5s; /* Opera < 12.1 */
          animation: fadeup 3.5s;

@keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Firefox < 16 */
@-moz-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Internet Explorer */
@-ms-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}

`
const HomeContent = props => {
  return (
    <ProjectLink key={props.id} to={`/${props.slug}/`}>
      <Cover>
        <Img fluid={props.image.fluid} />
      </Cover>
      <Title>{props.title}</Title>
      <Year>{props.year} &nbsp;- <List>{props.tags.map(tag => (
          <Tag key={tag.id}>
            {tag.title}
          </Tag>
        ))}
      </List></Year>
      <Excerpt
        dangerouslySetInnerHTML={{
          __html: props.excerpt.childMarkdownRemark.excerpt,
        }}
      />
    </ProjectLink>
  )
}

export default HomeContent
