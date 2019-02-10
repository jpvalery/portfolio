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
  -webkit-animation: fadeup 2.5s; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: fadeup 2.5s; /* Firefox < 16 */
      -ms-animation: fadeup 2.5s; /* Internet Explorer */
       -o-animation: fadeup 2.5s; /* Opera < 12.1 */
          animation: fadeup 2.5s;

@keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Firefox < 16 */
@-moz-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}
/* Internet Explorer */
@-ms-keyframes fadeup { from { opacity: 0; transform: translateY(2rem);}  to  { opacity: 1; transform: translateY(0) }}

`

const ContactBody = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default ContactBody
