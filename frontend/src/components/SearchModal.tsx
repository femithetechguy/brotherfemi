import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'

type PageType = 'home' | 'about' | 'spiritual-resources' | 'discipleship' | 'blog' | 'contact'

interface SearchResult {
  id: string
  title: string
  content: string
  page: PageType
  tab?: string
  category: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigate?: (page: PageType) => void
  onSetAboutTab?: (tab: string) => void
  onSetResourcesTab?: (tab: string) => void
  onSetDiscipleshipTab?: (tab: string) => void
}

export default function SearchModal({
  isOpen,
  onClose,
  onNavigate,
  onSetAboutTab,
  onSetResourcesTab,
  onSetDiscipleshipTab,
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [appConfig, setAppConfig] = useState<any>(null)

  useEffect(() => {
    if (isOpen) {
      const loadConfig = async () => {
        try {
          const response = await fetch('/app.json')
          const config = await response.json()
          setAppConfig(config)
        } catch (error) {
          console.error('Failed to load app config:', error)
        }
      }
      loadConfig()
    }
  }, [isOpen])

  // Build searchable index from app config
  const searchIndex = useMemo(() => {
    if (!appConfig) return []

    const index: SearchResult[] = []

    // Home page content
    if (appConfig.pages?.home) {
      const home = appConfig.pages.home
      index.push({
        id: 'home-hero',
        title: home.hero?.title || 'Home',
        content: home.hero?.subtitle || '',
        page: 'home',
        category: 'Home',
      })
    }

    // About page
    if (appConfig.pages?.about?.tabs) {
      appConfig.pages.about.tabs.forEach((tab: any) => {
        index.push({
          id: `about-${tab.id}`,
          title: tab.label,
          content: tab.content?.title || tab.content?.description || '',
          page: 'about',
          tab: tab.id,
          category: 'About',
        })
      })
    }

    // Spiritual Resources page
    if (appConfig.pages?.['spiritual-resources']?.tabs) {
      appConfig.pages['spiritual-resources'].tabs.forEach((tab: any) => {
        index.push({
          id: `resources-${tab.id}`,
          title: tab.label,
          content: tab.content?.title || '',
          page: 'spiritual-resources',
          tab: tab.id,
          category: 'Spiritual Resources',
        })
      })
    }

    // Discipleship page
    if (appConfig.pages?.discipleship?.tabs) {
      appConfig.pages.discipleship.tabs.forEach((tab: any) => {
        index.push({
          id: `discipleship-${tab.id}`,
          title: tab.label,
          content: tab.content?.title || '',
          page: 'discipleship',
          tab: tab.id,
          category: 'Discipleship',
        })
      })
    }

    // Blog page
    if (appConfig.pages?.blog?.featured_posts) {
      appConfig.pages.blog.featured_posts.forEach((post: any) => {
        index.push({
          id: `blog-${post.title.replace(/\s+/g, '-').toLowerCase()}`,
          title: post.title,
          content: post.excerpt || post.description || post.short_details || '',
          page: 'blog',
          category: 'Blog',
        })
      })
    }

    return index
  }, [appConfig])

  // Filter results based on search query
  useEffect(() => {
    setSelectedIndex(0)

    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    )

    setResults(filtered)
  }, [searchQuery, searchIndex])

  const handleResultClick = (result: SearchResult) => {
    if (onNavigate) {
      onNavigate(result.page)

      // Set appropriate tab if needed
      if (result.tab) {
        if (result.page === 'about' && onSetAboutTab) {
          onSetAboutTab(result.tab)
        } else if (result.page === 'spiritual-resources' && onSetResourcesTab) {
          onSetResourcesTab(result.tab)
        } else if (result.page === 'discipleship' && onSetDiscipleshipTab) {
          onSetDiscipleshipTab(result.tab)
        }
      }
    }

    setSearchQuery('')
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
        break
      case 'Enter':
        e.preventDefault()
        handleResultClick(results[selectedIndex])
        break
      case 'Escape':
        e.preventDefault()
        onClose()
        break
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 mx-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="relative p-4 border-b border-gray-200">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search content, pages, and resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="w-full pl-10 pr-10 py-3 text-lg outline-none"
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {results.length === 0 && searchQuery && (
                  <div className="p-8 text-center text-gray-500">
                    <p>No results found for "{searchQuery}"</p>
                  </div>
                )}

                {results.length === 0 && !searchQuery && (
                  <div className="p-8 text-center text-gray-500">
                    <p>Start typing to search...</p>
                  </div>
                )}

                {results.map((result, index) => (
                  <motion.button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left px-4 py-3 transition border-b border-gray-100 hover:bg-gray-50 ${
                      index === selectedIndex ? 'bg-red-50' : ''
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {result.title}
                        </h3>
                        {result.content && (
                          <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                            {result.content}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded whitespace-nowrap flex-shrink-0">
                        {result.category}
                      </span>
                    </div>
                  </motion.button>
                ))}

                {results.length > 0 && (
                  <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 border-t border-gray-200">
                    <p>
                      Use <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold">↑↓</kbd> to navigate,{' '}
                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold">Enter</kbd> to select,{' '}
                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold">Esc</kbd> to close
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
