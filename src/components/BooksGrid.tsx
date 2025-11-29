'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BookOpen, 
  ExternalLink, 
  Star, 
  Filter,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface Book {
  _id: string
  title: string
  author: string
  description: string
  category: string
  difficulty: string
  language: string
  amazonLink?: string
  goodreadsLink?: string
  googleBooksLink?: string
  rating: number
  religionId: {
    _id: string
    name: string
  }
  sectId?: {
    _id: string
    name: string
  }
  tags: string[]
}

interface BooksGridProps {
  religionId?: string
  showFilters?: boolean
}

export default function BooksGrid({ religionId, showFilters = true }: BooksGridProps) {
  const [books, setBooks] = useState<Book[]>([])
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
    'scripture',
    'commentary', 
    'theology',
    'philosophy',
    'history',
    'practice'
  ]

  const difficulties = ['beginner', 'intermediate', 'advanced']
  const languages = ['English', 'Arabic', 'Sanskrit', 'Pali', 'Latin', 'Greek', 'Hebrew', 'Persian', 'Chinese', 'Japanese']

  useEffect(() => {
    fetchBooks(1)
  }, [religionId])

  const fetchBooks = async (pageNum = 1) => {
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
      
      const response = await fetch(`/api/books?${params}`)
      const data = await response.json()
      
      setBooks(data.books || [])
      setPagination(data.pagination)
      setPage(pageNum)
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    fetchBooks(1)
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setDifficulty('all')
    setLanguage('all')
    setSortBy('rating')
    setSortOrder('desc')
    fetchBooks(1)
  }

  const loadMore = () => {
    if (pagination?.hasNext) {
      fetchBooks(page + 1)
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'scripture': return 'bg-purple-500'
      case 'commentary': return 'bg-blue-500'
      case 'theology': return 'bg-indigo-500'
      case 'philosophy': return 'bg-pink-500'
      case 'history': return 'bg-orange-500'
      case 'practice': return 'bg-teal-500'
      default: return 'bg-gray-500'
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
              Filter Books
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                placeholder="Search books or authors..."
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
                  <SelectItem value="title" className="text-white">Title</SelectItem>
                  <SelectItem value="author" className="text-white">Author</SelectItem>
                  <SelectItem value="publicationYear" className="text-white">Publication Year</SelectItem>
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

      {/* Books Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">
            No books found
          </h3>
          <p className="text-slate-500">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-amber-400 text-lg line-clamp-2">
                      {book.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{book.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm">by {book.author}</p>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-slate-200 text-sm mb-4 line-clamp-3">
                    {book.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={`${getCategoryColor(book.category)} text-white text-xs`}>
                      {book.category}
                    </Badge>
                    <Badge className={`${getDifficultyColor(book.difficulty)} text-white text-xs`}>
                      {book.difficulty}
                    </Badge>
                    <Badge variant="outline" className="border-slate-500 text-slate-300 text-xs">
                      {book.language}
                    </Badge>
                  </div>

                  {book.religionId && (
                    <p className="text-slate-400 text-xs mb-4">
                      Religion: {book.religionId.name}
                    </p>
                  )}

                  <div className="mt-auto space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {book.amazonLink && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-slate-600 text-white hover:bg-slate-700"
                          onClick={() => window.open(book.amazonLink, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Amazon
                        </Button>
                      )}
                      {book.goodreadsLink && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-slate-600 text-white hover:bg-slate-700"
                          onClick={() => window.open(book.goodreadsLink, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Goodreads
                        </Button>
                      )}
                    </div>
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
            onClick={() => fetchBooks(page - 1)}
            disabled={!pagination.hasPrev}
            variant="outline"
            className="border-slate-600 text-white"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <span className="text-slate-300">
            Page {pagination.page} of {pagination.pages} ({pagination.total} books)
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