import React from 'react'
import styled from 'react-emotion'

const Wrapper = styled.section`
  grid-area: Right;
  margin: 0;
  padding: 0;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto);
  grid-gap: 0;
  grid-template-areas: 'HomeBodyTop' 'HomeBodyBottom';
`

const HomeBody = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default HomeBody
