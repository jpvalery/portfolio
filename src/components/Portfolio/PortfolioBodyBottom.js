import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  grid-area: PortfolioBodyBottom;
  margin: 0;
  padding: 0;
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
