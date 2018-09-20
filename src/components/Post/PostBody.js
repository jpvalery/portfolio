import React from 'react'
import styled, { css } from 'react-emotion'

const Wrapper = styled.section`
  margin: 0;
  padding: 0;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto);
  grid-gap: 0;
  grid-template-areas: 'ArticleLeft' 'ArticleRight';
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin: 0;
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(auto);
    grid-gap: 0;
    grid-template-areas: 'ArticleLeft ArticleRight';
  }
`

const InfoBody = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default InfoBody
