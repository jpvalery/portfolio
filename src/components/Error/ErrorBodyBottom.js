import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.section`
  margin: 0 auto;
  max-width: 100rem;
  display: grid;
  justify-items: center;
  align-items: start;
  justify-content: center;
  align-content: start;
  grid-gap: 0;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: max-content;
  @media screen and (min-width: ${props => props.theme.responsive.large}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: ${props => props.theme.responsive.medium}) and (max-width: 100rem) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ErrorBodyBottom = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default ErrorBodyBottom
