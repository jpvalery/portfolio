require('dotenv').config()

module.exports = {
    pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

    siteMetadata: {
        title: 'Gatsby Default Starter',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-netlify`,
        'gatsby-plugin-catch-links',
        'gatsby-image',
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-plugin-nprogress`,
            options: {
                // Setting a color is optional.
                color: `tomato`,
                // Disable the loading spinner.
                showSpinner: false,
            },
        },
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
