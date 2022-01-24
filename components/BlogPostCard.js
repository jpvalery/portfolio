import Image from 'next/image'
import NextLink from 'next/link'

const BlogPostCard = (props) => {
  const publish = new Date(props.date)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const friendlyDate = publish.toLocaleDateString('en-CA', options)

  return (
    <>
      <NextLink href={`/blog/${props.slug}/`}>
        <div className="m-8 grid max-w-2xl transform cursor-pointer grid-flow-col justify-start rounded-md bg-white bg-opacity-10 p-4 transition-transform duration-500 ease-in-out hover:scale-105">
          <div className="relative h-48 w-48">
            <Image
              src={props.imageUrl}
              alt={props.imageAlt}
              layout="fill"
              objectFit="cover"
              className="rounded-sm"
            />
          </div>
          <div className="grid w-full grid-flow-row gap-0 px-4">
            <h2 className="font-serif text-3xl font-bold text-white">
              {props.title}
            </h2>
            <p className="text-lg text-gray-50">{props.description}</p>
            <p className="text-sm text-gray-400">Published on {friendlyDate}</p>
          </div>
        </div>
      </NextLink>
    </>
  )
}

export default BlogPostCard

// title={post.title}
// slug={post.slug}
// description={post.metaDescription}
// date={post.publishDate}
// imageUrl={post.heroImage.url}
// imageAlt={post.heroImage.title}
