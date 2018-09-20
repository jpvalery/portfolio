import React from 'react'
import styled, { css } from 'react-emotion'

const Wrapper = styled.section`
  margin: 0 auto;
  padding: 0;
`

const PageWrapper = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default PageWrapper
