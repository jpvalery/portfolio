import React from 'react'
import styled from '@emotion/styled'
import { IconContext } from "react-icons";
import { IoMdCamera, IoLogoFacebook, IoLogoInstagram } from 'react-icons/io'

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
        <a href="https://unsplash.com/jpvalery" rel="noopener" alt="unsplash" target="_blank">
          <IconContext.Provider value={{ size:"2.4em" }}><IoMdCamera /></IconContext.Provider>
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://instagram.com/jpvalery/" rel="noopener" alt="instagram" target="_blank">
          <IconContext.Provider value={{ size:"2.4em" }}><IoLogoInstagram /></IconContext.Provider>
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://www.facebook.com/jpvalery" rel="noopener" alt="facebook" target="_blank">
          <IconContext.Provider value={{ size:"2.4em" }}><IoLogoFacebook /></IconContext.Provider>
        </a>
      </SocialIcon>
    </Wrapper>
  )
}

export default Social
