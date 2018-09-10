import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 2rem;
    grid-template-areas: 'InfoLeft InfoRight';
    padding: 0 2rem 2rem;
    align-items: center;
  }
`

const WrapperInfo = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default WrapperInfo
