import React from 'react'
import styled from 'react-emotion'
import GalleryGrid from '../Gallery/GalleryGrid'

const Gallery = styled.div`
  text-decoration: none;
  margin: 0;
  padding: 2rem 1rem;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 2rem;
  }
`
const Title = styled.h2`
  text-transform: uppercase;
  margin: 0;
  padding: 0 1rem;
`

const GalleryComposition = props => {
  return (
    <Gallery key={props.id}>
      <Title>{props.title}</Title>
      <GalleryGrid photos={props.images} />
    </Gallery>
  )
}

export default GalleryComposition
