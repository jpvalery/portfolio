const title = "Jp Valery - Photographer documenting spaces and people";
const description =
  "Selected shots from a photographer relentlessly documenting and exploring spaces and people.";

const SEO = {
  title,
  description,
  canonical: "https://jpvalery.photo",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://jpvalery.photo",
    title,
    description,
    images: [
      {
        url: "https://jpvalery.photo/static/images/og-banner.jpg",
        alt: title,
      },
    ],
  },
  twitter: {
    handle: "@jpvalery",
    site: "jpvalery.photo",
    cardType: "summary_large_image",
  },
};

export default SEO;
