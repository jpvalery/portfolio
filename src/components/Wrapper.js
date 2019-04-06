import React from 'react'
import styled from 'react-emotion'

const Wrapper = styled.section`
  margin: 0 auto;
  padding: 0;
          animation: fadein 3s;
          animation-timing-function: cubic-bezier(.25,.1,.25,1) ;
          @keyframes fadein { from { opacity: 0; }  to  { opacity: 1; }}
`

const WrapperGallery = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default WrapperGallery
