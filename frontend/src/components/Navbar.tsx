import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'
import { FaInstagram, FaThreads, FaTiktok, FaYoutube } from 'react-icons/fa6'

interface MenuItem {
  label: string
  url: string
  icon?: string
  submenu?: MenuItem[]
}

interface AppConfig {
  global_components: {
    header: {
      menu: MenuItem[]
    }
  }
}

type PageType = 'home' | 'about' | 'spiritual-resources' | 'discipleship' | 'blog' | 'contact'

interface NavbarProps {
  onNavigate?: (page: PageType) => void
  onSetAboutTab?: (tab: string) => void
  onSetResourcesTab?: (tab: string) => void
  onSetDiscipleshipTab?: (tab: string) => void
}

export default function Navbar({ onNavigate, onSetAboutTab, onSetResourcesTab, onSetDiscipleshipTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mobileSearchQuery, setMobileSearchQuery] = useState('')
  const [mobileSearchResults, setMobileSearchResults] = useState<any[]>([])
  const [appConfig, setAppConfig] = useState<any>(null)

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const response = await fetch('/app.json')
        const config: AppConfig = await response.json()
        setMenuItems(config.global_components.header.menu)
        // Also store the full app config for search
        setAppConfig(config)
      } catch (error) {
        console.error('Failed to load menu items:', error)
      }
    }

    loadMenuItems()
  }, [])

  // Mobile search effect
  useEffect(() => {
    if (!mobileSearchQuery.trim() || !appConfig) {
      setMobileSearchResults([])
      return
    }

    const buildIndex = () => {
      const index: any[] = []

      if (appConfig.pages?.home) {
        index.push({
          id: 'home',
          title: 'Home',
          page: 'home',
          category: 'Home',
        })
      }

      if (appConfig.pages?.about?.tabs) {
        appConfig.pages.about.tabs.forEach((tab: any) => {
          index.push({
            id: `about-${tab.id}`,
            title: tab.label,
            page: 'about',
            tab: tab.id,
            category: 'About',
          })
        })
      }

      if (appConfig.pages?.['spiritual-resources']?.tabs) {
        appConfig.pages['spiritual-resources'].tabs.forEach((tab: any) => {
          index.push({
            id: `resources-${tab.id}`,
            title: tab.label,
            page: 'spiritual-resources',
            tab: tab.id,
            category: 'Spiritual Resources',
          })
        })
      }

      if (appConfig.pages?.discipleship?.tabs) {
        appConfig.pages.discipleship.tabs.forEach((tab: any) => {
          index.push({
            id: `discipleship-${tab.id}`,
            title: tab.label,
            page: 'discipleship',
            tab: tab.id,
            category: 'Discipleship',
          })
        })
      }

      if (appConfig.pages?.blog?.featured_posts) {
        appConfig.pages.blog.featured_posts.forEach((post: any) => {
          index.push({
            id: `blog-${post.title.replace(/\s+/g, '-').toLowerCase()}`,
            title: post.title,
            page: 'blog',
            category: 'Blog',
          })
        })
      }

      return index
    }

    const fullIndex = buildIndex()
    const query = mobileSearchQuery.toLowerCase()
    const filtered = fullIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    )

    setMobileSearchResults(filtered)
  }, [mobileSearchQuery, appConfig])

  const handleMobileSearchResult = (result: any) => {
    if (onNavigate) {
      onNavigate(result.page)
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
    setMobileSearchQuery('')
    setIsOpen(false)
  }

  const toggleSubmenu = (label: string) => {
    setExpandedSubmenu(expandedSubmenu === label ? null : label)
  }

  const handleMenuItemClick = (label: string) => {
    setIsOpen(false)
    if (!onNavigate) return

    const pageMap: { [key: string]: PageType } = {
      'Home': 'home',
      'About': 'about',
      'Spiritual Resources': 'spiritual-resources',
      'Discipleship': 'discipleship',
      'Worship': 'spiritual-resources',
      'Blog & Reflections': 'blog',
      'Contact': 'contact',
    }

    const page = pageMap[label]
    if (page) {
      onNavigate(page)
    }
  }

  const handleSubmenuClick = (parentLabel: string, submenuLabel: string) => {
    setIsOpen(false)
    if (!onNavigate) return

    const pageMap: { [key: string]: PageType } = {
      'About': 'about',
      'Spiritual Resources': 'spiritual-resources',
      'Discipleship': 'discipleship',
    }

    const page = pageMap[parentLabel]
    if (!page) return

    // Navigate to the parent page
    onNavigate(page)

    // Set the appropriate tab based on submenu label
    if (parentLabel === 'About' && onSetAboutTab) {
      const tabMap: { [key: string]: string } = {
        'My Testimony': 'testimony',
        'Vision & Mission': 'vision-mission',
        'Core Values': 'core-values',
        'Heart Cry': 'heart-cry',
      }
      const tab = tabMap[submenuLabel]
      if (tab) onSetAboutTab(tab)
    } else if (parentLabel === 'Spiritual Resources' && onSetResourcesTab) {
      const tabMap: { [key: string]: string } = {
        'The Word (Bible Study)': 'worship',
        'Prayers & Declarations': 'prayers',
        'Hymns': 'hymns',
      }
      const tab = tabMap[submenuLabel]
      if (tab) onSetResourcesTab(tab)
    } else if (parentLabel === 'Discipleship' && onSetDiscipleshipTab) {
      const tabMap: { [key: string]: string } = {
        'New Life in Christ': 'newlife',
        'Mentors & Teachers': 'mentors',
        'Life Principles': 'life-principles',
      }
      const tab = tabMap[submenuLabel]
      if (tab) onSetDiscipleshipTab(tab)
    }
  }

  // Inline Search Bar Component
  const SearchBar = ({
    isOpen,
    onClose,
    onNavigate,
    onSetAboutTab,
    onSetResourcesTab,
    onSetDiscipleshipTab,
  }: {
    isOpen: boolean
    onClose: () => void
    onNavigate?: (page: PageType) => void
    onSetAboutTab?: (tab: string) => void
    onSetResourcesTab?: (tab: string) => void
    onSetDiscipleshipTab?: (tab: string) => void
  }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [results, setResults] = useState<any[]>([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [appConfig, setAppConfig] = useState<any>(null)

    useEffect(() => {
      if (isOpen && !appConfig) {
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
    }, [isOpen, appConfig])

    // Build searchable index
    const buildSearchIndex = () => {
      if (!appConfig) return []

      const index: any[] = []

      if (appConfig.pages?.home) {
        const home = appConfig.pages.home
        index.push({
          id: 'home-hero',
          title: home.hero?.title || 'Home',
          page: 'home',
          category: 'Home',
        })
      }

      if (appConfig.pages?.about?.tabs) {
        appConfig.pages.about.tabs.forEach((tab: any) => {
          index.push({
            id: `about-${tab.id}`,
            title: tab.label,
            page: 'about',
            tab: tab.id,
            category: 'About',
          })
        })
      }

      if (appConfig.pages?.['spiritual-resources']?.tabs) {
        appConfig.pages['spiritual-resources'].tabs.forEach((tab: any) => {
          index.push({
            id: `resources-${tab.id}`,
            title: tab.label,
            page: 'spiritual-resources',
            tab: tab.id,
            category: 'Spiritual Resources',
          })
        })
      }

      if (appConfig.pages?.discipleship?.tabs) {
        appConfig.pages.discipleship.tabs.forEach((tab: any) => {
          index.push({
            id: `discipleship-${tab.id}`,
            title: tab.label,
            page: 'discipleship',
            tab: tab.id,
            category: 'Discipleship',
          })
        })
      }

      if (appConfig.pages?.blog?.featured_posts) {
        appConfig.pages.blog.featured_posts.forEach((post: any) => {
          index.push({
            id: `blog-${post.title.replace(/\s+/g, '-').toLowerCase()}`,
            title: post.title,
            page: 'blog',
            category: 'Blog',
          })
        })
      }

      return index
    }

    // Filter results based on search query
    useEffect(() => {
      setSelectedIndex(0)

      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      const fullIndex = buildSearchIndex()
      const query = searchQuery.toLowerCase()
      const filtered = fullIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      )

      setResults(filtered)
    }, [searchQuery, appConfig])

    const handleResultClick = (result: any) => {
      if (onNavigate) {
        onNavigate(result.page)

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
      <>
        <div className="flex items-center gap-2 px-3">
          <FiSearch className="w-4 h-4 text-gray-600 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 outline-none text-gray-900 text-sm py-2 placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {searchQuery && (
          <div className="border-t border-gray-200 max-h-64 overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No results found
              </div>
            ) : (
              results.map((result, index) => (
                <motion.button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-4 py-2 text-sm transition border-b border-gray-100 hover:bg-gray-50 ${
                    index === selectedIndex ? 'bg-red-50' : ''
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate">
                      {result.title}
                    </span>
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded ml-2 flex-shrink-0">
                      {result.category}
                    </span>
                  </div>
                </motion.button>
              ))
            )}
          </div>
        )}
      </>
    )
  }

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-gray-700 text-white shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded flex items-center justify-center text-white font-bold text-xl">
              BF
            </div>
            <div>
              <a href="/" className="text-lg font-bold tracking-wide hover:text-red-400 transition-colors">
                BROTHER FEMI
              </a>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-1 items-center">
            {menuItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="relative group"
              >
                <button
                  onClick={() => handleMenuItemClick(item.label)}
                  className="text-sm font-semibold px-4 py-2 hover:text-red-500 transition-colors whitespace-nowrap"
                >
                  {item.label.toUpperCase()}
                </button>

                {/* Submenu */}
                {item.submenu && item.submenu.length > 0 && (
                  <div className="absolute left-0 mt-0 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.submenu.map((subitem, subidx) => (
                      <button
                        key={subidx}
                        onClick={() => handleSubmenuClick(item.label, subitem.label)}
                        className="block w-full text-left px-4 py-2 text-sm hover:text-red-500 hover:bg-gray-700 first:rounded-t-md last:rounded-b-md transition-colors"
                      >
                        {subitem.label}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social Icons + Search CTA */}
          <div className="hidden md:flex items-center gap-4 relative">
            {/* Social Icons - Hidden when search is open */}
            <motion.div
              className="flex gap-3"
              animate={{ opacity: isSearchOpen ? 0 : 1, visibility: isSearchOpen ? 'hidden' : 'visible' }}
              transition={{ duration: 0.2 }}
            >
              <a href="https://www.instagram.com/thebrotherfemi/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaThreads className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@thebrotherfemi" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <FaTiktok className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@thebrotherfemi" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <FaYoutube className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Search Button - Always visible */}
            {!isSearchOpen && (
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </motion.button>
            )}

            {/* Inline Search - Visible when search is open */}
            {isSearchOpen && (
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-2xl overflow-hidden z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <SearchBar
                  isOpen={isSearchOpen}
                  onClose={() => setIsSearchOpen(false)}
                  onNavigate={onNavigate}
                  onSetAboutTab={onSetAboutTab}
                  onSetResourcesTab={onSetResourcesTab}
                  onSetDiscipleshipTab={onSetDiscipleshipTab}
                />
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-2xl text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <motion.div
            className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-lg flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: isOpen ? 0 : '100%' }}
            transition={{ duration: 0.3 }}
          >
            {/* Red Header with Close Button */}
            <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="font-bold text-lg">Menu</h2>
              <button
                className="text-2xl"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Mobile Search */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <FiSearch className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-gray-900 text-sm placeholder-gray-400"
                />
                {mobileSearchQuery && (
                  <button
                    onClick={() => setMobileSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Results */}
              {mobileSearchQuery && mobileSearchResults.length > 0 && (
                <div className="mt-2 max-h-48 overflow-y-auto">
                  {mobileSearchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleMobileSearchResult(result)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-gray-900 flex-1">{result.title}</span>
                        <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded flex-shrink-0">
                          {result.category}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {mobileSearchQuery && mobileSearchResults.length === 0 && (
                <div className="mt-2 p-3 text-center text-sm text-gray-500">
                  No results found
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="overflow-y-auto flex-1">
              <ul className="divide-y divide-gray-200">
                {menuItems.map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => {
                        handleMenuItemClick(item.label)
                        if (!item.submenu || item.submenu.length === 0) {
                          setIsOpen(false)
                        } else {
                          toggleSubmenu(item.label)
                        }
                      }}
                      className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition"
                    >
                      <span className="text-gray-900 font-medium">
                        {item.label}
                      </span>
                      {item.submenu && item.submenu.length > 0 && (
                        <motion.span
                          className="text-red-600"
                          animate={{ rotate: expandedSubmenu === item.label ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          ›
                        </motion.span>
                      )}
                    </button>

                    {/* Submenu */}
                    <motion.div
                      className="overflow-hidden bg-gray-50"
                      initial={{ height: 0 }}
                      animate={{ height: expandedSubmenu === item.label ? 'auto' : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="divide-y divide-gray-200">
                        {item.submenu && item.submenu.map((subitem, subidx) => (
                          <li key={subidx}>
                            <button
                              onClick={() => {
                                handleSubmenuClick(item.label, subitem.label)
                                setIsOpen(false)
                              }}
                              className="block w-full text-left px-6 py-3 text-gray-700 text-sm hover:bg-white transition border-l-4 border-red-600"
                            >
                              • {subitem.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer CTA */}
            <div className="border-t border-gray-200 p-6">
              <a
                href="#contact"
                className="block w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded text-center font-semibold transition"
                onClick={() => setIsOpen(false)}
              >
                ❤️ Contact
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
