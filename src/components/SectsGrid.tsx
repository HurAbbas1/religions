'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Users, 
  BookOpen, 
  User, 
  X, 
  Info,
  ChevronRight,
  TreePine,
  ScrollText,
  GraduationCap
} from 'lucide-react'

// Define interfaces locally to ensure type safety within the component
interface Scholar {
  _id: string
  name: string
  era: string
  language: string
  majorWorks: string
  isUniversallyRespected: boolean
}

interface Sect {
  _id: string
  name: string
  description: string
  numberOfFollowers: number
  keyCharacteristics: string
  scholars: Scholar[]
}

interface SectsGridProps {
  religionId?: string
}

export default function SectsGrid({ religionId }: SectsGridProps) {
  const [sects, setSects] = useState<Sect[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedSect, setSelectedSect] = useState<Sect | null>(null)

  useEffect(() => {
    fetchSects()
  }, [religionId]) 

  const fetchSects = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (religionId) params.append('religionId', religionId)
      if (search) params.append('search', search)
      
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
      const response = await fetch(`${baseUrl}/api/sects?${params.toString()}`)
      
      if (!response.ok) throw new Error('Failed to fetch')
      
      const data = await response.json()
      setSects(data)
    } catch (error) {
      console.error('Error fetching sects:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle Search Input (with debounce effect)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSects()
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  const formatFollowers = (num: number) => {
    if (!num) return 'Unknown'
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    return num.toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search sects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-amber-500"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        </div>
      ) : sects.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/50 rounded-lg border border-slate-700 border-dashed">
          <TreePine className="w-12 h-12 mx-auto text-slate-500 mb-3" />
          <p className="text-slate-400">No sects found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sects.map((sect, index) => (
            <motion.div
              key={sect._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-all duration-300 h-full flex flex-col group">
                <CardHeader>
                  <CardTitle 
                    className="text-amber-400 flex justify-between items-start cursor-pointer group-hover:text-amber-300 transition-colors"
                    onClick={() => setSelectedSect(sect)}
                  >
                    <span>{sect.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent 
                  className="flex-1 cursor-pointer"
                  onClick={() => setSelectedSect(sect)}
                >
                  <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                    {sect.description}
                  </p>
                  <div className="flex items-center text-xs text-slate-500 mb-2">
                    <Users className="w-3 h-3 mr-2" />
                    ~{formatFollowers(sect.numberOfFollowers)} followers
                  </div>
                </CardContent>
                <CardFooter className="pt-0 border-t border-slate-700/50 mt-4 p-4">
                  <Button 
                    className="w-full bg-slate-700 hover:bg-amber-500 hover:text-slate-900 text-slate-200 transition-colors group-hover:shadow-lg"
                    onClick={() => setSelectedSect(sect)}
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {selectedSect && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedSect(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedSect.name}</h2>
                  <div className="flex items-center text-slate-400 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    <span>~{formatFollowers(selectedSect.numberOfFollowers)} followers</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedSect(null)} className="rounded-full hover:bg-slate-800">
                  <X className="w-6 h-6 text-slate-400" />
                </Button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="overflow-y-auto p-6 space-y-8">
                
                {/* Description */}
                <div>
                   <h3 className="text-lg font-semibold text-slate-200 mb-2 flex items-center">
                    <ScrollText className="w-5 h-5 mr-2 text-blue-400" />
                    Overview
                  </h3>
                   <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-800">
                     <p className="text-slate-300 leading-relaxed text-base">{selectedSect.description}</p>
                   </div>
                </div>

                {/* Characteristics */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-200 mb-2 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-purple-400" />
                    Key Characteristics
                  </h3>
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700/50">
                    <p className="text-slate-300 leading-relaxed">{selectedSect.keyCharacteristics || "No specific characteristics listed."}</p>
                  </div>
                </div>

                {/* Scholars List */}
                {selectedSect.scholars && selectedSect.scholars.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2 text-amber-400" />
                      Notable Scholars
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {selectedSect.scholars.map((scholar) => (
                        <div key={scholar._id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="bg-slate-700 p-2 rounded-full">
                                <User className="w-4 h-4 text-slate-300" />
                              </div>
                              <div>
                                <p className="font-semibold text-white">{scholar.name}</p>
                                <p className="text-xs text-slate-400">{scholar.era}</p>
                              </div>
                            </div>
                            {scholar.isUniversallyRespected && (
                              <Badge variant="secondary" className="bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                Respected
                              </Badge>
                            )}
                          </div>
                          
                          {scholar.majorWorks && (
                            <div className="mt-2 pl-11">
                               <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Major Works</p>
                               <p className="text-sm text-slate-300 italic">{scholar.majorWorks}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
                <Button 
                  onClick={() => setSelectedSect(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-white"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}