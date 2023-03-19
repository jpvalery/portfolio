import Image from 'next/image'
import NextLink from 'next/link'

const CardGallery = (props) => {
  return (
    <container className="group flex items-center justify-center">
      {/* Main picture frame */}
      <div
        key={props.id}
        className="z-50 max-w-2xl transform rounded-sm bg-gray-200 p-2 shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105"
      >
        <NextLink href={`/${props.slug}/`}>
          <div className="relative max-w-max cursor-pointer">
            <div className="relative flex">
              <Image
                src={props.image.url}
                alt={props.image.fileName}
                width={props.image.width}
                height={props.image.height}
                layout="intrinsic"
              />
            </div>

            <div className="absolute bottom-0 h-full w-full">
              <div className="z-20 grid h-full grid-flow-row items-end bg-gradient-to-t from-overlayg1 to-overlayg2 p-4">
                <div>
                  <h2 className="text-xl font-extrabold uppercase">
                    {props.title}
                  </h2>
                  <div>
                    <p className="flex font-semibold uppercase text-accent">
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
      <div className="group-hover:rotate-4 absolute z-10 rotate-2 scale-100 transform rounded-sm border-8 border-gray-300 shadow-xl transition-all duration-500 ease-in-out group-hover:scale-115 sm:scale-110">
        <div className="hidden bg-yellow-900 opacity-90 md:h-max2 md:w-max3 sm:block"></div>
      </div>

      {/* 3rd frame */}
      <div className="group-hover:-rotate-4 absolute z-0 -rotate-3 scale-100 transform rounded-sm border-8 border-gray-300 shadow-xl transition-all duration-500 ease-in-out group-hover:scale-115 sm:scale-110">
        <div className="hidden bg-yellow-900 opacity-90 md:block md:h-max2 md:w-max3"></div>
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
