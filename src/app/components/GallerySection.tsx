"use client"
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import image1 from '@/assets/potrait/rich.jpg'
import image2 from '@/assets/potrait/frd.jpg'
import image3 from '@/assets/potrait/girl side.jpg'
import image4 from '@/assets/potrait/site.jpg'
import image5 from '@/assets/potrait/suit.jpg'
import image6 from '@/assets/potrait/person.jpg'




const images = [
    { src: image1, alt: 'AI-generated abstract art' },
    { src: image2, alt: 'AI-generated landscape' },
    { src: image3, alt: 'AI-generated portrait' },
    { src: image4, alt: 'AI-generated still life' },
    { src: image5, alt: 'AI-generated surreal art' },
    { src: image6, alt: 'AI-generated digital painting' },
]

const GallerySection = () => {
    const [selectedImage, setSelectedImage] = useState<any>(null);

    return (
        <section id="gallery" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-extrabold text-gray-900 text-center mb-12"
                >
                    AI-Generated Art Gallery
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group h-64" // Set height
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                layout="fill" // Correct layout for filling
                                objectFit="cover"
                                className="transition-transform duration-300 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                                <button
                                    onClick={() => setSelectedImage(image)}
                                    className="text-white font-semibold py-2 px-4 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
                    <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            width={800}
                            height={600}
                            objectFit="contain"
                        />
                        <p className="mt-4 text-center text-gray-700">{selectedImage.alt}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default GallerySection;
