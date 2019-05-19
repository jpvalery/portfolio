import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.section`
  grid-area: Left;
  margin: 4rem 0;
  display: grid;
  grid-template-rows: repeat(auto);
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 2rem;
    margin: 7rem 0 0;
    height: 100%;
    min-height: 0;
  }
`

const BlogBody = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default BlogBody
