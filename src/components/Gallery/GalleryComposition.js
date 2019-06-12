import React from 'react'
import styled from '@emotion/styled'
import GalleryGrid from '../Gallery/GalleryGrid'

const Gallery = styled.div`
  text-decoration: none;
  margin: 0;
  padding: 2rem 1rem;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 2rem;
  }
`

const GalleryComposition = props => {
  return (
    <Gallery key={props.id}>
      <GalleryGrid photos={props.images} />
    </Gallery>
  )
}

export default GalleryComposition
