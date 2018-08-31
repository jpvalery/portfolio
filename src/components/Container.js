import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
