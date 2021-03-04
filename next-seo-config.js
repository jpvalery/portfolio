const title = 'Jp Valery - Photographer documenting spaces and people'
const description =
  'Selected shots from a photographer relentlessly documenting and exploring spaces and people.'
const siteUrl = "https://jpvalery.photo"

const SEO = {
  title: title,
  description: description,
  canonical: siteUrl,
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    title: title,
    description: description,
    images: [
      {
        url: 'https://jpvalery.photo/static/og-banner.jpg',
        width: 1920,
        height: 1280,
        alt: 'Open Graph Image',
      },
    ],
  },
  twitter: {
    handle: "@jpvalery",
    site: siteUrl,
    cardType: "summary_large_image",
  },
};

export default SEO;
