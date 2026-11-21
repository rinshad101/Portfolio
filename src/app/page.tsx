import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { GitHub } from '@/components/sections/GitHub'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Terminal } from '@/components/sections/Terminal'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Terminal />
      <GitHub />
      <Contact />
    </>
  )
}
