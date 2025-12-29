import { motion } from 'framer-motion'

interface HeroProps {
  title: string
  subtitle: string
  description: string
  buttons?: Array<{
    text: string
    onClick?: () => void
    variant?: 'primary' | 'secondary'
  }>
}

export default function Hero({
  title,
  subtitle,
  description,
  buttons = [],
}: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-r from-primary to-dark text-light py-20 flex items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div variants={itemVariants}>
            <motion.h2
              className="font-primary text-5xl md:text-6xl font-bold mb-4 leading-tight"
              variants={itemVariants}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl mb-4 opacity-95"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
            <motion.p
              className="text-lg mb-8 opacity-90 leading-relaxed"
              variants={itemVariants}
            >
              {description}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              {buttons.map((btn, idx) => (
                <motion.button
                  key={idx}
                  onClick={btn.onClick}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    btn.variant === 'secondary'
                      ? 'border-2 border-light text-light hover:bg-light hover:text-primary'
                      : 'bg-secondary text-white hover:bg-orange-700'
                  }`}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {btn.text}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:flex items-center justify-center"
            variants={itemVariants}
          >
            <div className="w-80 h-80 bg-white/10 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
              <svg
                className="w-24 h-24 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
