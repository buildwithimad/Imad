import React from 'react'
import Hero3D from '../components/Home/Hero3D'
import ZoomText from '../components/Home/ZoomText'
import About from '../components/Home/About'
import Projects from '@/components/Home/Projects'
import Experience from '@/components/Home/Experience'

const Home = () => {
  return (
    <>
    <Hero3D/>
    <ZoomText/>
    <About/>
    <Experience/>
    <Projects/>
    </>
  )
}

export default Home