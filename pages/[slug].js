import NextLink from 'next/link'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

export default function Home({ gallery }) {
  console.log(gallery)
  return (
    <div className="mx-auto py-24 grid gap-20 md:gap-30">
      <h1>{gallery.title}</h1>
    </div>
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
            summary
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
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      slug: params.slug
        }
  })

  // We return the result of the query as props to pass them above
  return {
    props: {
      gallery: data.extendedGalleryCollection.items.[0],
      // subgalleries: data.extendedGalleryCollection.items.galleriesCollection.items,
    },
  }
}
