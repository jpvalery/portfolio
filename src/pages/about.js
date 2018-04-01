import React from "react";
import { withPrefix } from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";

import * as palette from "../utils/styles";

const AboutPage = ({ data }) => {
  const { name, bio, portrait } = data.contentfulAbout;

  const Wrapper = styled.div``;
  const Grid = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(25vw, 1fr));
    grid-auto-flow: row dense;
    grid-gap: 1rem;
    @media (max-width: 991px) {
      grid-template-columns: 1fr;
    }
  `;
  const GridItem = styled.div`

    .gatsby-image-outer-wrapper,
    .gatsby-image-wrapper {
      position: static !important;
    }
  `;
  const Card = styled.div`

  background: ${palette.POST_COLOR};
    min-height: ${palette.HEIGHT};
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: left;
    justify-content: top;
    flex-direction: column;
  `;
  const Cover = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
  `;
  const Data = styled.div`
    padding: 1rem;
    z-index: 10;
    opacity: 1;
  `;
  const CardContent = styled.div`
    padding: 1rem;
    position: relative;
  `;
  const Name = styled.h1`
    text-transform: uppercase;
  `;

  const Form = styled.form`
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    input,
    textarea {
      font-family: inherit;
      font-size: inherit;
      background: none;
      border: 1px ${palette.SECONDARY_COLOR} solid;
      outline: none;
      color: ${palette.SECONDARY_COLOR};
      border-radius: 0px;
      padding: .618rem;
      resize: none;
      &:focus {
        outline: none;
      }
      &:required {
        box-shadow: none;
      }
    }
  `;

  const FormName = styled.input`
    margin: 0 0 1rem 0;
    width: 100%;
    @media (min-width: 992px) {
      width: 49%;
    }
  `;

  const Email = styled.input`
    margin: 0 0 1rem 0;
    width: 100%;
    @media (min-width: 992px) {
      width: 49%;
    }
  `;

  const Message = styled.textarea`
    width: 100%;
    margin: 0 0 1rem 0;
    line-height: 1.6;
    min-height: 15vh;
    resize: vertical;
  `;
  const Submit = styled.input`
    cursor: pointer;
    transition: 0.2s;
    width: 100%;
  `;
  const SocialIcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    margin-bottom: .618rem;
    a {
      margin: 1rem;
    }
    a:first-child {
      margin-left: 0;
    }
    img {
      height: 1.382rem;
      margin: 0;
      vertical-align: middle;
    }
  `;

  return (
    <wrapper>
      <Grid>
        <GridItem>
          <Card>
            <Cover>
              <Img resolutions={portrait.resolutions} />
            </Cover>
          </Card>
        </GridItem>
        <GridItem>
          <Card>
            <Data>
              <CardContent>
                <Name>{name}</Name>
                <SocialIcon>
                  <a href="https://instagram.com/iammatthias/">
                    <img src={withPrefix("./instagram.svg")} />
                  </a>
                  <a href="https://twitter.com/iamMatthias">
                    <img src={withPrefix("./twitter.svg")} />
                  </a>
                  <a href="https://www.linkedin.com/in/iammatthias/">
                    <img src={withPrefix("./linkedin.svg")} />
                  </a>
                  <a href="https://www.facebook.com/iammatthias">
                    <img src={withPrefix("./facebook.svg")} />
                  </a>
                  <a href="/resume">
                    <img src={withPrefix("./file-text.svg")} />
                  </a>
                </SocialIcon>
                <div
                  dangerouslySetInnerHTML={{
                    __html: bio.childMarkdownRemark.html
                  }}
                />

                <Form
                  name="contact"
                  method="POST"
                  action="/about-thanks"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                >
                  <a href="/about-thanks" className="hidden">
                    thanks
                  </a>
                  <input
                    type="hidden"
                    name="form-name"
                    value="contact"
                    action="/about-thanks/"
                  />
                  <p hidden>
                    <label>
                      Don’t fill this out:{" "}
                      <input className="hidden" name="bot-field" />
                    </label>
                  </p>

                  <FormName
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                  />
                  <Email
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <Message
                    name="message"
                    type="text"
                    placeholder="Message"
                    required
                  />
                  <Submit name="submit" type="submit" value="Send" />
                </Form>
              </CardContent>
            </Data>
          </Card>
        </GridItem>

      </Grid>
    </wrapper>
  );
};

export const query = graphql`
  query AboutQuery {
    contentfulAbout {
      name
      id
      formSubmission {
        childMarkdownRemark {
          html
        }
      }
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
`;
export default AboutPage;
