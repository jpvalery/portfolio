import NextLink from 'next/link'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import TagLabel from '../../components/TagLabel'

export default function BlogPost({ metadata, tags }) {
  const content = unified()
    .use(parse)
    .use(remark2react)
    .processSync(metadata.body).result

  return (
    <main>
      <div className="mx-auto py-12 grid">
        <div className="pb-2">
          <h1 className="font-serif font-bold text-5xl md:text-6xl text-center from-titleg1 to-titleg2 bg-gradient-to-r bg-clip-text text-transparent py-4">
            {metadata.title}
          </h1>
        </div>

        <div className="mx-auto">
          <ul className="grid grid-flow-col gap-2">
            {tags.map((tag) => {
              return <TagLabel slug={tag.slug} title={tag.title} />
            })}
          </ul>
        </div>

        <div className="py mx-auto">
          <p className="prose prose-2xl text-gray-50 p-12">{content}</p>
        </div>
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
        postCollection {
          items {
            slug
          }
        }
      }
    `,
  })
  // Get the paths we want to pre-render based on posts
  const slugs = data.postCollection.items

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
      query($slug: String!) {
        postCollection(limit: 1, where: { slug: $slug }) {
          items {
            title
            slug
            metaDescription
            publishDate
            heroImage {
              title
              description
              contentType
              fileName
              size
              url
              width
              height
            }
            body
            tags {
              title
              slug
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
      metadata: data.postCollection.items[0],
      // We put tags as an array because for some reason, for blogs it's an object
      tags: [data.postCollection.items[0].tags],
    },
  }
}
