'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Play, 
  ExternalLink, 
  Star, 
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye
} from 'lucide-react'

interface Video {
  _id: string
  title: string
  description: string
  youtubeId: string
  duration: string
  thumbnail: string
  channel: string
  channelUrl: string
  views: number
  category: string
  language: string
  difficulty: string
  tags: string[]
  rating: number
  religionId: {
    _id: string
    name: string
  }
  sectId?: {
    _id: string
    name: string
  }
  scholarId?: {
    _id: string
    name: string
  }
}

interface VideosGridProps {
  religionId?: string
  showFilters?: boolean
}

export default function VideosGrid({ religionId, showFilters = true }: VideosGridProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [language, setLanguage] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [sortOrder, setSortOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)

  const categories = [
    'lecture',
    'documentary',
    'interview',
    'practice',
    'ceremony',
    'discussion'
  ]

  const difficulties = ['beginner', 'intermediate', 'advanced']
  const languages = ['English', 'Arabic', 'Sanskrit', 'Pali', 'Latin', 'Greek', 'Hebrew', 'Persian', 'Chinese', 'Japanese']

  useEffect(() => {
    fetchVideos(1)
  }, [religionId])

  const fetchVideos = async (pageNum = 1) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: '12',
        search,
        ...(category !== 'all' && { category }),
        ...(difficulty !== 'all' && { difficulty }),
        ...(language !== 'all' && { language }),
        sortBy,
        sortOrder,
        ...(religionId && { religion: religionId })
      })
      
      const response = await fetch(`/api/videos?${params}`)
      const data = await response.json()
      
      setVideos(data.videos || [])
      setPagination(data.pagination)
      setPage(pageNum)
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    fetchVideos(1)
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setDifficulty('all')
    setLanguage('all')
    setSortBy('rating')
    setSortOrder('desc')
    fetchVideos(1)
  }

  const loadMore = () => {
    if (pagination?.hasNext) {
      fetchVideos(page + 1)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lecture': return 'bg-blue-500'
      case 'documentary': return 'bg-purple-500'
      case 'interview': return 'bg-green-500'
      case 'practice': return 'bg-teal-500'
      case 'ceremony': return 'bg-orange-500'
      case 'discussion': return 'bg-pink-500'
      default: return 'bg-gray-500'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500'
      case 'intermediate': return 'bg-yellow-500'
      case 'advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

 // Inside src/components/VideosGrid.tsx

const formatViews = (views: number | undefined | null) => {
  // FIX: If views doesn't exist, default to "0"
  if (!views) return "0"
  
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}

  return (
    <div className="space-y-6">
      {/* Filters */}
      {showFilters && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter Videos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                placeholder="Search videos, channels, or topics..."
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

              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all" className="text-white">All Languages</SelectItem>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang} className="text-white">
                      {lang}
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
                  <SelectItem value="views" className="text-white">Views</SelectItem>
                  <SelectItem value="title" className="text-white">Title</SelectItem>
                  <SelectItem value="duration" className="text-white">Duration</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="desc" className="text-white">Descending</SelectItem>
                  <SelectItem value="asc" className="text-white">Ascending</SelectItem>
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

      {/* Videos Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-16">
          <Play className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">
            No videos found
          </h3>
          <p className="text-slate-500">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-all duration-300 h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-video.jpg'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                      <Button
                        size="icon"
                        className="bg-amber-500 hover:bg-amber-600"
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')}
                      >
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-white text-xs">
                      {video.duration}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-amber-400 text-lg line-clamp-2 flex-1">
                      {video.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1 ml-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{video.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-200 text-sm mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={`${getCategoryColor(video.category)} text-white text-xs`}>
                      {video.category}
                    </Badge>
                    <Badge className={`${getDifficultyColor(video.difficulty)} text-white text-xs`}>
                      {video.difficulty}
                    </Badge>
                    <Badge variant="outline" className="border-slate-500 text-slate-300 text-xs">
                      {video.language}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {formatViews(video.views)} views
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {video.duration}
                    </div>
                  </div>

                  {video.channel && (
                    <p className="text-slate-400 text-xs mb-3">
                      Channel: {video.channel}
                    </p>
                  )}

                  {video.religionId && (
                    <p className="text-slate-400 text-xs mb-3">
                      Religion: {video.religionId.name}
                    </p>
                  )}

                  <div className="mt-auto">
                    <Button
                      size="sm"
                      className="w-full bg-amber-500 hover:bg-amber-600"
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch on YouTube
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && !loading && (
        <div className="flex items-center justify-between">
          <Button
            onClick={() => fetchVideos(page - 1)}
            disabled={!pagination.hasPrev}
            variant="outline"
            className="border-slate-600 text-white"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <span className="text-slate-300">
            Page {pagination.page} of {pagination.pages} ({pagination.total} videos)
          </span>
          
          <Button
            onClick={loadMore}
            disabled={!pagination.hasNext}
            variant="outline"
            className="border-slate-600 text-white"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}