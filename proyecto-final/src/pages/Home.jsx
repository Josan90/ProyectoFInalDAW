import React from 'react'
import { CarouselDefault } from '../components/Carrusel'
import Recientes from '../components/Recientes'
import Proximamente from '../components/Proximamente'

function Home() {
  return (
    <>
      <CarouselDefault />
      <Recientes />
      <Proximamente />
    </>
  )
}

export default Home
