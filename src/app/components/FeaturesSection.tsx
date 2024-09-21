"use client"
import { motion } from 'framer-motion'
import { CameraIcon, FrameIcon, CreditCardIcon, TruckIcon } from 'lucide-react'

const features = [
  {
    icon: CameraIcon,
    title: 'AI Image Generation',
    description: 'Transform your photos into unique AI-generated artworks with just a few clicks.'
  },
  {
    icon: FrameIcon,
    title: 'Framing Options',
    description: 'Choose from a variety of framing styles to perfectly complement your AI art.'
  },
  {
    icon: CreditCardIcon,
    title: 'Secure Payments',
    description: 'Enjoy peace of mind with our secure and encrypted payment system.'
  },
  {
    icon: TruckIcon,
    title: 'Fast Delivery',
    description: 'Receive your custom AI-generated artwork quickly and securely.'
  }
]

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-gray-900 text-center mb-12"
        >
          Our Core Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection