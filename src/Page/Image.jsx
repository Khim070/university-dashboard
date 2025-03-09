import React from 'react'
import Aside from '../Component/Home/Aside'
import ImageContent from '../Component/Images/ImageContent'

const Image = () => {
  return (
    <div className='bg-white'>
        <div id="main-wrapper" class=" flex">
            <Aside/>
            <ImageContent/>
		  </div>
    </div>
  )
}

export default Image