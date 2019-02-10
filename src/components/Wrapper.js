import React from 'react'
import styled from 'react-emotion'

const Wrapper = styled.section`
  margin: 0 auto;
  padding: 0;
  -webkit-animation: fadein 2.5s; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: fadein 2.5s; /* Firefox < 16 */
      -ms-animation: fadein 2.5s; /* Internet Explorer */
       -o-animation: fadein 2.5s; /* Opera < 12.1 */
          animation: fadein 2.5s;

@keyframes fadein { from { opacity: 0; }  to  { opacity: 1; }}
/* Firefox < 16 */
@-moz-keyframes fadein { from { opacity: 0; }  to  { opacity: 1; }}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein { from { opacity: 0; }  to  { opacity: 1; }}
/* Internet Explorer */
@-ms-keyframes fadein { from { opacity: 0; }  to  { opacity: 1; }}

`

const WrapperGallery = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default WrapperGallery
