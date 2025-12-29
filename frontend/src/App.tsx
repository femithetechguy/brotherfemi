import { useState, useEffect } from 'react'
import { AppProvider } from '@/context/AppContext'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import './index.css'

type PageType = 'home' | 'about' | 'spiritual-resources' | 'discipleship' | 'blog' | 'contact'

interface AppConfig {
  pages: {
    home: any
    about: any
    'spiritual-resources': any
    discipleship: any
    blog: any
    contact: any
  }
}

function App() {
  const [appConfig, setAppConfig] = useState<AppConfig | null>(null)
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [expandedAboutTab, setExpandedAboutTab] = useState<string>('testimony')
  const [expandedResourcesTab, setExpandedResourcesTab] = useState<string>('worship')
  const [expandedDiscipleshipTab, setExpandedDiscipleshipTab] = useState<string>('newlife')

  useEffect(() => {
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
  }, [])

  if (!appConfig) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  // HOME PAGE
  const renderHomePage = () => {
    const homeContent = appConfig.pages.home
    const heroContent = homeContent.hero
    const sections = homeContent.sections

    return (
      <>
        {/* Hero Section */}
        <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  {heroContent.title.split('\n').map((line: string, idx: number) => (
                    <div key={idx}>
                      {line === 'BROTHER FEMI' ? (
                        <>
                          HEY I'M<br />
                          <span className="text-amber-400">{line}</span>
                        </>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </h1>
                <p className="text-xl text-amber-400 mb-6">{heroContent.subtitle}</p>
                <p className="text-lg text-gray-300 mb-8">{heroContent.description}</p>
                <div className="flex gap-4">
                  {heroContent.buttons.map((btn: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => btn.url === '/about' && setCurrentPage('about')}
                      className={`px-8 py-3 rounded font-semibold transition ${
                        btn.style === 'primary'
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'border-2 border-white hover:bg-white hover:text-slate-900 text-white'
                      }`}
                    >
                      {btn.icon === 'envelope' ? '✉️ ' : ''}{btn.text}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-amber-400 to-red-500 rounded-lg p-8 text-center"
              >
                <div className="text-6xl mb-4">🙏</div>
                <p className="text-slate-900 font-semibold">Walking in Faith</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Cards */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">{sections.featured_cards.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {sections.featured_cards.cards.map((card: any, idx: number) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition"
                  onClick={() => {
                    if (card.id === 'worship-section') setCurrentPage('spiritual-resources')
                  }}
                >
                  <div className="p-8" style={{ backgroundColor: card.background_color }}>
                    <div className="text-4xl mb-4">{card.icon === 'music' ? '🎵' : card.icon === 'book-open' ? '📖' : '❤️'}</div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: card.text_color }}>{card.title}</h3>
                    <p style={{ color: card.text_color }}>{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">{sections.content_grid.title}</h2>
            <p className="text-center text-gray-600 mb-12">{sections.content_grid.subtitle}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {sections.content_grid.items.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
                  onClick={() => {
                    if (item.category === 'Discipleship') setCurrentPage('discipleship')
                    else if (item.category === 'Insights') setCurrentPage('blog')
                  }}
                >
                  <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-5xl">{item.icon === 'sparkles' ? '✨' : item.icon === 'users' ? '👥' : item.icon === 'lightbulb' ? '💡' : item.icon === 'heart' ? '❤️' : item.icon === 'book' ? '📚' : item.icon === 'music' ? '🎵' : item.icon === 'pen' ? '✍️' : item.icon === 'chat' ? '💬' : '📞'}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">{sections.blog_section.title}</h2>
            <p className="text-center text-gray-600 mb-12">{sections.blog_section.subtitle}</p>
            <div className="grid md:grid-cols-3 gap-8">
              {sections.blog_section.cards.map((card: any, idx: number) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
                  onClick={() => setCurrentPage('blog')}
                >
                  <div className="h-48 bg-gradient-to-br from-amber-400 to-orange-500"></div>
                  <div className="p-6">
                    <p className="text-sm text-red-600 font-semibold mb-2">{card.category}</p>
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{card.excerpt}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{card.date}</span>
                      <span>{card.read_time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4">{sections.welcome.title}</h2>
              <p className="text-amber-400 text-lg mb-6">{sections.welcome.subtitle}</p>
              <p className="text-lg text-gray-300 leading-relaxed">{sections.welcome.content}</p>
              <button
                onClick={() => setCurrentPage('about')}
                className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition"
              >
                {sections.welcome.cta.text}
              </button>
            </motion.div>
          </div>
        </section>
      </>
    )
  }

  // ABOUT PAGE
  const renderAboutPage = () => {
    const aboutContent = appConfig.pages.about
    const selectedTab = aboutContent.tabs.find((tab: any) => tab.id === expandedAboutTab)

    return (
      <>
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">{aboutContent.hero.title}</h1>
            <p className="text-2xl text-amber-400">{aboutContent.hero.subtitle}</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-wrap gap-2 md:gap-4 mb-12 border-b-2 border-gray-300 pb-4">
              {aboutContent.tabs.map((tab: any) => (
                <button
                  key={tab.id}
                  onClick={() => setExpandedAboutTab(tab.id)}
                  className={`px-4 md:px-6 py-2 md:py-3 font-semibold text-sm md:text-base transition rounded-t-lg ${
                    expandedAboutTab === tab.id
                      ? 'bg-red-600 text-white border-b-2 border-red-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {selectedTab && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {selectedTab.id === 'testimony' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6">{selectedTab.content.title}</h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">{selectedTab.content.description}</p>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">{selectedTab.content.paragraph2}</p>
                    <p className="text-lg text-gray-700 leading-relaxed">{selectedTab.content.paragraph3}</p>
                  </div>
                )}

                {selectedTab.id === 'vision-mission' && (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-4">{selectedTab.content.vision.title}</h3>
                      <p className="text-lg text-gray-700">{selectedTab.content.vision.description}</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{selectedTab.content.mission.title}</h3>
                      <p className="text-lg text-gray-700">{selectedTab.content.mission.description}</p>
                    </div>
                  </div>
                )}

                {selectedTab.id === 'core-values' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-8">{selectedTab.content.title}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {selectedTab.content.values.map((value: any, idx: number) => (
                        <div key={idx} className="bg-blue-50 p-6 rounded-lg">
                          <h3 className="text-xl font-bold text-blue-900 mb-2">{value.name}</h3>
                          <p className="text-gray-700">{value.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab.id === 'heart-cry' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{selectedTab.content.title}</h2>
                    <p className="text-lg text-gray-700 mb-8">{selectedTab.content.description}</p>
                    <ul className="space-y-4">
                      {selectedTab.content.cries.map((cry: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span className="text-red-600 font-bold text-xl">•</span>
                          <p className="text-lg text-gray-700">{cry}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </section>
      </>
    )
  }

  // SPIRITUAL RESOURCES PAGE
  const renderSpiritualResourcesPage = () => {
    const resourcesContent = appConfig.pages['spiritual-resources']
    const selectedTab = resourcesContent.tabs.find((tab: any) => tab.id === expandedResourcesTab)

    return (
      <>
        <section className="bg-gradient-to-b from-amber-900 to-amber-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">{resourcesContent.hero.title}</h1>
            <p className="text-2xl text-amber-200">{resourcesContent.hero.subtitle}</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-wrap gap-2 md:gap-4 mb-12 border-b-2 border-gray-300 pb-4">
              {resourcesContent.tabs.map((tab: any) => (
                <button
                  key={tab.id}
                  onClick={() => setExpandedResourcesTab(tab.id)}
                  className={`px-4 md:px-6 py-2 md:py-3 font-semibold text-sm md:text-base transition rounded-t-lg ${
                    expandedResourcesTab === tab.id
                      ? 'bg-amber-600 text-white border-b-2 border-amber-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {selectedTab && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-amber-50 p-6 rounded-lg mb-8">
                  <p className="text-lg italic text-amber-900 mb-2">"{selectedTab.content.bibleVerse}"</p>
                  <p className="text-amber-700 font-semibold">{selectedTab.content.reference}</p>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">{selectedTab.content.description}</p>
              </motion.div>
            )}
          </div>
        </section>
      </>
    )
  }

  // DISCIPLESHIP PAGE
  const renderDiscipleshipPage = () => {
    const discipleshipContent = appConfig.pages.discipleship
    const selectedTab = discipleshipContent.tabs.find((tab: any) => tab.id === expandedDiscipleshipTab)

    return (
      <>
        <section className="bg-gradient-to-b from-green-900 to-green-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">{discipleshipContent.hero.title}</h1>
            <p className="text-2xl text-green-200">{discipleshipContent.hero.subtitle}</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-wrap gap-2 md:gap-4 mb-12 border-b-2 border-gray-300 pb-4">
              {discipleshipContent.tabs.map((tab: any) => (
                <button
                  key={tab.id}
                  onClick={() => setExpandedDiscipleshipTab(tab.id)}
                  className={`px-4 md:px-6 py-2 md:py-3 font-semibold text-sm md:text-base transition rounded-t-lg ${
                    expandedDiscipleshipTab === tab.id
                      ? 'bg-green-600 text-white border-b-2 border-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {selectedTab && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {selectedTab.id === 'newlife' && (
                  <div>
                    <div className="bg-green-50 p-6 rounded-lg mb-8">
                      <p className="text-lg italic text-green-900 mb-2">"{selectedTab.content.bibleVerse}"</p>
                      <p className="text-green-700 font-semibold">{selectedTab.content.reference}</p>
                    </div>
                    {selectedTab.content.sections.map((section: any, idx: number) => (
                      <div key={idx} className="mb-12">
                        <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                        {section.subsections && section.subsections.map((subsection: any, subidx: number) => (
                          <div key={subidx} className="mb-6 ml-4">
                            <h4 className="text-xl font-semibold mb-3 text-green-700">{subsection.title}</h4>
                            {subsection.items && (
                              <ul className="space-y-2">
                                {subsection.items.map((item: string, itemidx: number) => (
                                  <li key={itemidx} className="flex gap-3 text-gray-700">
                                    <span className="text-green-600">✓</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {subsection.description && (
                              <p className="text-gray-700 mt-2">{subsection.description}</p>
                            )}
                          </div>
                        ))}
                        {section.content && !section.subsections && (
                          <p className="text-gray-700 leading-relaxed">{section.content}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab.id === 'mentors' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{selectedTab.content.title}</h2>
                    <p className="text-lg text-gray-700 mb-8">{selectedTab.content.description}</p>
                    <div className="space-y-8">
                      {selectedTab.content.categories.map((category: any, idx: number) => (
                        <div key={idx}>
                          <h3 className="text-xl font-bold text-green-700 mb-4">{category.name}</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {category.mentors.map((mentor: string, mentorIdx: number) => (
                              <div key={mentorIdx} className="bg-green-50 p-4 rounded-lg">
                                <p className="font-semibold text-gray-900">{mentor}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab.id === 'life-principles' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-8">{selectedTab.content.title}</h2>
                    <p className="text-lg text-gray-700 mb-8">{selectedTab.content.description}</p>
                    <div className="space-y-4">
                      {selectedTab.content.principles.map((principle: any, idx: number) => (
                        <div key={idx} className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                          <div className="flex gap-4">
                            <span className="text-2xl font-bold text-green-600 min-w-fit">{principle.number}.</span>
                            <p className="text-lg text-gray-700">{principle.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </section>
      </>
    )
  }

  // BLOG PAGE
  const renderBlogPage = () => {
    const blogContent = appConfig.pages.blog

    return (
      <>
        <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">{blogContent.hero.title}</h1>
            <p className="text-2xl text-purple-200">{blogContent.hero.subtitle}</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {blogContent.featured_posts.map((post: any, idx: number) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                >
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <span className="text-5xl">{post.icon === 'moon-stars' ? '🌙' : post.icon === 'path' ? '🛤️' : post.icon === 'mountains' ? '⛰️' : '🙏'}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{post.short_details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  // CONTACT PAGE
  const renderContactPage = () => {
    const contactContent = appConfig.pages.contact

    return (
      <>
        <section className="bg-gradient-to-b from-red-900 to-red-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">{contactContent.hero.title}</h1>
            <p className="text-2xl text-red-200">{contactContent.hero.subtitle}</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-red-50 p-8 rounded-lg mb-12">
              <p className="text-lg italic text-red-900 mb-2">"{contactContent.bibleVerse}"</p>
              <p className="text-red-700 font-semibold">{contactContent.reference}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
                <div className="space-y-4">
                  {contactContent.contact_methods.map((method: any, idx: number) => (
                    <a
                      key={idx}
                      href={method.url}
                      target={method.type !== 'Email' ? '_blank' : undefined}
                      rel={method.type !== 'Email' ? 'noopener noreferrer' : undefined}
                      className="block p-4 bg-white rounded-lg hover:bg-red-50 transition border border-gray-200"
                    >
                      <div className="font-semibold text-red-600">{method.type}</div>
                      <div className="text-gray-700">{method.display}</div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">{contactContent.form.title}</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <AppProvider>
      <Navbar 
        onNavigate={setCurrentPage}
        onSetAboutTab={setExpandedAboutTab}
        onSetResourcesTab={setExpandedResourcesTab}
        onSetDiscipleshipTab={setExpandedDiscipleshipTab}
      />
      
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'about' && renderAboutPage()}
      {currentPage === 'spiritual-resources' && renderSpiritualResourcesPage()}
      {currentPage === 'discipleship' && renderDiscipleshipPage()}
      {currentPage === 'blog' && renderBlogPage()}
      {currentPage === 'contact' && renderContactPage()}

      <Footer />
    </AppProvider>
  )
}

export default App
