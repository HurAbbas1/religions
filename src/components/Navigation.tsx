'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, BookOpen, Users, MessageCircle, Menu, X } from 'lucide-react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-amber-400 hover:text-amber-300 transition-colors">
              The Eternal Quest
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-white hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-slate-700">
                <Home className="w-4 h-4 mr-2 inline" />
                Home
              </Link>
              <Link href="/religions" className="text-white hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-slate-700">
                <BookOpen className="w-4 h-4 mr-2 inline" />
                Religions
              </Link>
              <Link href="/scholars" className="text-white hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-slate-700">
                <Users className="w-4 h-4 mr-2 inline" />
                Scholars
              </Link>
              <Link href="/community" className="text-white hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-slate-700">
                <MessageCircle className="w-4 h-4 mr-2 inline" />
                Community
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-white hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-slate-700">
                <Home className="w-4 h-4 mr-2 inline" />
                Home
              </Link>
              <Link href="/religions" className="text-white hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-slate-700">
                <BookOpen className="w-4 h-4 mr-2 inline" />
                Religions
              </Link>
              <Link href="/scholars" className="text-white hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-slate-700">
                <Users className="w-4 h-4 mr-2 inline" />
                Scholars
              </Link>
              <Link href="/community" className="text-white hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-slate-700">
                <MessageCircle className="w-4 h-4 mr-2 inline" />
                Community
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}