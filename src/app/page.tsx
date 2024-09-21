import Head from 'next/head'
import Navbar from './components/Navbar'
import HeroSection from './components/HerosSection'
import FeaturesSection from './components/FeaturesSection'
import GallerySection from './components/GallerySection'
import TestimonialsSection from './components/TestimonialsSection'
import PricingSection from './components/PricingSection'
// import SignupSection from './components/SignupSectio'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>AI Image Generation & Framing | Transform Your Photos</title>
        <meta name="description" content="Transform your photos into custom AI art with our cutting-edge image generation and framing service." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <GallerySection />
        <TestimonialsSection />
        <PricingSection />
        {/* <SignupSection /> */}
      </main>

      <Footer />
    </div>
  )
}