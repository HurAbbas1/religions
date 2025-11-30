'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Navigation from '@/components/Navigation'
import AIChatWidget from '@/components/AIChatWidget'
import BooksGrid from '@/components/BooksGrid'
import VideosGrid from '@/components/VideosGrid'
import PracticeGrid from '@/components/PracticeGrid'
import SectsGrid from '@/components/SectsGrid'
import { ArrowLeft, Search, BookOpen, Play, Users, Target, Calendar } from 'lucide-react'
import Link from 'next/link'

interface Religion {
  _id: string
  name: string
  description: string
  introText: string
  foundingDate?: string
  founder?: string
  populationPercentage: number
  currentFollowers: number
  origin: {
    country: string
    region: string
    continent: string
  }
  keyBeliefs: string[]
  corePrinciples: string[]
  sacredTexts: Array<{
    title: string
    author: string
    language: string
    approximateDate: string
    description: string
  }>
  holyBooks: string[]
  sects: Array<{
    _id: string
    name: string
    description: string
    numberOfFollowers: number
  }>
  scholars: Array<{
    _id: string
    name: string
    era: string
    isUniversallyRespected: boolean
  }>
  books: Array<{
    _id: string
    title: string
    author: string
    rating: number
  }>
  videos: Array<{
    _id: string
    title: string
    youtubeId: string
    rating: number
  }>
  practices: Array<{
    _id: string
    title: string
    category: string
    rating: number
  }>
  festivals: Array<{
    name: string
    description: string
    date: string
    significance: string
  }>
  symbols: Array<{
    name: string
    description: string
    image: string
    meaning: string
  }>
  images: string[]
  tags: string[]
}

export default function EnhancedReligionsPage() {
  const [religions, setReligions] = useState<Religion[]>([])
  const [selectedReligion, setSelectedReligion] = useState<Religion | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchReligions()
  }, [])

  const fetchReligions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/religions?limit=20')
      const data = await response.json()
      setReligions(data.religions || [])
    } catch (error) {
      console.error('Error fetching religions:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchReligionDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/religions/${id}`)
      const data = await response.json()
      setSelectedReligion(data)
    } catch (error) {
      console.error('Error fetching religion details:', error)
    }
  }

  const filteredReligions = religions.filter(religion =>
    (religion.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (religion.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (religion.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000000) {
      return `${(followers / 1000000000).toFixed(1)}B`
    } else if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`
    }
    return followers.toString()
  }

  if (selectedReligion) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <Navigation />
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <Button
              onClick={() => setSelectedReligion(null)}
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
                <span>~{formatFollowers(selectedReligion.currentFollowers)} followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-amber-500">
                Overview
              </TabsTrigger>
              <TabsTrigger value="books" className="text-white data-[state=active]:bg-amber-500">
                Books ({selectedReligion.books?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="videos" className="text-white data-[state=active]:bg-amber-500">
                Videos ({selectedReligion.videos?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="practices" className="text-white data-[state=active]:bg-amber-500">
                Practices ({selectedReligion.practices?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="sects" className="text-white data-[state=active]:bg-amber-500">
                Sects ({selectedReligion.sects?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-amber-400">Introduction</CardTitle>
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
                      <CardTitle className="text-amber-400">Key Beliefs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedReligion.keyBeliefs.map((belief, index) => (
                          <li key={index} className="text-slate-200 flex items-start">
                            <span className="text-amber-400 mr-2">•</span>
                            {belief}
                          </li>
                        ))}
                      </ul>
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
                    <CardTitle className="text-amber-400">Sacred Texts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedReligion.sacredTexts.map((text, index) => (
                        <div key={index} className="border-l-4 border-amber-500 pl-4">
                          <h4 className="text-amber-400 font-semibold mb-1">{text.title}</h4>
                          <p className="text-slate-300 text-sm mb-1">
                            <span className="text-slate-400">Author:</span> {text.author} | 
                            <span className="text-slate-400"> Language:</span> {text.language} | 
                            <span className="text-slate-400"> Date:</span> {text.approximateDate}
                          </p>
                          <p className="text-slate-200">{text.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {selectedReligion.festivals && selectedReligion.festivals.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-8"
                >
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-amber-400">Major Festivals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedReligion.festivals.map((festival, index) => (
                          <div key={index} className="bg-slate-700 p-4 rounded-lg">
                            <h4 className="text-amber-400 font-semibold mb-2">{festival.name}</h4>
                            <p className="text-slate-300 text-sm mb-1">
                              <span className="text-slate-400">Date:</span> {festival.date}
                            </p>
                            <p className="text-slate-200 text-sm">{festival.significance}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="books" className="mt-6">
              <BooksGrid religionId={selectedReligion._id} showFilters={true} />
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <VideosGrid religionId={selectedReligion._id} showFilters={true} />
            </TabsContent>

            <TabsContent value="practices" className="mt-6">
              <PracticeGrid religionId={selectedReligion._id} showFilters={true} />
            </TabsContent>

            <TabsContent value="sects" className="mt-6">
                {/* The SectsGrid component now handles fetching and displaying the sects. 
                  We just need to pass the religion ID. */}
                 <SectsGrid religionId={selectedReligion._id} />
            </TabsContent>
          </Tabs>
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
                key={String(religion._id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-all duration-300 h-full cursor-pointer hover:scale-105"
                  onClick={() => fetchReligionDetails(religion._id)}
                >
                  <CardHeader>
                    <CardTitle className="text-amber-400">{religion.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200 text-sm line-clamp-4 mb-4">
                      {religion.introText}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-slate-500 text-slate-300">
                        {religion.populationPercentage}% of world population
                      </Badge>
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                        Explore
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