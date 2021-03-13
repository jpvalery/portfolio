import Image from 'next/image'

const SubGallery = (props) => {
  return (
    <>
      {props.images.map((image) => {
        return (
          <div className="sticky max-w-3xl p-1 transform bg-gray-200 rounded-sm shadow-xl md:p-2 even:-rotate-2 rotate-1 3n:rotate-4 even:top-32 top-28 first:top-24">
            <Image
              src={image.url}
              alt={image.title}
              width={image.width}
              height={image.height}
              layout="intrinsic"
              className="z-50"
            />
            <div className="absolute z-0 w-5/6 bg-yellow-900 animate-pulse-slow h-5/6 md:h-9/10 md:w-9/10 top-4 left-4"></div>
          </div>
        )
      })}
    </>
  )
}

export default SubGallery

// title={gallery.title}
// imagesCollection={gallery.imagesCollection.items}
