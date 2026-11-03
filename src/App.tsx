import { About } from './components/About'
import { Contact } from './components/Contact'
import { FeaturedProject } from './components/FeaturedProject'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LiquidGlassDefs } from './components/LiquidGlass'
import { ProjectGrid } from './components/ProjectGrid'
import { LanguageProvider } from './i18n/LanguageProvider'

export default function App() {
  return (
    <LanguageProvider>
      <LiquidGlassDefs />
      <div className="glow glow--indigo" aria-hidden="true" />
      <div className="glow glow--green" aria-hidden="true" />
      <Header />
      <main id="top">
        <Hero />
        <FeaturedProject />
        <ProjectGrid />
        <About />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
