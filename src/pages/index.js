import React from 'react'
import Link from 'gatsby-link'
import Img from "gatsby-image"
import styled from 'styled-components';

import * as palette from '../utils/styles';

const IndexPage = ({data}) => {

const posts = data.allContentfulGallery.edges;
const page = data.contentfulHome;

const Grid = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat( 1fr);
  grid-auto-flow: row;
  grid-gap: 1rem;
`
const Hero = styled.div`
height: ${palette.HEIGHT };
margin-top: -1rem;
position: relative;
overflow: hidden;
.gatsby-image-outer-wrapper, .gatsby-image-wrapper {
  position: static !important;
}
`
const SubGrid = styled.ul`
  display: grid;
  margin: 0;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const SubGridLeft = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const SubGridRight = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const GridItem = styled(Link)`
  .gatsby-image-outer-wrapper, .gatsby-image-wrapper {
    position: static !important;
  }
`
const GridItemLeft = styled(Link)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  justify-content: center;
  .gatsby-image-outer-wrapper, .gatsby-image-wrapper {
    position: static !important;
  }
  @media (max-width: 768px) {
      grid-template-columns: 1fr;
  }
`
const GridItemRight = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  justify-content: center;
  .gatsby-image-outer-wrapper, .gatsby-image-wrapper {
    position: static !important;
  }
  @media (max-width: 768px) {
      grid-template-columns: 1fr;
      .reverse {
        order: 2;
      }
  }
`
const Blurb = styled.div`
height: ${palette.BLURB_HEIGHT };
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
p { margin: 25vw;
  @media (max-width: 768px) {
      margin: 1rem;
  }
}
@media (max-width: 768px) {
    height: ${palette.BLURB_HEIGHT.MOBILE };
}
`
const Card = styled.div`
    height: ${palette.HEIGHT };
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
    text-align: center;
`
const Name = styled.h1`
    text-transform: uppercase;
`
const Description = styled.p`
    margin: 0 auto;
    width: 25vw;
    @media (max-width: 768px) {
        width: 75vw;
    }
`

return (
    <Grid>
        <Hero>
          <Cover>
            <Img sizes={page.hero.sizes}/>
          </Cover>
        </Hero>

      <Blurb dangerouslySetInnerHTML={{ __html: page.bio.childMarkdownRemark.html }} />

      <SubGridLeft>
        <GridItemLeft to={posts[0].node.slug + "/"} >
          <Card>
            <Cover>
              <Img sizes={posts[0].node.featuredImage.sizes}/>
            </Cover>
          </Card>

          <Data>
            <Name>{posts[0].node.title}</Name>
            <Description>{posts[0].node.blurb}</Description>
          </Data>
        </GridItemLeft>
      </SubGridLeft>

      <SubGridRight>
        <GridItemRight to={posts[1].node.slug + "/"}>
          <Data className="reverse">
            <Name>{posts[1].node.title}</Name>
            <Description>{posts[1].node.blurb}</Description>
          </Data>

          <Card >
            <Cover>
              <Img sizes={posts[1].node.featuredImage.sizes}/>
            </Cover>
          </Card>
        </GridItemRight>
      </SubGridRight>

        <Blurb dangerouslySetInnerHTML={{ __html: page.snippet.childMarkdownRemark.html }} />

      <SubGrid>
      {posts.slice(2).map(({ node: posts }) => (
        <GridItem key={posts.id} to={posts.slug + "/"} >
          <Card>
            <Cover>
              <Img sizes={posts.featuredImage.sizes}/>
            </Cover>
          </Card>
          <Data>
            <Name>{posts.title}</Name>
            <Description>{posts.blurb}</Description>
          </Data>
        </GridItem>
        ))}
      </SubGrid>
    </Grid>
    )
}

export const query = graphql`
  query HomeQuery {
    allContentfulGallery {
      edges {
        node {
          title
          id
          slug
          blurb
          createdAt(formatString: "MMMM DD, YYYY")
          featuredImage {
            title
            sizes(maxWidth: 1000) {
              ...GatsbyContentfulSizes_noBase64
            }
          }
        }
      }
    }
    contentfulHome {
      title
      id
      hero {
        title
        sizes(maxWidth: 1800) {
          ...GatsbyContentfulSizes_noBase64
        }
      }
      bio {
        childMarkdownRemark {
          html
        }
      }
      snippet {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
export default IndexPage;
