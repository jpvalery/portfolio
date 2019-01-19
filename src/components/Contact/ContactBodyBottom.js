import React from 'react'
import styled from 'react-emotion'

const Wrapper = styled.section`
  grid-area: ContactBodyBottom;
  margin: 0;
  padding: 0 0 2rem;
  height: 100%;
  grid-template-rows: repeat(auto);
`

const ContactBodyBottom = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default ContactBodyBottom
