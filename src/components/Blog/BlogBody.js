import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  grid-area: Right;
  margin: 3.5rem 0;
  padding: 2rem;
  display: grid;
  grid-template-rows: repeat(auto);
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin: 7rem 0 0;
    height: 100%;
    min-height: 0;
  }
`

const BlogBody = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default BlogBody
