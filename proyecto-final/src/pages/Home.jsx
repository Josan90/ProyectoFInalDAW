import React from 'react'
import { Carrusel } from '../components/Carrusel'
import Recientes from '../components/Recientes'
import Proximamente from '../components/Proximamente'

function Home() {
  return (
    <>
      <Carrusel />
      <Recientes />
      <Proximamente />
    </>
  )
}

export default Home
