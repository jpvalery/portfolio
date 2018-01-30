import React from 'react';
import format from 'date-fns/format';
import styled from 'styled-components';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import Overdrive from 'react-overdrive';

import config from '../../config/SiteConfig';
import * as palette from '../../config/Style';

const CardItem = styled(Link)`
    height: ${palette.CONTENT_HEIGHT};
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: ${palette.COLOR};
`;

const Cover = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    div {
        overflow: hidden;
    }
`;

const Data = styled.div`
    padding: 1rem;
    z-index: 10;
    opacity: 1;
`;


const Content = styled.div`
    padding: 1rem;
    position: relative;
    opacity: 1;
`;


const Name = styled.h1`
    text-transform: uppercase;
`;

const Card = ({
  path, cover, date, areas, title, slug,
}) => (
  <Overdrive id={`${slug}-cover`}>
    <CardItem
      to={path}
    >
      <Cover>
        <Img sizes={cover} />
      </Cover>
      <Data>
        <Content>
          <Name>{title}</Name>
        </Content>
      </Data>
    </CardItem>
  </Overdrive>
);

export default Card;
