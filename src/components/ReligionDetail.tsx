'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Star, 
  Clock, 
  MapPin, 
  User,
  Sparkles,
  TreePine
} from 'lucide-react'

interface Religion {
  id: string
  name: string
  introText: string
  populationPercentage: number
  foundingDate?: string
  founder?: string
  holyBooks: string
  coreBeliefs: string
  sects: Sect[]
  rituals: Ritual[]
}

interface Sect {
  id: string
  name: string
  description: string
  keyCharacteristics: string
  scholars: Scholar[]
}

interface Scholar {
  id: string
  name: string
  era: string
  century: string
  language: string
  isUniversallyRespected: boolean
  majorWorks: string
}

interface Ritual {
  id: string
  title: string
  description: string
  icon: string
  significance: string
  frequency: string
}

export default function ReligionDetail() {
  const params = useParams()
  const [religion, setReligion] = useState<Religion | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSect, setSelectedSect] = useState<Sect | null>(null)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/religions/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setReligion(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching religion:', error)
          setLoading(false)
        })
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (!religion) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Religion not found</h1>
          <p className="text-slate-400">The religion you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-amber-400">
                {religion.name}
              </h1>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-slate-700 text-amber-400">
                {religion.populationPercentage}% of world population
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-slate-300">
              {religion.foundingDate && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <span>Founded: {religion.foundingDate}</span>
                </div>
              )}
              {religion.founder && (
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-amber-500" />
                  <span>Founder: {religion.founder}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-amber-500" />
                <span>~{Math.round(religion.populationPercentage * 0.08)} billion followers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="overview" className="text-white hover:text-amber-400">
              Overview
            </TabsTrigger>
            <TabsTrigger value="sects" className="text-white hover:text-amber-400">
              Sects & Divisions
            </TabsTrigger>
            <TabsTrigger value="rituals" className="text-white hover:text-amber-400">
              Rituals & Practices
            </TabsTrigger>
            <TabsTrigger value="scholars" className="text-white hover:text-amber-400">
              Scholars & Teachers
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-amber-400">Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-200 leading-relaxed text-lg">
                    {religion.introText}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-amber-400 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Holy Books
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200">{religion.holyBooks}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-amber-400 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Core Beliefs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200">{religion.coreBeliefs}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Sects Tab */}
          <TabsContent value="sects" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <h3 className="text-2xl font-bold text-amber-400 mb-6">Sects & Divisions</h3>
                  <div className="space-y-4">
                    {religion.sects.map((sect, index) => (
                      <motion.div
                        key={sect.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card 
                          className={`bg-slate-800 border-slate-700 cursor-pointer transition-all duration-300 hover:border-amber-500 ${
                            selectedSect?.id === sect.id ? 'border-amber-500' : ''
                          }`}
                          onClick={() => setSelectedSect(sect)}
                        >
                          <CardHeader>
                            <CardTitle className="text-lg text-amber-400">
                              {sect.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-300 text-sm line-clamp-3">
                              {sect.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  {selectedSect ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="bg-slate-800 border-slate-700">
                        <CardHeader>
                          <CardTitle className="text-amber-400 flex items-center">
                            <TreePine className="w-5 h-5 mr-2" />
                            {selectedSect.name}
                          </CardTitle>
                          <CardDescription className="text-slate-300">
                            {selectedSect.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold text-amber-400 mb-3">
                              Key Characteristics
                            </h4>
                            <p className="text-slate-200">
                              {selectedSect.keyCharacteristics}
                            </p>
                          </div>

                          <Separator className="bg-slate-700" />

                          <div>
                            <h4 className="text-lg font-semibold text-amber-400 mb-3">
                              Notable Scholars
                            </h4>
                            <div className="space-y-4">
                              {selectedSect.scholars.map((scholar) => (
                                <div key={scholar.id} className="bg-slate-700 rounded-lg p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <h5 className="font-semibold text-white flex items-center">
                                      <User className="w-4 h-4 mr-2" />
                                      {scholar.name}
                                    </h5>
                                    {scholar.isUniversallyRespected && (
                                      <Badge variant="secondary" className="bg-amber-500 text-white">
                                        <Star className="w-3 h-3 mr-1" />
                                        Respected
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-slate-300 space-y-1">
                                    <p className="flex items-center">
                                      <Clock className="w-3 h-3 mr-2" />
                                      {scholar.era}
                                    </p>
                                    <p className="flex items-center">
                                      <MapPin className="w-3 h-3 mr-2" />
                                      {scholar.language}
                                    </p>
                                    <p className="mt-2 text-slate-200">
                                      <strong>Major Works:</strong> {scholar.majorWorks}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : (
                    <Card className="bg-slate-800 border-slate-700">
                      <CardContent className="flex items-center justify-center h-64">
                        <div className="text-center text-slate-400">
                          <TreePine className="w-12 h-12 mx-auto mb-4" />
                          <p>Select a sect to view detailed information</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Rituals Tab */}
          <TabsContent value="rituals" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-amber-400 mb-6">Rituals & Practices</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {religion.rituals.map((ritual, index) => (
                  <motion.div
                    key={ritual.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-colors duration-300">
                      <CardHeader>
                        <CardTitle className="text-amber-400 flex items-center">
                          <span className="text-2xl mr-3">{ritual.icon}</span>
                          {ritual.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-200">{ritual.description}</p>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-slate-300">
                            <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                            <span className="font-semibold">Significance:</span>
                          </div>
                          <p className="text-slate-200 ml-6">{ritual.significance}</p>
                          
                          <div className="flex items-center text-slate-300">
                            <Clock className="w-4 h-4 mr-2 text-amber-500" />
                            <span className="font-semibold">Frequency:</span>
                          </div>
                          <p className="text-slate-200 ml-6">{ritual.frequency}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Scholars Tab */}
          <TabsContent value="scholars" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-amber-400 mb-6">Scholars & Teachers</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {religion.sects.flatMap(sect => sect.scholars).map((scholar, index) => (
                  <motion.div
                    key={scholar.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-colors duration-300">
                      <CardHeader>
                        <CardTitle className="text-amber-400 flex items-center justify-between">
                          <span className="flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            {scholar.name}
                          </span>
                          {scholar.isUniversallyRespected && (
                            <Star className="w-5 h-5 text-amber-500" />
                          )}
                        </CardTitle>
                        <CardDescription className="text-slate-300">
                          {scholar.era} • {scholar.language}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-amber-400 mb-1">Century:</p>
                            <p className="text-slate-200">{scholar.century}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-amber-400 mb-1">Major Works:</p>
                            <p className="text-slate-200 text-sm">{scholar.majorWorks}</p>
                          </div>
                          {scholar.isUniversallyRespected && (
                            <Badge variant="secondary" className="bg-amber-500 text-white">
                              Universally Respected
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}