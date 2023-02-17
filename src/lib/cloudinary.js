const { Cloudinary } = require("@cloudinary/url-gen")

const cld = new Cloudinary({
    cloud: {
      cloudName: 'dlgjwkjte'
    },
    url: {
      secure: true
    }
})
  
export const buildImage = (src) => {
    return cld.image(src).quality('auto').format('auto')
}

//   const ImageUrl = cld.image(product.image.public_id).quality('auto').format('auto').resize('w_900,h_900').toURL()
  