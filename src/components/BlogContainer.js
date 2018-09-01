import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  margin: 4rem;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin: 4rem 4rem 2rem 2rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 2rem;
    grid-template-areas: 'left right';
  }
`

const BlogContainer = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default BlogContainer
