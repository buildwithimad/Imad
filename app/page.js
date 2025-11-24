import React from 'react'
import Hero3D from '../components/Home/Hero3D'
import ZoomText from '../components/Home/ZoomText'
import About from '../components/Home/About'
import Projects from '@/components/Home/Projects'
import Experience from '@/components/Home/Experience'
import Testimonials from '@/components/Home/Testimonials'
import Contact from '@/components/Home/Contact'
import Skills from '@/components/Home/Skills'
import Services from '@/components/Home/Services'

const Home = () => {
  return (
    <>
      <Hero3D />
      <ZoomText />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <Services />
      <Contact />
    </>
  )
}

export default Home