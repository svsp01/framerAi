"use client"
import { motion } from 'framer-motion'

const pricingPlans = [
  {
    name: 'Basic',
    price: 9.99,
    features: [
      '10 AI-generated images per month',
      'Basic framing options',
      'Email support'
    ],
    cta: 'Start Free Trial'
  },
  {
    name: 'Pro',
    price: 19.99,
    features: [
      '50 AI-generated images per month',
      'Advanced framing options',
      'Priority email support',
      'Access to exclusive styles'
    ],
    cta: 'Get Started',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 49.99,
    features: [
      'Unlimited AI-generated images',
      'Custom framing options',
      '24/7 phone and email support',
      'API access for integration'
    ],
    cta: 'Contact Sales'
  }
]

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-transparent font-mono bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-center mb-12"
        >
          Choose Your Plan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-br from-purple-500 to-blue-400 p-8 rounded-lg shadow-lg text-white ${
                plan.popular ? ' border-blue-500 border-4' : ''
              }`}
            >
              {plan.popular && (
                <span className="bg-blue-500 text-black text-xs font-semibold py-1 px-3 rounded-full uppercase absolute -top-3 right-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">${plan.price}<span className="text-lg font-normal text-gray-200">/month</span></p>
              <ul className="mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-300 ${
                plan.popular ? 'bg-gradient-to-r border from-purple-700 to-blue-600' : 'bg-gradient-to-r border from-purple-700 to-blue-600'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection