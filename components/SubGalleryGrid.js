import Image from 'next/image'

const SubGalleryGrid = (props) => {
  return (
    <div className="bg-gray-200 rounded-sm shadow-xl max-w-screen p-1 md:p-2 transform even:-rotate-2 rotate-1 3n:rotate-4 sticky even:top-32 top-28 first:top-24">
      <Image
        src={props.url}
        alt={props.title}
        width={props.width}
        height={props.height}
        layout="intrinsic"
      />
    </div>
  )
}

export default SubGalleryGrid

// title={image.title}
// url={image.url}
// height={image.height}
// width={image.width}
