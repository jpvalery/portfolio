import React from 'react'
import Img from "gatsby-image"
import styled from 'styled-components';

import * as palette from '../utils/styles';

import Form from '../components/Form';

const AboutPage = ({data}) => {
const {name,bio,portrait} = data.contentfulAbout;

const Wrapper = styled.div`
`
const Grid = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat( 2, minmax(25vw, 1fr) );
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const GridItem = styled.div`
  .gatsby-image-outer-wrapper, .gatsby-image-wrapper {
    position: static !important;
  }

`
const Card = styled.div`
    min-height: ${palette.HEIGHT };
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: left;
    justify-content: top;
    flex-direction: column;

`
const Cover = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
`
const Data = styled.div`
    padding: 1rem;
    z-index: 10;
    opacity: 1;
`
const CardContent = styled.div`
    padding: 1rem;
    position: relative;
`
const Name = styled.h1`
    text-transform: uppercase;
    font-size: 2rem;
`
const SayHi = styled.div`
    input, textarea {
    width: 25vw;
    padding: .25rem 0px .75rem;
    background: transparent;
    border: 0;
    border-bottom: .25rem solid ${palette.COLOR };
    outline: none;
    resize: none;
    overflow: auto;
    color: ${palette.COLOR };
    }
    button {
    width: 25vw;
    padding: 1rem 0px;
    background: transparent;
    outline: none;
    color: ${palette.COLOR };
    }
    .hidden {
      display: none;
    }
    .btn, .btn:link, .btn:visited {
      border: .25rem solid ${palette.COLOR };
      color: ${palette.COLOR };
      text-decoration: none;
      text-transform: uppercase;
      transition: color 0.618s, border 0.618s;
      h2 {
        padding: 0;
        margin: 0;
      }
    }
    .btn:hover, .btn:focus {
        color: ${palette.HOVER_COLOR };
        border: .25rem solid ${palette.HOVER_COLOR };
        transition: color 0.618s, border 0.618s; }
`


return (
  <wrapper>
    <Grid>
      <GridItem>
        <Card>
          <Cover>
            <Img resolutions={portrait.resolutions}/>
          </Cover>
        </Card>
      </GridItem>
      <GridItem>
        <Card>
          <Data>
            <CardContent>
              <Name>{name}</Name>
              <div dangerouslySetInnerHTML={{ __html: bio.childMarkdownRemark.html }} />
              <SayHi>
                <form name="Say Hi" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" >
                  <input className="hidden" name="bot-field" />
                  <input type="text" name="name" placeholder="Name" />
                  <input type="email" name="_replyto" placeholder="Email" />
                  <textarea name="message" placeholder="Message" />
                  <button className="btn" type="submit"><h2>Say Hi</h2></button>
                </form>
              </SayHi>
            </CardContent>
          </Data>
        </Card>
      </GridItem>
    </Grid>
  </wrapper>
  )
}

export const query = graphql`
  query AboutQuery {
    contentfulAbout {
      name
      id
      portrait {
        resolutions(width: 740) {
            ...GatsbyContentfulResolutions_withWebp
        }
      }
      bio {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
export default AboutPage;
