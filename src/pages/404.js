import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";

import * as palette from "../utils/styles";

const NotFoundPage = () => {
  const Wrapper = styled.div``;
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
    height: ${palette.HEIGHT};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  `;

  return (
    <Wrapper>
      <GridItem>
        <h1>404 NOT FOUND</h1>
        <p>You just hit a route that doesn't exist</p>
      </GridItem>
    </Wrapper>
  );
};
export default NotFoundPage;
