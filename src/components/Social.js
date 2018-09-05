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
const SocialIcon = styled.div`
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

const Social = props => {
  return (
    <Wrapper>
      <SocialIcon>
        <a href="https://github.com/iammatthias/">
          <Ionicon className="icon" fontSize="35px" icon="logo-github" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://instagram.com/iammatthias/">
          <Ionicon className="icon" fontSize="35px" icon="logo-instagram" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://twitter.com/iamMatthias">
          <Ionicon className="icon" fontSize="35px" icon="logo-twitter" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://www.linkedin.com/in/iammatthias/">
          <Ionicon className="icon" fontSize="35px" icon="logo-linkedin" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://www.facebook.com/iammatthias">
          <Ionicon className="icon" fontSize="35px" icon="logo-facebook" />
        </a>
      </SocialIcon>
    </Wrapper>
  )
}

export default Social
