"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import logo from '@/assets/potrait/suit.jpg';
import { TypeAnimation } from "react-type-animation";
import { useRouter } from 'next/navigation';
import { MagicWandIcon } from '@radix-ui/react-icons';

const HeroSection = () => {
  const router = useRouter(); // Corrected the use of `useRouter`

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src={logo}
        alt="AI-generated artwork"
        fill // This replaces `layout="fill"`
        style={{ objectFit: "cover" }} // Replaces `objectFit="cover"`
        quality={100}
        priority
      />
      <div className="relative z-10 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-text md:text-6xl font-bold mb-4"
        >
          Transform Your Photos Into Custom AI Art
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-1 rounded-lg shadow-lg">
            <div className="bg-white rounded-lg p-4 min-h-[120px] flex flex-col justify-between relative">
              <TypeAnimation
                sequence={[
                  "Enter your AI prompt to generate images...",
                  2000,
                  "",
                  1000,
                  "What creative image would you like today?",
                  2000,
                  "",
                  1000,
                ]}
                wrapper="p"
                cursor={true}
                repeat={Infinity}
                speed={60}
                deletionSpeed={50}
                className="text-gray-600 font-mono text-lg mb-4"
              />
              {/* Generate Button in bottom-right */}
              <button 
                onClick={() => router.push('/login')} // Fixed the onClick function
                className="absolute bottom-4 right-4 px-4 py-2 flex gap-2 items-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white rounded-md shadow-md hover:bg-purple-700 focus:outline-none"
              >
                <MagicWandIcon className='w-4 h-4 animate-pulse'/>
                Generate Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
