import React from 'react'
import styled from 'styled-components'

const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`

const CardList = props => {
  return <List>{props.children}</List>
}

export default CardList
