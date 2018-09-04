import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  grid-area: HomeRight;
  margin: 7.25rem 0 0;
  padding: 0;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-gap: 0;
  grid-template-areas: 'PortfolioBodyTop' 'PortfolioBodyBottom' 'Social';
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
