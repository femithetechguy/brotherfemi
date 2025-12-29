let appConfig: any = null

// Load app configuration on init
async function loadConfig() {
  if (!appConfig) {
    try {
      const response = await fetch('/app.json')
      appConfig = await response.json()
    } catch (error) {
      console.error('Failed to load app.json:', error)
      appConfig = {}
    }
  }
  return appConfig
}

export const apiService = {
  // Get app configuration
  getConfig: async () => {
    await loadConfig()
    return appConfig
  },

  // Get specific page content
  getPageContent: async (pageId: string) => {
    await loadConfig()
    return appConfig.pages?.[pageId] || null
  },

  // Get all pages
  getAllPages: async () => {
    await loadConfig()
    return appConfig.pages || {}
  },

  // Get design system
  getDesign: async () => {
    await loadConfig()
    return appConfig.design || {}
  },

  // Simulate contact form submission (stores in memory)
  submitContactForm: async (data: any) => {
    console.log('Contact form submitted:', data)
    return {
      success: true,
      message: 'Thank you for reaching out! I\'ll respond as soon as possible.',
      data,
    }
  },

  // Get prayers
  getPrayers: async () => {
    await loadConfig()
    const prayersPage = appConfig.pages?.prayers as any
    return prayersPage?.prayer_resources || []
  },

  // Get mentors
  getMentors: async () => {
    await loadConfig()
    const discipleshipPage = appConfig.pages?.discipleship as any
    const mentorsTab = discipleshipPage?.tabs?.find((tab: any) => tab.id === 'mentors')
    return mentorsTab?.content?.categories || []
  },

  // Get blog posts
  getBlogPosts: async () => {
    await loadConfig()
    const blogPage = appConfig.pages?.blog as any
    return blogPage?.featured_posts || []
  },
}

export default apiService
