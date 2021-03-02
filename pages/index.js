import NextLink from 'next/link'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import CardGallery from '../components/CardGallery'

export default function Home({ galleries }) {
  return (
    <div className="mx-auto py-24 grid gap-20 md:gap-30">
      <div className="pb-8">
        <h1 className="font-serif font-bold text-5xl md:text-6xl text-center pb-8 from-titleg1 to-titleg2 bg-gradient-to-r bg-clip-text text-transparent">
          There's a lot of beauty in
          <br />
          ordinary things
        </h1>
        <div className="text-2xl text-center text-gray-50 py-8">
          <p>I'm a self-taught photographer documenting spaces and people.</p>
          <p>
            Learn more{' '}
            <NextLink href="/biography">
              <span className="hover:text-accent underline cursor-pointer">
                about me
              </span>
            </NextLink>{' '}
            or{' '}
            <a
              href="https://contact.jpvalery.me"
              className="hover:text-accent underline"
            >
              get in touch
            </a>
            .
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center items-center gap-12">
        {galleries.map((gallery) => {
          return (
            <CardGallery
              key={gallery.id}
              slug={gallery.slug}
              image={gallery.heroImage}
              title={gallery.title}
              year={gallery.year}
              tags={gallery.tagsCollection.items}
              date={gallery.publishDate}
            />
          )
        })}
      </div>
    </div>
  )
}

// We use getStaticProps to get the content at build time
export async function getStaticProps() {
  // We use Apollo to query Contentful GraphQL API
  const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    cache: new InMemoryCache(),
    credentials: 'same-origin',
  })

  // We define our query here
  const { data } = await client.query({
    query: gql`
      query Index {
        extendedGalleryCollection(
          order: publishDate_DESC
          where: { displayHome: true }
        ) {
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
          }
        }
      }
    `,
  })

  // We return the result of the query as props to pass them above
  return {
    props: {
      galleries: data.extendedGalleryCollection.items,
    },
  }
}
