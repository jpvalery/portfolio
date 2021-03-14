import { NextSeo } from 'next-seo'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import BlogPostCard from '../../components/BlogPostCard'

export default function BlogIndex({ metadata }) {
  return (
    <>
      <NextSeo
        title="Photography Blog"
        description="Occasional articles about photography"
      />
      <main>
        <div className="grid py-12 mx-auto">
          <div className="pb-2">
            <h1 className="py-4 font-serif text-5xl font-bold text-center text-transparent md:text-6xl from-titleg1 to-titleg2 bg-gradient-to-r bg-clip-text">
              Blog
            </h1>
            <p className="text-2xl font-bold text-center text-accent">
              Occasional ramblings and writings about photography
            </p>
          </div>

          <div className="mx-auto py">
            {metadata.map((post) => {
              return (
                <BlogPostCard
                  title={post.title}
                  slug={post.slug}
                  description={post.metaDescription}
                  date={post.publishDate}
                  imageUrl={post.heroImage.url}
                  imageAlt={post.heroImage.title}
                />
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}

//////////////// PAGE CONTENT /////////////////////

// We use getStaticProps to get the content at build time
export async function getStaticProps() {
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
      query {
        postCollection(order: publishDate_DESC) {
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
            tags {
              title
              slug
            }
          }
        }
      }
    `,
  })

  // We return the result of the query as props to pass them above
  return {
    props: {
      metadata: data.postCollection.items,
    },
  }
}
