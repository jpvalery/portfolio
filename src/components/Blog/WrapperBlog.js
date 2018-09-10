import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 2rem;
    grid-template-areas: 'BlogLeft BlogRight';
    margin-top: 3.5rem;
    padding: 0 2rem 2rem;
    align-items: center;
  }
`

const WrapperBlog = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default WrapperBlog
