import React from 'react'
import ImageHeader from './imageHeader'
import ImageBody from './ImageBody'

const ImageContent = () => {
  return (
    <div class=" w-full page-wrapper overflow-hidden">
      <ImageHeader />
      <ImageBody/>
    </div>
  )
}

export default ImageContent