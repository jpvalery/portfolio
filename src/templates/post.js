import React, { Component } from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import styled from "styled-components";

require("../utils/prism.css");

import * as palette from "../utils/styles";

class Blog extends Component {
  render() {
    console.log(this.props);
    const {
      title,
      createdAt,
      featuredImage,
      timeToRead,
      content,
      slug,
      blurb
    } = this.props.data.contentfulBlog;

    const Grid = styled.div`
      margin: 1rem 0;
      display: grid;
      grid-template-columns: repeat(1fr);
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

    const GridContent = styled.div`

      background: ${palette.POST_COLOR};
      margin: 0 auto;
      padding: 3rem 1rem 1rem;
      width: 50vw;
      @media (max-width: 991px) {
        width: 90vw;
      }
      pre {
        border: 1px solid ${palette.SECONDARY_COLOR};
        padding: 1rem;
        color: ${palette.SECONDARY_COLOR};
        white-space: pre;
        overflow-x: auto;

      }
      blockquote {
        position: relative;
        margin: 0 1rem 1rem;
        padding: .5rem 2rem;
        border-left: 1px solid ${palette.SECONDARY_COLOR};
        @media (max-width: 991px) {
          width: 75vw;
          margin: 0 1rem 1rem;
          padding: .5rem 2rem;
        }
      }
      blockquote span {
        display: block;
        margin-top: 10px;
        font-style: normal;
      }
    `;
    const Hero = styled.div`

      height: ${palette.HEIGHT};
      margin-top: -1rem;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    `;
    const Cover = styled.div`
      width: 100%;
      height: 100%;
      position: absolute;
    `;
    const Title = styled.div`
      text-align: center;
      z-index: 10;
      background: rgba(0, 0, 0, 0.618);
      color: ${palette.POST_COLOR};
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-transform: uppercase;
    `;
    const Name = styled.h1`
      text-transform: uppercase;
    `;
    const ReadingTime = styled.h4`
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {text-align: right;}
    `;
    const Slug = styled.p`

    `;

    return (
      <Grid>
        <GridItem>
          <Hero>
            <Cover>
              <Img sizes={featuredImage.sizes} />
            </Cover>
            <Title>
            <Name>{title}</Name>
            <Slug>{blurb}</Slug>
            </Title>
          </Hero>
        </GridItem>

        <GridContent>
          <ReadingTime>{createdAt} <span>Reading Time: {content.childMarkdownRemark.timeToRead} min</span></ReadingTime>
          <div dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }} />
        </GridContent>

      </Grid>
    );
  }
}
Blog.PropTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query blogPostQuery($slug: String!) {
    contentfulBlog(slug: { eq: $slug }) {
      title
      blurb
      createdAt(formatString: "MMMM DD, YYYY")
      featuredImage {
        sizes(maxWidth: 740) {
          ...GatsbyContentfulSizes
        }
      }
      content {
        childMarkdownRemark {
          html
          timeToRead
        }
      }

    }
  }
`;
export default Blog;
