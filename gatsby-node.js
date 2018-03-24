const path = require('path')

exports.createPages = ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators
    return new Promise((resolve, reject) => {
        const galleryPostTemplate = path.resolve('src/templates/gallery.js')
        resolve(
            graphql(`
                {
                    allContentfulGallery (limit:100) {
                        edges {
                            node {
                                id
                                slug
                            }
                        }
                    }
                }
            `).then((result) => {
                if (result.errors) {
                    reject(result.errors)
                }
                result.data.allContentfulGallery.edges.forEach((edge) => {
                    createPage ({
                        path: edge.node.slug,
                        component: galleryPostTemplate,
                        context: {
                            slug: edge.node.slug
                        }
                    })
                })
                return
            })
        )
        const blogPostTemplate = path.resolve('src/templates/post.js')
        resolve(
            graphql(`
                {
                    allContentfulBlog (limit:100) {
                        edges {
                            node {
                                id
                                slug
                            }
                        }
                    }
                }
            `).then((result) => {
                if (result.errors) {
                    reject(result.errors)
                }
                result.data.allContentfulBlog.edges.forEach((edge) => {
                    createPage ({
                        path: "/blog/" + edge.node.slug,
                        component: blogPostTemplate,
                        context: {
                            slug: edge.node.slug
                        }
                    })
                })
                return
            })
        )
    })
}
