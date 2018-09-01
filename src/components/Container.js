import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 1.7rem auto 0;
  padding: 2rem;
  width: 100%;
  height: 100vh;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
