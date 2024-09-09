import React from 'react'
import boxing from '../../assets/images/boxing-play.gif'

function Home() {
  return (
    <div>
      <div className='w-full flex align-middle justify-center bg-blue-100'>
        <img src={boxing} alt='boxing-gif'/>
      </div>
    </div>
  )
}

export default Home