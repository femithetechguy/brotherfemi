import { motion } from 'framer-motion'

interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
  bgColor?: string
  textColor?: string
  onClick?: () => void
}

export default function Card({
  icon,
  title,
  description,
  bgColor = 'bg-primary',
  textColor = 'text-white',
  onClick,
}: CardProps) {
  return (
    <motion.div
      className={`${bgColor} ${textColor} p-8 rounded-lg shadow-lg cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
    >
      <motion.div
        className="text-4xl mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {icon}
      </motion.div>
      <h3 className="font-primary text-2xl mb-3">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
      <motion.div
        className="mt-4 text-sm font-semibold"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Learn More →
      </motion.div>
    </motion.div>
  )
}
