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
        <div className="grid grid-flow-col justify-start bg-white bg-opacity-10 rounded-md max-w-2xl m-8 p-4 cursor-pointer transform transform hover:scale-105 transition-transform duration-500 ease-in-out">
          <div className="relative h-48 w-48">
            <Image
              src={props.imageUrl}
              alt={props.imageAlt}
              layout="fill"
              objectFit="cover"
              className="rounded-sm"
            />
          </div>
          <div className="w-full px-4 grid grid-flow-row gap-0">
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
