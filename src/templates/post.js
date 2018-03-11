import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styled from 'styled-components'
import sizeMe from 'react-sizeme'
import StackGrid from 'react-stack-grid'

import * as palette from '../utils/styles'

class Gallery extends Component {
render() {
  console.log(this.props)
    const { title, createdAt, featuredImage, content, blurb, images } = this.props.data.contentfulGallery
    const {width} = this.props.size

    const Grid = styled.div`
      margin: 1rem 0;
      display: grid;
      grid-template-columns: repeat( 1fr);
      grid-auto-flow: row dense;
      grid-gap: 1rem;
      @media (max-width: 991px) {
        grid-template-columns: 1fr;
      }
    `

const GridItem = styled.div`
  .gatsby-image-outer-wrapper, .gatsby-image-wrapper {
    position: static !important;
  }
`

const GridContent = styled.div`
  margin: 0 auto;
  padding: 3rem 0 1rem;
  width: 50vw;
  @media (max-width: 991px) {
  width: 75vw;
  }
  pre{
    padding: 1rem;
    color: ${palette.SECONDARY_COLOR };
    white-space: pre;
    overflow-x: auto;
    border: 1px solid ${palette.SECONDARY_COLOR };
  }
  blockquote{
    position: relative;
    padding-left: 40px;
    border-left: 2px solid ${palette.SECONDARY_COLOR };
  }
  blockquote span {
    display: block;
    margin-top: 10px;
    font-style: normal;
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
    filter: blur(1.91px);
`
const Title = styled.div`
  text-align: center;
  z-index:10;
  background: rgba(0,0,0,.618);
  color: ${palette.POST_COLOR};
  width:100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-transform: uppercase;
p {width: 50vw;}
`

return (
  <Grid>
    <GridItem>
      <Hero>
        <Cover>
          <Img sizes={featuredImage.sizes}/>
        </Cover>
        <Title><h1>{title}</h1>
        </Title>
      </Hero>
    </GridItem>

<GridContent dangerouslySetInnerHTML={{__html:content.childMarkdownRemark.html}} />

<StackGrid columnWidth={width <= 768 ? '100%' : '33.33%'} gutterWidth={16} gutterHeight={16} duration={0}>
  {images && ( images.map((images, index) => ( <Img key={index} sizes={images.sizes} alt={images.title} title={images.title} /> )) )}
</StackGrid>

  </Grid>

    )
  }
}
Gallery.PropTypes = {
    data: PropTypes.object.isRequired
}

export const pageQuery = graphql`
    query galleryPostQuery($slug: String!){
        contentfulGallery(slug: {eq: $slug}) {
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
            images {
              title
              sizes(maxWidth: 740) {
                ...GatsbyContentfulSizes_noBase64
              }
            }
        }
    }
`
export default sizeMe()(Gallery);
