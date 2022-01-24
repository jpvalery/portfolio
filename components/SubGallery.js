import Image from 'next/image'

const SubGallery = (props) => {
  return (
    <>
      {props.images.map((image) => {
        return (
          <div className="sticky top-28 max-w-3xl rotate-1 transform rounded-sm bg-gray-200 p-1 shadow-xl first:top-24 even:top-32 even:-rotate-2 3n:rotate-4 md:p-2">
            <Image
              src={image.url}
              alt={image.title}
              width={image.width}
              height={image.height}
              layout="intrinsic"
              className="z-50"
            />
            <div className="absolute top-4 left-4 z-0 h-5/6 w-5/6 animate-pulse-slow bg-yellow-900 md:h-9/10 md:w-9/10"></div>
          </div>
        )
      })}
    </>
  )
}

export default SubGallery

// title={gallery.title}
// imagesCollection={gallery.imagesCollection.items}
