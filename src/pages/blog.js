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
    grid-gap: 1rem;
  `;

  const GridItem = styled(Link)`
  border: 1px solid ${palette.SECONDARY_COLOR};
  display: grid;
  grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-content: center;
    grid-gap: 1rem;
    .gatsby-image-outer-wrapper,
    .gatsby-image-wrapper {
      position: static !important;
    }
    @media (max-width: 991px) {
      grid-template-columns: 1fr;
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
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 1rem;
    @media (max-width: 991px) {
      text-align: center;
      grid-template-columns: 1fr;
      grid-gap: 0;
    }
  `;
  const Title = styled.div`
    padding: 1rem;
    @media (max-width: 991px) {
      text-align: center;
    }
  `;
  const Name = styled.h1`
    text-transform: uppercase;
  `;
  const Date = styled.h4`
    text-transform: uppercase;
    margin-bottom: 0;
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
              <Title>
              <Name>{posts.title}</Name>
              <Date>{posts.createdAt}</Date>
              </Title>
              <Slug>{posts.blurb}</Slug>
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
