module.exports = {
  images: {
    domains: ['images.ctfassets.net', 'images.ctfassets.net'],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/biography',
        permanent: true,
      },
    ]
  }
}
