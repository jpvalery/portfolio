import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 0 auto;
  padding: 2rem;
`

const WrapperArticle = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default WrapperArticle
