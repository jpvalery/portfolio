import NextLink from 'next/link'
import Image from 'next/image'

const CardGallery = (props) => {
  return (
    <container className="group flex justify-center items-center">
    {/* Main picture frame */}
    <div
      key={props.id}
      className="z-50 bg-gray-200 shadow-2xl rounded-sm max-w-2xl p-2 transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
    >
      <NextLink href={`/${props.slug}/`}>
        <div className="relative cursor-pointer max-w-max">
          <div className="flex relative">
            <Image
              src={props.image.url}
              alt={props.image.fileName}
              width={props.image.width}
              height={props.image.height}
              layout="intrinsic"
            />
          </div>

          <div className="absolute bottom-0 w-full h-full">
            <div className="z-50 from-overlayg1 to-overlayg2 bg-gradient-to-t h-full p-4 grid grid-flow-row items-end">
              <div>
                <h2 className="uppercase text-xl font-extrabold">
                  {props.title}
                </h2>
                <div>
                  <p className="flex text-accent uppercase font-semibold">
                    {props.year} -{' '}
                    <ul className="inline-flex gap-1">
                      {props.tags.map((tag) => (
                        <li key={tag.slug} className="">
                          {tag.title}
                        </li>
                      ))}
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NextLink>
    </div>

    {/* 2nd frame */}
    <div
      className="z-10 absolute border-8 border-gray-300 shadow-xl rounded-sm transform rotate-2 group-hover:rotate-4 scale-100 sm:scale-110 group-hover:scale-115 transition-all duration-500 ease-in-out"
    >
      <div className="hidden sm:block bg-yellow-900 opacity-90 md:w-max3 md:h-max2"></div>
    </div>

    {/* 3rd frame */}
    <div
      className="z-0 absolute border-8 border-gray-300 shadow-xl rounded-sm transform -rotate-3 group-hover:-rotate-4 scale-100 sm:scale-110 group-hover:scale-115 transition-all duration-500 ease-in-out"
    >
      <div className="hidden md:block bg-yellow-900 opacity-90 md:w-max3 md:h-max2"></div>
    </div>
    </container>
  )
}

export default CardGallery

// key={gallery.id}
// slug={gallery.slug}
// image={gallery.heroImage}
// title={gallery.title}
// year={gallery.year}
// tags={gallery.tagsCollection.items}
// date={gallery.publishDate}
