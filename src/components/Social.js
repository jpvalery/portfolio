import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
require('prismjs/themes/prism.css')
import { render } from 'react-dom'
import Ionicon from 'react-ionicons'

const Wrapper = styled.section`
  margin: 0 auto 0;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin: 0 2rem;
  }
`
const SocialIcon = styled(Link)`
  display: inline-block;
  padding: 0 1rem;
  &:first-child {
    padding-left: 0;
  }
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
