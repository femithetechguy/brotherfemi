import { motion } from 'framer-motion'
import { MdEmail } from 'react-icons/md'
import { FaInstagram, FaThreads, FaTiktok, FaYoutube } from 'react-icons/fa6'

export default function Footer() {
  const socialLinks = [
    { icon: MdEmail, url: 'mailto:contact@brotherfemi.org', color: '#EA4335', label: 'Email' },
    { icon: FaInstagram, url: 'https://www.instagram.com/thebrotherfemi/', color: '#E4405F', label: 'Instagram' },
    { icon: FaThreads, url: '#', color: '#000000', label: 'Threads' },
    { icon: FaTiktok, url: 'https://www.tiktok.com/@thebrotherfemi', color: '#000000', label: 'TikTok' },
    { icon: FaYoutube, url: 'https://www.youtube.com/@thebrotherfemi', color: '#FF0000', label: 'YouTube' },
  ]

  return (
    <motion.footer
      className="bg-gray-700 text-white mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="font-bold text-lg mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#home" className="hover:text-red-500 transition">Home</a></li>
              <li><a href="#about" className="hover:text-red-500 transition">About</a></li>
              <li><a href="#resources" className="hover:text-red-500 transition">Resources</a></li>
              <li><a href="#blog" className="hover:text-red-500 transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Spiritual Resources</h5>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#worship" className="hover:text-red-500 transition">Worship</a></li>
              <li><a href="#the-word" className="hover:text-red-500 transition">Bible Study</a></li>
              <li><a href="#prayers" className="hover:text-red-500 transition">Prayers</a></li>
              <li><a href="#discipleship" className="hover:text-red-500 transition">Discipleship</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Connect</h5>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="https://www.instagram.com/thebrotherfemi/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">Instagram</a></li>
              <li><a href="https://www.youtube.com/@thebrotherfemi" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">YouTube</a></li>
              <li><a href="https://www.tiktok.com/@thebrotherfemi" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">TikTok</a></li>
              <li><a href="mailto:contact@brotherfemi.org" className="hover:text-red-500 transition">Email</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Subscribe</h5>
            <p className="text-sm opacity-80 mb-4">Get updates on teachings and resources</p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded text-gray-800 text-sm"
            />
          </div>
        </div>

        {/* Social Media Icons Section */}
        <div className="border-t border-white/20 py-8">
          <div className="flex justify-center gap-0 mb-8">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={idx}
                  href={social.url}
                  title={social.label}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: social.color }}
                >
                  <Icon size={28} color="white" />
                </motion.a>
              )
            })}
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="italic text-sm mb-2 opacity-80">Walking in faith, serving in humility</p>
          <p className="text-sm mb-2">
            ✨ Designed and Developed By{' '}
            <a href="https://fttgsolutions.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">
              FTTG Solutions
            </a>
          </p>
          <p className="text-xs opacity-70">
            © 2025 Brother Femi. All rights reserved. | Bond Servant & Steward
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
