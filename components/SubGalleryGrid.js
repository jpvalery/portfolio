import Image from 'next/image'

const SubGalleryGrid = (props) => {

  let cwidth; let cheight; 

  if (props.height < props.width) {cwidth = 360; cheight = 240}
  else {cwidth = 200; cheight = 300;}

  return (
    <div className="bg-gray-200 rounded-sm max-w-max p-1 md:p-2 transform odd:rotate-1 even:-rotate-1 hover:scale-105">
        <Image
          src={props.url}
          alt={props.title}
          width={cwidth}
          height={cheight}
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
