'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  Flame,
  Wind,
  Activity,
  BookOpen,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
  Info
} from 'lucide-react'

interface Practice {
  _id: string
  title: string
  description: string
  instructions: string
  benefits: string[]
  category: string
  difficulty: string
  duration?: string
  image?: string
  rating: number
  religionId: {
    _id: string
    name: string
  }
  sectId?: {
    _id: string
    name: string
  }
}

interface PracticeGridProps {
  religionId?: string
  showFilters?: boolean
}

export default function PracticeGrid({ religionId, showFilters = true }: PracticeGridProps) {
  const [practices, setPractices] = useState<Practice[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [sortOrder, setSortOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)
  
  // New state to track the currently viewed practice
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null)

  const categories = [
    'meditation',
    'prayer',
    'chanting',
    'ritual',
    'breathing',
    'movement',
    'contemplation'
  ]

  const difficulties = ['beginner', 'intermediate', 'advanced']

  useEffect(() => {
    fetchPractices(1)
  }, [religionId])

  const fetchPractices = async (pageNum = 1) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: '12',
        search,
        ...(category !== 'all' && { category }),
        ...(difficulty !== 'all' && { difficulty }),
        sortBy,
        sortOrder,
        ...(religionId && { religion: religionId })
      })
      
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
      const url = new URL('/api/practices', baseUrl);
      url.search = params.toString();

      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json()
      
      setPractices(data.practices || [])
      setPagination(data.pagination)
      setPage(pageNum)
    } catch (error) {
      console.error('Error fetching practices:', error)
      setPractices([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    fetchPractices(1)
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setDifficulty('all')
    setSortBy('rating')
    setSortOrder('desc')
    fetchPractices(1)
  }

  const loadMore = () => {
    if (pagination?.hasNext) {
      fetchPractices(page + 1)
    }
  }

  const getCategoryMeta = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'meditation': return { color: 'bg-indigo-500', icon: <Sparkles className="w-4 h-4" /> }
      case 'prayer': return { color: 'bg-blue-500', icon: <BookOpen className="w-4 h-4" /> }
      case 'chanting': return { color: 'bg-rose-500', icon: <Wind className="w-4 h-4" /> }
      case 'ritual': return { color: 'bg-purple-500', icon: <Flame className="w-4 h-4" /> }
      case 'breathing': return { color: 'bg-cyan-500', icon: <Wind className="w-4 h-4" /> }
      case 'movement': return { color: 'bg-orange-500', icon: <Activity className="w-4 h-4" /> }
      default: return { color: 'bg-slate-500', icon: <Star className="w-4 h-4" /> }
    }
  }

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'text-green-400 border-green-400'
      case 'intermediate': return 'text-yellow-400 border-yellow-400'
      case 'advanced': return 'text-red-400 border-red-400'
      default: return 'text-slate-400 border-slate-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      {showFilters && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Find Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                placeholder="Search practices, benefits..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
              
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all" className="text-white">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all" className="text-white">All Levels</SelectItem>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff} value={diff} className="text-white">
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="rating" className="text-white">Rating</SelectItem>
                  <SelectItem value="title" className="text-white">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button onClick={applyFilters} className="bg-amber-500 hover:bg-amber-600">
                <Search className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
              <Button onClick={clearFilters} variant="outline" className="border-slate-600 text-white">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Practices Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      ) : practices.length === 0 ? (
        <div className="text-center py-16">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">
            No practices found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search terms or filters
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practices.map((practice, index) => {
            const catMeta = getCategoryMeta(practice.category);
            
            return (
              <motion.div
                key={practice._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-all duration-300 h-full flex flex-col group overflow-hidden">
                  
                  {/* Card Image / Header Area */}
                  <div className="relative h-48 bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setSelectedPractice(practice)}>
                     {practice.image ? (
                        <img 
                          src={practice.image} 
                          alt={practice.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                     ) : (
                        <div className={`w-full h-full ${catMeta.color} bg-opacity-10 flex flex-col items-center justify-center`}>
                           <div className={`text-white p-4 rounded-full ${catMeta.color} bg-opacity-20`}>
                             <div className="scale-150 transform">
                                {catMeta.icon}
                             </div>
                           </div>
                        </div>
                     )}
                     
                     <div className="absolute top-4 right-4">
                        <Badge variant="outline" className={`${getDifficultyColor(practice.difficulty)} bg-slate-900/80 backdrop-blur-sm`}>
                          {practice.difficulty}
                        </Badge>
                     </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                           <Badge className={`${catMeta.color} text-white hover:${catMeta.color}`}>
                              <span className="mr-1">{catMeta.icon}</span>
                              {practice.category}
                           </Badge>
                           {practice.duration && (
                             <span className="text-xs text-slate-400 flex items-center">
                               <Clock className="w-3 h-3 mr-1" />
                               {practice.duration}
                             </span>
                           )}
                        </div>
                        <CardTitle 
                          className="text-xl text-slate-100 group-hover:text-amber-400 transition-colors cursor-pointer"
                          onClick={() => setSelectedPractice(practice)}
                        >
                          {practice.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                      {practice.description}
                    </p>

                    {practice.benefits && practice.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {practice.benefits.slice(0, 3).map((benefit, i) => (
                          <span key={i} className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded">
                            {benefit}
                          </span>
                        ))}
                        {practice.benefits.length > 3 && (
                          <span className="text-xs text-slate-500 px-1 py-1">+ {practice.benefits.length - 3} more</span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4 text-xs text-slate-500 mt-2">
                         {practice.religionId && (
                           <span>{practice.religionId.name}</span>
                         )}
                         {practice.rating > 0 && (
                           <div className="flex items-center text-amber-400">
                             <Star className="w-3 h-3 mr-1 fill-current" />
                             {practice.rating.toFixed(1)}
                           </div>
                         )}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0 border-t border-slate-700/50 mt-4 p-4">
                    <Button 
                      className="w-full bg-slate-700 hover:bg-amber-500 hover:text-slate-900 text-slate-200 transition-colors group-hover:shadow-lg"
                      onClick={() => setSelectedPractice(practice)}
                    >
                      Start Practice
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination && !loading && (
        <div className="flex items-center justify-between mt-8">
          <Button
            onClick={() => fetchPractices(page - 1)}
            disabled={!pagination.hasPrev}
            variant="outline"
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <span className="text-slate-400 text-sm">
            Page {pagination.page} of {pagination.pages}
          </span>
          
          <Button
            onClick={loadMore}
            disabled={!pagination.hasNext}
            variant="outline"
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* PRACTICE DETAILS MODAL */}
      <AnimatePresence>
        {selectedPractice && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedPractice(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
                <div>
                   <div className="flex items-center space-x-3 mb-2">
                      <Badge className={`${getCategoryMeta(selectedPractice.category).color} text-white`}>
                        {selectedPractice.category}
                      </Badge>
                      <Badge variant="outline" className={`${getDifficultyColor(selectedPractice.difficulty)}`}>
                        {selectedPractice.difficulty}
                      </Badge>
                   </div>
                   <h2 className="text-2xl font-bold text-white">{selectedPractice.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedPractice(null)}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="overflow-y-auto p-6 space-y-8">
                
                {/* Image if available */}
                {selectedPractice.image && (
                  <div className="w-full h-64 rounded-lg overflow-hidden">
                    <img 
                      src={selectedPractice.image} 
                      alt={selectedPractice.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-200 mb-2 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-400" />
                    Overview
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {selectedPractice.description}
                  </p>
                </div>

                {/* Benefits */}
                {selectedPractice.benefits && selectedPractice.benefits.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />
                      Benefits
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedPractice.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                          <span className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                          <span className="text-slate-300 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* INSTRUCTIONS - Core Content */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold text-amber-400 mb-4 flex items-center border-b border-slate-700 pb-3">
                    <BookOpen className="w-6 h-6 mr-3" />
                    Practice Instructions
                  </h3>
                  
                  {/* Rendering instructions with formatting */}
                  <div className="prose prose-invert max-w-none text-slate-300">
                    <div className="whitespace-pre-wrap leading-loose text-base font-light">
                      {selectedPractice.instructions}
                    </div>
                  </div>
                </div>

                {/* Meta Footer */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pt-4 border-t border-slate-800">
                  {selectedPractice.duration && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Duration: <span className="text-slate-300 ml-1">{selectedPractice.duration}</span>
                    </div>
                  )}
                  {selectedPractice.religionId && (
                    <div className="flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Religion: <span className="text-slate-300 ml-1">{selectedPractice.religionId.name}</span>
                    </div>
                  )}
                  {selectedPractice.rating > 0 && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      Rating: <span className="text-slate-300 ml-1">{selectedPractice.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

              </div>
              
              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
                <Button 
                  onClick={() => setSelectedPractice(null)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                >
                  Close Practice
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}