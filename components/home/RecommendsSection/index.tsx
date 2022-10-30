import React from 'react'

export const RecommendsSection = () => {
  return (
    <section>
      <figure
        className='flex h-20 rounded-xl overflow-hidden font-bold 
        bg-carbon bg-opacity-60 hover:bg-opacity-40 transition-colors ease duration-300'
      >
        <img
          aria-hidden='false'
          draggable='false'
          loading='lazy'
          src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'
          data-testid='shortcut-image'
          alt=''
        />
        <figcaption>
          <p>Red Hot Chili Peppers</p>
        </figcaption>
      </figure>
    </section>
  )
}
