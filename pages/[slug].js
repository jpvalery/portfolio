import NextLink from 'next/link'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import TagLabel from '../components/TagLabel'
import SubGallery from '../components/SubGallery'

export default function Home({ metadata, tags, galleries }) {
  const content = unified()
    .use(parse)
    .use(remark2react)
    .processSync(metadata.body).result

  return (
    <main>
      <div className="py-12 mx-auto grid">
        <div className="pb-2">
          <h1 className="py-4 font-serif text-5xl font-bold text-center text-transparent md:text-6xl from-titleg1 to-titleg2 bg-gradient-to-r bg-clip-text">
            {metadata.title}
          </h1>
          <p className="text-2xl font-bold text-center text-gray-200 text-accent">
            {metadata.year}
          </p>
        </div>

        <div className="pt-2 pb-4 mx-auto">
          <ul className="grid grid-flow-col gap-2">
            {tags.map((tag) => {
              return <TagLabel slug={tag.slug} title={tag.title} />
            })}
          </ul>
        </div>

        <div className="mx-auto py">
          <p className="text-center prose prose-2xl text-gray-50">{content}</p>
        </div>
      </div>

      <div className="items-center p-8 grid grid-flow-row grid-cols-1 gap-32 justify-items-center md:p-32">
        {galleries.map((gallery) => {
          return (
            <SubGallery
              title={gallery.title}
              images={gallery.imagesCollection.items}
            />
          )
        })}
      </div>
    </main>
  )
}

//////////////// PAGE PATHS /////////////////////

// We use getStaticPaths to get all the slugs at build time
export async function getStaticPaths() {
  // We use Apollo to query Contentful GraphQL API
  const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    cache: new InMemoryCache({
      addTypename: false,
    }),
    credentials: 'same-origin',
  })

  // We define our query here
  const { data } = await client.query({
    query: gql`
      query SlugsIndex {
        extendedGalleryCollection {
          items {
            slug
          }
        }
      }
    `,
  })
  // Get the paths we want to pre-render based on posts
  const slugs = data.extendedGalleryCollection.items

  // Map them under the accepted format for the return part of getStaticPaths
  const paths = slugs.map((page) => ({
    params: { slug: page.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    fallback: false,
  }
}

//////////////// PAGE CONTENT /////////////////////

// We use getStaticProps to get the content at build time
export async function getStaticProps({ params }) {
  // params contains the page 'slug'.

  // We use Apollo to query Contentful GraphQL API
  const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    cache: new InMemoryCache(),
    credentials: 'same-origin',
  })

  // We define our query here
  const { data } = await client.query({
    query: gql`
      query($slug: String) {
        extendedGalleryCollection(limit: 1, where: { slug: $slug }) {
          items {
            title
            slug
            year
            body
            metaDescription
            tagsCollection {
              items {
                title
                slug
              }
            }
            galleriesCollection {
              items {
                title
                imagesCollection {
                  items {
                    title
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  })

  // We return the result of the query as props to pass them above
  return {
    props: {
      metadata: data.extendedGalleryCollection.items[0],
      tags: data.extendedGalleryCollection.items[0].tagsCollection.items,
      galleries:
        data.extendedGalleryCollection.items[0].galleriesCollection.items,
    },
  }
}
