import React from 'react'
import styled from 'react-emotion'

const Wrapper = styled.section`
  grid-area: Left;
  margin: 0;
  margin-top: 16.5%;
  padding: 0;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto);
  grid-gap: 0;
  grid-template-areas: 'ContactBodyTop' 'ContactBodyBottom';
    animation: fadeup 3.5s;
    animation-timing-function: cubic-bezier(.25,.1,.25,1) ;
    @keyframes fadeup { from { opacity: 0; transform: translateY(2rem);} to { opacity: 1; transform: translateY(0) }}
`

const ContactBody = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default ContactBody
