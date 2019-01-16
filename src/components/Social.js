import React from 'react'
import styled from 'react-emotion'
import Ionicon from 'react-ionicons'

const Wrapper = styled.section`
  margin: 1rem auto 0;
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
        <a href="https:/unsplash.com/jpvalery" alt="unsplash">
          <Ionicon className="icon" fontSize="24px" icon="md-camera" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://instagram.com/jpvalery/" alt="instagram">
          <Ionicon className="icon" fontSize="24px" icon="logo-instagram" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://www.facebook.com/jpvalery" alt="facebook">
          <Ionicon className="icon" fontSize="24px" icon="logo-facebook" />
        </a>
      </SocialIcon>
    </Wrapper>
  )
}

export default Social
