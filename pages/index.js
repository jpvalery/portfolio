import NextLink from 'next/link'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home({ galleries }) {
  console.log(galleries);
  return (
    <div className="mx-auto py-24 grid gap-20 md:gap-30">
      <div className="pb-8">
        <h1 className="font-serif font-bold text-5xl md:text-6xl text-center pb-8 from-titleg1 to-titleg2 bg-gradient-to-r bg-clip-text text-transparent">
          There's a lot of beauty in
          <br />
          ordinary things
        </h1>
        <div className="prose prose-xl prose-accent text-center text-gray-50 py-8">
          <p>I'm a self-taught photographer documenting spaces and people.</p>
          <p>
            Learn more <NextLink href="/biography">about me</NextLink> or{' '}
            <a href="https://contact.jpvalery.me">get in touch</a>.
          </p>
        </div>
      </div>
      <div className="grid">
        {galleries.map(gallery => {
          return (
            <p>{gallery.title}</p>
          );
        })}
        </div>
    </div>
  )
}

export async function getStaticProps() {

  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

  const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${space}/?access_token=${accessToken}`,
  cache: new InMemoryCache(),
  credentials: 'same-origin',
  });


  const { data } = await client.query({
  query: gql`
  query Index {
    extendedGalleryCollection(order: publishDate_DESC, where: {displayHome: true}) {
      items {
        title
        slug
        year
        body
        metaDescription
        summary
        publishDate
        displayHome
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
  `
});


  return {
    props: {
      galleries: data.extendedGalleryCollection.items
    }
  }
}
