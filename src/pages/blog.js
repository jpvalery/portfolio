import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";

import * as palette from "../utils/styles";

const IndexPage = ({ data }) => {
  const posts = data.allContentfulBlog.edges;

  const Grid = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr;
  `;

  const GridItem = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-content: center;
    .gatsby-image-outer-wrapper,
    .gatsby-image-wrapper {
      position: static !important;
    }
  `;

  const Card = styled.div`
    height: 33vh;
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
    text-align: left;
  `;
  const Name = styled.h1`
    text-transform: uppercase;
  `;
  const Date = styled.h4`
    text-transform: uppercase;
  `;
  const Slug = styled.p`

  `;


  return (
    <Grid>

        {posts.slice(0).map(({ node: posts }) => (
          <GridItem key={posts.id} to={ "/blog/" + posts.slug + "/"}>
            <Card>
              <Cover>
                <Img sizes={posts.featuredImage.sizes} />
              </Cover>
            </Card>
            <Data>
              <Name>{posts.title}</Name>
              <Date>{posts.createdAt}</Date>
              <Slug>{posts.slug}</Slug>
            </Data>
          </GridItem>
        ))}

    </Grid>
  );
};

export const query = graphql`
  query BlogQuery {
    allContentfulBlog {
      edges {
        node {
          title
          id
          slug
          blurb
          createdAt(formatString: "MMMM DD, YYYY")
          featuredImage {
            title
            sizes(maxWidth: 740) {
              ...GatsbyContentfulSizes_noBase64
            }
          }
        }
      }
    }
  }
`;
export default IndexPage;
