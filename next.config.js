module.exports = {
  images: {
    domains: ['images.ctfassets.net', 'downloads.ctfassets.net'],
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
