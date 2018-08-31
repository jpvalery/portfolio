import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 0 auto;
  padding: 3rem 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
