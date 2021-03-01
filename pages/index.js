import NextLink from 'next/link'

export default function Home() {
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
    </div>
  )
}
