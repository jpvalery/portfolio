import NextLink from 'next/link'
import Image from 'next/image'

const CardGallery = (props) => {
  return (
    <div
      key={props.id}
      className="bg-gray-200 rounded-sm w-full max-w-xl p-2 md:p-4 transform odd:rotate-1 even:-rotate-1 hover:scale-105"
    >
      <NextLink href={`/${props.slug}/`}>
        <div className="relative cursor-pointer">
          <div className="bg-blue-500 w-full h-60 sm:h-72 object-cover">
            <Image
              src={props.image.url}
              alt={props.image.fileName}
              layout="fill"
            />
          </div>

          <div className="absolute bottom-0 w-full h-full">
            <div className="z-50 from-overlayg1 to-overlayg2 bg-gradient-to-t p-4 h-full grid grid-flow-row items-end gap-0">
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
