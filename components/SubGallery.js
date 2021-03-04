import Image from 'next/image'

const SubGallery = (props) => {
  return (
    <>
      {props.images.map((image) => {
        return (
          <div className="relative bg-gray-200 rounded-sm shadow-xl max-w-3xl p-1 md:p-2 transform even:-rotate-2 rotate-1 3n:rotate-4 sticky even:top-32 top-28 first:top-24">
            <Image
              src={image.url}
              alt={image.title}
              width={image.width}
              height={image.height}
              layout="intrinsic"
              className="z-50"
            />
            <div className="bg-yellow-900 animate-pulse-slow z-0 absolute h-9/10 w-9/10 top-4 left-4"></div>
          </div>
        )
      })}
    </>
  )
}

export default SubGallery

// title={gallery.title}
// imagesCollection={gallery.imagesCollection.items}
