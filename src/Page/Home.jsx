import React from 'react'
import Aside from '../Component/Home/Aside'
import Content from '../Component/Home/Content'

const Home = () => {
  return (
    <div className='bg-white'>
        <div id="main-wrapper" class=" flex">
            <Aside/>
            <Content/>
		  </div>
    </div>
  )
}

export default Home