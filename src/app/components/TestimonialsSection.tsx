"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import image1 from '@/assets/potrait/girl side.jpg'
import image2 from '@/assets/potrait/girl side.jpg'
import image3 from '@/assets/potrait/girl side.jpg'


const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Graphic Designer',
        image: image1,
        quote: 'The AI-generated artwork has completely transformed my design process. Its like having an infinite source of inspiration at my fingertips!'
    },
    {
        name: 'Mike Chen',
        role: 'Art Enthusiast',
        image: image1,
        quote: 'Ive never seen anything like this before. The quality of the AI-generated art is simply mind-blowing. Its opened up a whole new world of possibilities for me.'
    },
    {
        name: 'Emily Rodriguez',
        role: 'Professional Photographer',
        image: image1,
        quote: 'As a photographer, I was skeptical at first. But the AI has become an invaluable tool in my creative process, helping me push boundaries I never thought possible.'
    }
]

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section id="testimonials" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-extrabold text-gray-900 text-center mb-12"
                >
                    What Our Customers Say
                </motion.h2>
                <div className="relative h-64 sm:h-80">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: index === currentIndex ? 1 : 0, x: index === currentIndex ? 0 : 50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                width={80}
                                height={80}
                                className="rounded-full mb-4"
                            />
                            <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`h-3 w-3 rounded-full mx-2 ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection