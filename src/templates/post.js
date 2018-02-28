import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Img from "gatsby-image"
import styled from 'styled-components';

import * as palette from '../utils/styles';

class BlogPost extends Component {
render() {
  console.log(this.props)
    const { title, createdAt, featuredImage, content, blurb } = this.props.data.contentfulBlog

const Wrapper = styled.div`

`
const Grid = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const HeroGrid = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat( 1fr);
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const GridItem = styled.div`
  .gatsby-image-outer-wrapper, .gatsby-image-wrapper {
    position: static !important;
  }
`
const Hero = styled.div`
height: ${palette.HEIGHT };
margin-top: -1rem;
position: relative;
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Cover = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    transition: 1s;
    filter: blur(6.18px);
`
const Title = styled.div`
  text-align: center;
  z-index:10;
  background: rgba(255,255,255,.35);
  width:100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-transform: uppercase;
`
const GridTitle = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const GridContent = styled.div`
display: grid;
grid-auto-flow: row dense;
`
const HideOnMobile = styled.div`
@media (max-width: 768px) {
  display: none;
}
`

return (
  <Wrapper>
    <HeroGrid>
      <GridItem>
        <Hero>
          <Cover>
            <Img sizes={featuredImage.sizes}/>
          </Cover>
          <Title><h1>{title}</h1>
            <h3>{createdAt}</h3>
          </Title>
        </Hero>
      </GridItem>
    </HeroGrid>
    <Grid>
      <GridTitle>
        <div>
          <p>{blurb}</p>
        </div>
        <HideOnMobile>
          <h1>{title}</h1>
          <p>{createdAt}</p>
          <p>{blurb}</p>
        </HideOnMobile>
      </GridTitle>
      <GridContent>
        <div dangerouslySetInnerHTML={{__html:content.childMarkdownRemark.html}} />
      </GridContent>
    </Grid>
</Wrapper>
    )
  }
}
BlogPost.PropTypes = {
    data: PropTypes.object.isRequired
}

export const pageQuery = graphql`
    query blogPostQuery($slug: String!){
        contentfulBlog(slug: {eq: $slug}) {
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
                }
            }
        }
    }
`
export default BlogPost;
