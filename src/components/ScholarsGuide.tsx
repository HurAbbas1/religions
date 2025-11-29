'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, User, Star, Clock, BookOpen, X } from 'lucide-react'

interface Scholar {
  id: string
  name: string
  era: string
  century: string
  language: string
  isUniversallyRespected: boolean
  majorWorks: string
  sect: {
    name: string
    religion: {
      name: string
    }
  }
}

const religions = [
  'All',
  'Christianity',
  'Islam',
  'Hinduism',
  'Buddhism',
  'Sikhism',
  'Judaism',
  'Baháʼí Faith',
  'Jainism',
  'Shinto'
]

const centuries = [
  'All',
  'Ancient (BCE)',
  '1st-5th century',
  '6th-10th century',
  '11th-15th century',
  '16th-20th century',
  '21st century'
]

const languages = [
  'All',
  'Arabic',
  'Sanskrit',
  'Pali',
  'Latin',
  'Greek',
  'Hebrew',
  'Persian',
  'Chinese',
  'Japanese',
  'German',
  'English'
]

export default function ScholarsGuide() {
  const [scholars, setScholars] = useState<Scholar[]>([])
  const [filteredScholars, setFilteredScholars] = useState<Scholar[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReligion, setSelectedReligion] = useState('All')
  const [selectedCentury, setSelectedCentury] = useState('All')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchScholars()
  }, [])

  useEffect(() => {
    filterScholars()
  }, [scholars, searchTerm, selectedReligion, selectedCentury, selectedLanguage])

  const fetchScholars = async () => {
    try {
      const response = await fetch('/api/scholars')
      const data = await response.json()
      setScholars(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching scholars:', error)
      setLoading(false)
    }
  }

  const filterScholars = () => {
    let filtered = scholars

    if (searchTerm) {
      filtered = filtered.filter(scholar =>
        scholar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholar.majorWorks.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedReligion !== 'All') {
      filtered = filtered.filter(scholar =>
        scholar.sect.religion.name === selectedReligion
      )
    }

    if (selectedCentury !== 'All') {
      filtered = filtered.filter(scholar =>
        scholar.century.includes(selectedCentury.replace('All', ''))
      )
    }

    if (selectedLanguage !== 'All') {
      filtered = filtered.filter(scholar =>
        scholar.language === selectedLanguage
      )
    }

    setFilteredScholars(filtered)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedReligion('All')
    setSelectedCentury('All')
    setSelectedLanguage('All')
  }

  const activeFiltersCount = [
    selectedReligion !== 'All',
    selectedCentury !== 'All',
    selectedLanguage !== 'All',
    searchTerm !== ''
  ].filter(Boolean).length

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
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
            <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">
              Scholars & Source Guide
            </h1>
            <p className="text-xl text-slate-300">
              Discover respected teachers and authentic sources from various religious traditions
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search scholars by name or works..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-amber-500"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-slate-700 text-white hover:bg-slate-800"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-amber-500 text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800 rounded-lg p-6 border border-slate-700"
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Religion
                  </label>
                  <Select value={selectedReligion} onValueChange={setSelectedReligion}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {religions.map((religion) => (
                        <SelectItem key={religion} value={religion} className="text-white">
                          {religion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Time Period
                  </label>
                  <Select value={selectedCentury} onValueChange={setSelectedCentury}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {centuries.map((century) => (
                        <SelectItem key={century} value={century} className="text-white">
                          {century}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Language
                  </label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {languages.map((language) => (
                        <SelectItem key={language} value={language} className="text-white">
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Count */}
          <div className="text-slate-300">
            Found {filteredScholars.length} scholar{filteredScholars.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Scholars Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {filteredScholars.map((scholar, index) => (
            <motion.div
              key={scholar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-all duration-300">
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
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{scholar.era}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm mt-1">
                      <span className="text-amber-500">{scholar.language}</span>
                      <span>•</span>
                      <span>{scholar.sect.religion.name}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-amber-400 mb-1">Tradition:</p>
                    <p className="text-slate-200">{scholar.sect.name}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-amber-400 mb-1 flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Major Works:
                    </p>
                    <p className="text-slate-200 text-sm line-clamp-3">
                      {scholar.majorWorks}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {scholar.century}
                    </Badge>
                    {scholar.isUniversallyRespected && (
                      <Badge variant="secondary" className="bg-amber-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Respected
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredScholars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <User className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">
              No scholars found
            </h3>
            <p className="text-slate-500">
              Try adjusting your filters or search terms
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}