module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'downloads.ctfassets.net',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/biography',
        permanent: true,
      },
    ]
  },
}
