import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 2rem;
  grid-template-areas: 'left right';
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
