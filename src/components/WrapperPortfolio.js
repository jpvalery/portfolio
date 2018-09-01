import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    width: 50%;
    height: 100vh;
    float: right;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const WrapperPortfolio = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default WrapperPortfolio
