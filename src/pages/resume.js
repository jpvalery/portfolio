import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";

import * as palette from "../utils/styles";

const ResumePage = ({ data }) => {
  const { resume } = data.contentfulAbout;

  const Wrapper = styled.div``;
  const Grid = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr;
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
  const Resume = styled.div`
    img {
      width: 100%;
    }
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
      padding: 1em;
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
    margin: 0 0 1em 0;
    width: 100%;
    @media (min-width: 992px) {
      width: 49%;
    }
  `;

  const Email = styled.input`
    margin: 0 0 1em 0;
    width: 100%;
    @media (min-width: 992px) {
      width: 49%;
    }
  `;

  const Message = styled.textarea`
    width: 100%;
    margin: 0 0 1em 0;
    line-height: 1.6;
    min-height: 125px;
    resize: vertical;
  `;
  const Submit = styled.input`
    cursor: pointer;
    transition: 0.2s;
    width: 100%;
  `;

  return (
    <wrapper>
      <Grid>

        <GridItem>
        <Resume
          dangerouslySetInnerHTML={{
            __html: resume.childMarkdownRemark.html
          }}
        />
        </GridItem>



      </Grid>
    </wrapper>
  );
};

export const query = graphql`
  query ResumeQuery {
    contentfulAbout {
      id
      resume {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
export default ResumePage;
