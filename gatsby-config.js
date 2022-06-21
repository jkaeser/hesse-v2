module.exports = {
  siteMetadata: {
    title: `John Kaeser`,
    description: `John Kaeser is a front end web developer based in Philadelphia, PA, USA.`,
    author: `John Kaeser`,
  },
  plugins: [
    `gatsby-alias-imports`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `u7semw1p`,
        dataset: `production`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `john-kaeser`,
        short_name: `jkaeser`,
        start_url: `/`,
        background_color: `#475b5a`,
        theme_color: `#475b5a`,
        display: `minimal-ui`,
        icon: `src/images/triforce.png`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`
  ]
}
