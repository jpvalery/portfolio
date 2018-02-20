require('dotenv').config()

module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

    siteMetadata: {
        title: 'Gatsby Default Starter',
    },
    plugins: [
      'gatsby-plugin-react-helmet',
      {
        resolve: `gatsby-plugin-typography`,
        options: {
            pathToConfigModule: `src/utils/typography.js`,
          },
        },
        {
          resolve: `gatsby-source-contentful`,
          options: {
            spaceId: process.env.CONTENTFUL_SPACE_ID || '',
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
          },
        },
        {
   resolve: `gatsby-transformer-remark`,
   options: {
     plugins: [
       `gatsby-plugin-sharp`,
       {
         resolve: `gatsby-remark-images`,
         options: {
           // It's important to specify the maxWidth (in pixels) of
           // the content container as this plugin uses this as the
           // base for generating different widths of each image.
           maxWidth: 740,
         },
       },
     ],
   },
 },
    ],
};
