'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Navigation from '@/components/Navigation'
import { ArrowRight, BookOpen, Users, MessageCircle } from 'lucide-react'
import Link from 'next/link'
// 1. Import the Hook
import { useChat } from '@/context/ChatContext'

const philosophicalText = "When a person starts to think: Why am I? Who am I? What am I? And from when am I? Then the person starts to think about God."

export default function Home() {
  // 2. Use the Context Hook instead of local state
  const { setIsOpen } = useChat()
  
  // REMOVED: const [isChatOpen, setIsChatOpen] = useState(false)
  
  const [displayText, setDisplayText] = useState('')
  const [showButton, setShowButton] = useState(false)

  // OPTIMIZED: Use requestAnimationFrame instead of setInterval
  useEffect(() => {
    let currentIndex = 0
    let lastTime = 0
    
    const typeChar = () => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastTime
      
      if (deltaTime >= 50) { // 50ms between characters
        if (currentIndex <= philosophicalText.length) {
          setDisplayText(philosophicalText.slice(0, currentIndex))
          currentIndex++
        } else {
          setShowButton(true)
        }
        lastTime = currentTime
      }
      
      if (currentIndex <= philosophicalText.length) {
        requestAnimationFrame(typeChar)
      }
    }
    
    typeChar()
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />
      
      {/* Hero Section - OPTIMIZED */}
      <section className="h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              The Eternal Quest
            </h1>
            <p className="text-xl md:text-2xl text-slate-300">
              A Global Interfaith Platform for Spiritual Exploration
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-12 min-h-[120px] flex items-center justify-center"
          >
            <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed px-4">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </motion.div>

          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900 transition-all duration-300 px-8 py-3 text-lg"
                onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Begin Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* OPTIMIZED: Use CSS animations instead of JS */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.75s'}}></div>
        <div className="absolute bottom-30 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.15s'}}></div>
      </section>

      {/* Features Section - OPTIMIZED */}
      <section id="explore" className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400">
              Explore Spiritual Knowledge
            </h2>
            <p className="text-xl text-slate-300">
              Deep dive into the world's religious traditions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Link href="/religions">
                <Card className="bg-slate-700 border-slate-600 hover:border-amber-500 transition-all duration-300 h-full cursor-pointer hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-amber-400 flex items-center">
                      <BookOpen className="w-6 h-6 mr-2" />
                      Religions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200 mb-4">
                      Explore major world religions and their beliefs
                    </p>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600">
                      Explore Religions
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link href="/scholars">
                <Card className="bg-slate-700 border-slate-600 hover:border-amber-500 transition-all duration-300 h-full cursor-pointer hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-amber-400 flex items-center">
                      <Users className="w-6 h-6 mr-2" />
                      Scholars
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200 mb-4">
                      Learn from respected teachers and thinkers
                    </p>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600">
                      Browse Scholars
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link href="/community">
                <Card className="bg-slate-700 border-slate-600 hover:border-amber-500 transition-all duration-300 h-full cursor-pointer hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-amber-400 flex items-center">
                      <MessageCircle className="w-6 h-6 mr-2" />
                      Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200 mb-4">
                      Connect with others on spiritual journeys
                    </p>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600">
                      Join Community
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-slate-700 border-slate-600 hover:border-amber-500 transition-all duration-300 h-full cursor-pointer hover:scale-105">
                <CardHeader>
                    <CardTitle className="text-amber-400 flex items-center">
                      AI Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200 mb-4">
                      Get thoughtful answers to spiritual questions
                    </p>
                    <div className="text-sm text-slate-400">
                    </div>
                    {/* 3. Update the button to use the Context Switch */}
                    <Button 
                      className="w-full bg-amber-500 hover:bg-amber-600"
                      onClick={() => setIsOpen(true)}
                    >
                      Ask AI (Widget)
                    </Button>
                  </CardContent>
                </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 4. REMOVED <AIChatWidget /> (It is now in layout.tsx) */}
    </div>
  )
}