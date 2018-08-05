import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

const List = styled.ul`
  width: 100%;
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0;
  flex-flow: column;
  justify-content: center;
  width: 50%;
  min-height: calc(100vh - 8rem);
`;

const Item = styled.li`
  width: 100%;
  margin: 0 0 1.5rem 0;
  margin: 0 0 1.5rem 0;
  &:last-child {
    margin: 0;
  }
`;

const Title = styled.h3`
  z-index: 99;
  font-size: 1em;
  margin: 0.5rem 0 0 0;
  display: inline-block;
  transition: color 0.3s, border-color 0.3s;
`;

const Cover = styled.div`
  position: relative;
  transition: none;
  position: fixed !important;
  pointer-events: none;
  transition: opacity 0.3s, visibility 0.3s;
  width: 50%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -99;
  opacity: 0;
  visibility: hidden;
  div {
    height: 100% !important;
    object-fit: cover !important;
  }
`;

const ProjectLink = styled(Link)`
  &:hover h3 {
    border-color: white;
    color: white;
    opacity: 1;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
  }
  &:hover div {
    @supports (object-fit: cover) {
      display: block;
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Home = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query HomeQuery {
        allContentfulGallery(limit: 1, sort: { fields: [date], order: DESC }) {
          edges {
            node {
              title
              slug
              id
              date
              homepageHero {
                title
                sizes(maxWidth: 1800) {
                  ...GatsbyContentfulSizes_withWebp_noBase64
                }
              }
              homepageLogo {
                title
                sizes(maxWidth: 1800) {
                  ...GatsbyContentfulSizes_withWebp_noBase64
                }
              }
              introduction {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <List>
        {props.projects.map(({ node: project }) => (
          <Item key={project.id}>
            <ProjectLink to={`/${project.slug}/`}>
              <Cover>
                <Img
                  sizes={project.homepageHero.sizes}
                  alt={project.homepageHero.title}
                  title={project.homepageHero.title}
                  backgroundColor={"#272727"}
                />
              </Cover>
              <Title>{project.title}</Title>
            </ProjectLink>
          </Item>
        ))}
      </List>
    )}
  />
);

export default Home;
