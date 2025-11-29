'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation'
import AIChatWidget from '@/components/AIChatWidget'
import { ArrowLeft, Search, BookOpen, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

interface Religion {
  id: string
  name: string
  introText: string
  populationPercentage: number
  foundingDate?: string
  founder?: string
  holyBooks: string
  coreBeliefs: string
}

export default function ReligionsPage() {
  const [religions, setReligions] = useState<Religion[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReligion, setSelectedReligion] = useState<Religion | null>(null)

  useEffect(() => {
    // Simple mock data to avoid API call issues
    const mockReligions: Religion[] = [
      {
        id: '1',
        name: 'Christianity',
        introText: 'Christianity is an Abrahamic monotheistic religion based on the life and teachings of Jesus Christ of Nazareth.',
        populationPercentage: 31.2,
        foundingDate: 'c. 30 CE',
        founder: 'Jesus Christ',
        holyBooks: 'Bible (Old Testament, New Testament)',
        coreBeliefs: 'Belief in one God, Jesus as the Son of God, resurrection, salvation through faith'
      },
      {
        id: '2',
        name: 'Islam',
        introText: 'Islam is an Abrahamic monotheistic religion teaching that there is only one God (Allah) and that Muhammad is the messenger of God.',
        populationPercentage: 24.1,
        foundingDate: '7th century CE',
        founder: 'Prophet Muhammad',
        holyBooks: 'Quran (primary), Hadith, Sunnah',
        coreBeliefs: 'Belief in one God (Allah), angels, revealed books, prophets, Day of Judgment, predestination'
      },
      {
        id: '3',
        name: 'Hinduism',
        introText: 'Hinduism is an Indian religion and dharma, or way of life, widely practiced in the Indian subcontinent.',
        populationPercentage: 15.1,
        foundingDate: 'c. 2000 BCE',
        founder: 'No single founder (diverse origins)',
        holyBooks: 'Vedas, Upanishads, Puranas, Mahabharata, Ramayana, Bhagavad Gita',
        coreBeliefs: 'Dharma, karma, moksha, samsara, various deities as manifestations of Brahman'
      }
    ]
    
    setReligions(mockReligions)
    setLoading(false)
  }, [])

  const filteredReligions = religions.filter(religion =>
    religion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    religion.introText.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleReligionClick = (religion: Religion) => {
    setSelectedReligion(religion)
  }

  const handleBack = () => {
    setSelectedReligion(null)
  }

  if (selectedReligion) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <Navigation />
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <Button
              onClick={handleBack}
              className="mb-6 bg-amber-500 hover:bg-amber-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Religions
            </Button>
            
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-amber-400">
                {selectedReligion.name}
              </h1>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-slate-700 text-amber-400">
                {selectedReligion.populationPercentage}% of world population
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-slate-300">
              {selectedReligion.foundingDate && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <span>Founded: {selectedReligion.foundingDate}</span>
                </div>
              )}
              {selectedReligion.founder && (
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-amber-500" />
                  <span>Founder: {selectedReligion.founder}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-amber-500" />
                <span>~{Math.round(selectedReligion.populationPercentage * 0.08)} billion followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Introduction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedReligion.introText}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-amber-400">Holy Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-200">{selectedReligion.holyBooks}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400">Core Beliefs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-200">{selectedReligion.coreBeliefs}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <AIChatWidget />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">
              World Religions
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Explore diverse spiritual traditions that shape humanity
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search religions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-amber-500"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Religions Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReligions.map((religion, index) => (
              <motion.div
                key={religion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-all duration-300 cursor-pointer hover:scale-105 h-full"
                  onClick={() => handleReligionClick(religion)}
                >
                  <CardHeader>
                    <CardTitle className="text-amber-400">{religion.name}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {religion.populationPercentage}% of world population
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200 text-sm line-clamp-4 mb-4">
                      {religion.introText}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        ~{Math.round(religion.populationPercentage * 0.08)}B followers
                      </Badge>
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {filteredReligions.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">
              No religions found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search terms
            </p>
          </motion.div>
        )}
      </div>
      
      <AIChatWidget />
    </div>
  )
}