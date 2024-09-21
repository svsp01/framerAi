"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { LogIn, LogsIcon } from 'lucide-react'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    const router = useRouter();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed w-full z-50 shadow-lg transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'text-white bg-transparent'}`}>
            <div className=" px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-text">
                            Framer.ai
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {['Home', 'Features', 'Gallery', 'Pricing'].map((item) => (
                                    <Link
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className={`${isScrolled ? "text-gray-900" : "text-white"} gray-900 px-3 py-2 rounded-md text-sm font-medium`}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="ml-4">
                            <Button onClick={() => router.push('/login')} className="flex gap-2 bg-gradient-to-r  from-blue-600  to-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                Sign Up Now
                                <LogsIcon className='w-4 h-4 animate-pulse'/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar