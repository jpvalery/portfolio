import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  grid-area: BlogRight;
  margin: 3.25rem 0 0;
  padding: 0;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 0;
  grid-template-areas: 'BlogBody';
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin: 7.25rem 0 0;
  }
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
