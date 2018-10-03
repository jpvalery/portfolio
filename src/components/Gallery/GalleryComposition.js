import React, { Component } from 'react'
import Img from 'gatsby-image'
import Lightbox from 'react-images'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

class GalleryComposition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shareOpen: false,
      anchorEl: null,
      lightbox: false,
      currentImage: 0,
      photos: props.photos.map(photo =>
        Object.assign({ srcSet: photo.fluid.srcSet })
      ),
    }
  }

  gotoPrevLightboxImage() {
    const { photo } = this.state
    this.setState({ photo: photo - 1 })
  }

  gotoNextLightboxImage() {
    const { photo } = this.state
    this.setState({ photo: photo + 1 })
  }

  openLightbox(photo, event) {
    event.preventDefault()
    this.setState({ lightbox: true, photo })
  }

  closeLightbox() {
    this.setState({ lightbox: false, currentImage: 0 })
  }

  render() {
    const { photos } = this.props
    return (
      <>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="1rem">
            {photos.map((photo, i) => (
              <a
                key={i}
                href={photo.fluid.srcSet}
                onClick={e => this.openLightbox(i, e)}
              >
                <Img fluid={photo.fluid} />
              </a>
            ))}
          </Masonry>
        </ResponsiveMasonry>
        <Lightbox
          backdropClosesModal
          enableKeyboardInput
          showImageCount
          imageCountSeparator={'/'}
          images={this.state.photos}
          preloadNextImage
          currentImage={this.state.photo}
          isOpen={this.state.lightbox}
          onClickPrev={() => this.gotoPrevLightboxImage()}
          onClickNext={() => this.gotoNextLightboxImage()}
          onClose={() => this.closeLightbox()}
        />
      </>
    )
  }
}

export default GalleryComposition
