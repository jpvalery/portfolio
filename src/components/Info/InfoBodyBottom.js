import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  grid-area: InfoBodyBottom;
  margin: 0;
  padding: 0;
  height: 100%;
  grid-template-rows: repeat(auto);
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
