import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 0 auto;
  padding: 2rem 0;
    @media screen and (min-width: ${props => props.theme.responsive.medium}) {
  padding: 2rem;
)
`

const WrapperArticle = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default WrapperArticle
