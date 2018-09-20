import React from 'react'
import styled from 'react-emotion'

const Wrapper = styled.section`
  margin: 0 auto;
  padding: 2rem;
`

const WrapperGallery = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default WrapperGallery
