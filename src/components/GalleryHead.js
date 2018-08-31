import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.section`
  position: sticky;
  z-index: 2;
  background: ${props => props.theme.colors.base};
  top: 0rem;
  margin: 0 auto;
  padding: 1rem 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`
const BackButton = styled(Link)`
  position: fixed;
  top: 3.5rem;
  left: 2rem;
  text-decoration: none;
`

const Container = props => {
  return (
    <Wrapper>
      <BackButton to="/">⬅ Back</BackButton>
      {props.children}
    </Wrapper>
  )
}

export default Container
