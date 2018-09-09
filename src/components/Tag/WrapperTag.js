import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  padding-top: 3.5rem;
  max-width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`

const WrapperBlog = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default WrapperBlog
