import React from 'react'
import styled from 'react-emotion'
import Ionicon from 'react-ionicons'

const Wrapper = styled.section`
  margin: 1rem auto 0;
  text-align: center;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin: 0;
  }
`
const SocialIcon = styled.div`
  display: inline-block;
  padding: 0 0.5rem;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`

const Social = props => {
  return (
    <Wrapper>
      <SocialIcon>
        <a href="https:/unsplash.com/jpvalery" alt="unsplash" target="_blank">
          <Ionicon className="icon" fontSize="32px" icon="md-camera" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://instagram.com/jpvalery/" alt="instagram" target="_blank">
          <Ionicon className="icon" fontSize="32px" icon="logo-instagram" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://www.facebook.com/jpvalery" alt="facebook" target="_blank">
          <Ionicon className="icon" fontSize="32px" icon="logo-facebook" />
        </a>
      </SocialIcon>
    </Wrapper>
  )
}

export default Social
