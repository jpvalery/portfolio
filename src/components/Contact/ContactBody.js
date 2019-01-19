import React from 'react'
import styled from 'react-emotion'

const Wrapper = styled.section`
  grid-area: Left;
  margin: 0;
  padding: 0;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto);
  grid-gap: 0;
  grid-template-areas: 'ContactBodyTop' 'ContactBodyBottom';
`

const ContactBody = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default ContactBody
