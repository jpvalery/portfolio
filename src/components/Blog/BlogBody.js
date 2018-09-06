import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  grid-area: BlogRight;
  margin: 2rem 0;
  padding: 2rem;
  display: grid;
  height: 100%;
`

const BlogBody = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default BlogBody
