import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding-top: 3.5rem;
    padding-right: 2rem;
    max-width: 50%;
    height: 100vh;
    float: right;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: top;
  }
`

const WrapperBlog = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default WrapperBlog
