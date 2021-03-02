import Image from 'next/image'

const SubGalleryGrid = (props) => {
  return (
    <div className="bg-gray-200 rounded-sm max-w-max p-1 md:p-2 transform odd:rotate-1 even:-rotate-1">
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
