import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
require('prismjs/themes/prism.css')
import { render } from 'react-dom'
import Ionicon from 'react-ionicons'

const Wrapper = styled.section`
  grid-area: Social;
  margin: 0;
`
const SocialIcon = styled(Link)`
  display: inline-block;
  padding: 0 2rem;
  &:last-child {
    padding-right: 0;
  }
  svg {
    transition: all 0.2s;
    fill: ${props => props.theme.colors.tertiary};
    &:hover {
      fill: ${props => props.theme.colors.highlight};
    }
  }
`

const Container = props => {
  return (
    <Wrapper>
      <SocialIcon to="https://instagram.com/iammatthias/">
        <Ionicon className="icon" fontSize="35px" icon="logo-instagram" />
      </SocialIcon>
      <SocialIcon to="https://twitter.com/iamMatthias">
        <Ionicon className="icon" fontSize="35px" icon="logo-twitter" />
      </SocialIcon>
      <SocialIcon to="https://www.linkedin.com/in/iammatthias/">
        <Ionicon className="icon" fontSize="35px" icon="logo-linkedin" />
      </SocialIcon>
      <SocialIcon to="https://www.facebook.com/iammatthias">
        <Ionicon className="icon" fontSize="35px" icon="logo-facebook" />
      </SocialIcon>
    </Wrapper>
  )
}

export default Container
