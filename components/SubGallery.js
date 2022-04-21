import Image from 'next/image'

const SubGallery = (props) => {
  return (
    <>
      {props.images.map((image) => {

        // Random rotation generated at render
        const rotate = [
          '-rotate-[3deg]',
          '-rotate-[2deg]',
          '-rotate-[1deg]',
          'rotate-0',
          'rotate-[1deg]',
          'rotate-[2deg]',
          'rotate-[3deg]',
        ]
        const random = Math.floor(Math.random() * rotate.length)

        return (
          <div
            className={`sticky top-28 max-w-3xl transform rounded-sm bg-gray-200 p-1 shadow-xl first:top-24 ${rotate[random]} md:p-2 grid justify-items-center align`}
          >
            <Image
              src={image.url}
              alt={image.title}
              width={image.width}
              height={image.height}
              layout="intrinsic"
              className="z-50"
            />
            <div
              className={`absolute top-4 left-4 right-4 bottom-4 z-0 m-auto w-9/10 h-9/10 animate-pulse-slow bg-yellow-900`}
            ></div>
          </div>
        )
      })}
    </>
  )
}

export default SubGallery

// title={gallery.title}
// imagesCollection={gallery.imagesCollection.items}
