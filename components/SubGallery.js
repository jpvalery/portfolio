import Image from 'next/image'
import SubGalleryGrid from './SubGalleryGrid'

const SubGallery = (props) => {
  return (
    <>
      {props.images.map((image) => {
        return (
          <SubGalleryGrid
            title={image.title}
            url={image.url}
            height={image.height}
            width={image.width}
          />
        )
      })}
      </>

  )
}

export default SubGallery

// title={gallery.title}
// imagesCollection={gallery.imagesCollection.items}
