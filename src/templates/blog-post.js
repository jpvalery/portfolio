import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Img from "gatsby-image"
import styled from 'styled-components';


const Wrapper = styled.div`

`;

const Grid = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridTitle = styled.div`
    box-sizing: border-box;
  padding: 1rem;
`;

const GridContent = styled.div`
display: grid;
grid-auto-flow: row dense;
`;


class BlogPost extends Component {
    render() {
        console.log(this.props)
        const { title, createdAt, featuredImage, content } = this.props.data.contentfulBlog
        return (
<Wrapper>
<Grid>
<GridTitle>
<h1>
    {title}
</h1>
<p>{createdAt}</p>
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

export default BlogPost

export const pageQuery = graphql`
    query blogPostQuery($slug: String!){
        contentfulBlog(slug: {eq: $slug}) {
            title
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
