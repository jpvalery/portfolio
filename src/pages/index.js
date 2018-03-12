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
const SubGrid1 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
`
const SubGrid2 = styled.ul`
  display: grid;
  margin: 0;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  @media (max-width: 991px) {
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
  @media (max-width: 991px) {
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
  @media (max-width: 991px) {
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
p { margin: 25vw auto;
    width: 50vw;
  @media (max-width: 991px) {
      margin: 1rem;
      width: 75vw;
  }
}

@media (max-width: 991px) {
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
    @media (max-width: 991px) {
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

      <SubGrid1>
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
      </SubGrid1>

        <Blurb dangerouslySetInnerHTML={{ __html: page.snippet.childMarkdownRemark.html }} />

      <SubGrid2>
      {posts.slice(2).map(({ node: posts }) => (
        <GridItem key={posts.id} to={posts.slug + "/"} >
          <Card>
            <Cover>
              <Img sizes={posts.featuredImage.sizes}/>
            </Cover>
          </Card>
          <Data>
            <Name>{posts.title}</Name>
            
          </Data>
        </GridItem>
        ))}
      </SubGrid2>
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
            sizes(maxWidth: 740) {
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
        sizes(maxWidth: 1200) {
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
