# Brother Femi - Frontend Application

A faith-inspired platform sharing spiritual insights, biblical wisdom, and personal testimony.

## Tech Stack

- **Framework**: React.js 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Context API + useReducer
- **Data Source**: app.json configuration

## Project Structure

```
brother-femi/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # Context API for state management
│   │   ├── services/        # Local data service
│   │   ├── App.tsx          # Main App component
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
├── app.json                  # Configuration file with all content
└── package.json              # Root package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
cd frontend && npm install
```

### Running the Application

#### Development Mode
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

#### Building for Production

```bash
npm run build
```

### Running Production Build

```bash
npm start
```

## Available Scripts

### Root Level
- `npm run dev` - Run frontend development server
- `npm run build` - Build frontend for production
- `npm run lint` - Lint frontend code

### Frontend
- `cd frontend && npm run dev` - Start frontend development server
- `cd frontend && npm run build` - Build frontend for production
- `cd frontend && npm run preview` - Preview production build

## API / Data Source

All data is loaded from **app.json** configuration file. The app dynamically renders content based on:

- Page configurations
- Design system (colors, fonts)
- Navigation structure
- Content sections
- Form validation rules

No backend server required - perfect for static site generation and content management.

## Features Implemented

✅ Responsive Navigation with Mobile Menu
✅ Hero Section with Framer Motion Animations
✅ Featured Content Cards
✅ Content Grid Showcase
✅ Key Features Section
✅ Contact Form with Local Storage
✅ Footer with Social Links
✅ Local Data Service (app.json)
✅ Context API State Management
✅ Tailwind CSS Styling
✅ TypeScript Support
✅ Dynamic Content Rendering

## Features to Implement

- [ ] Page routing for all sections
- [ ] Blog detail pages
- [ ] Prayer resources detail view
- [ ] Mentor directory with filtering
- [ ] Newsletter subscription
- [ ] Search functionality
- [ ] Testimonies carousel
- [ ] Image gallery
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Email notification on form submit
- [ ] Social media feeds integration

## Design System

### Colors
- **Primary**: #2C5282 (Deep Blue)
- **Secondary**: #D69E2E (Warm Gold)
- **Accent**: #38A169 (Green)
- **Dark**: #1A202C (Almost Black)
- **Light**: #F7FAFC (Almost White)

### Fonts
- **Primary**: Crimson Text (Serif) - Headers & Emphasis
- **Secondary**: Open Sans (Sans-serif) - Body & Navigation

## Contributing

Guidelines for contributing to this project coming soon.

## License

MIT License - Feel free to use this project for any purpose.

## Contact

- **Email**: contact@brotherfemi.org
- **Instagram**: @thebrotherfemi
- **YouTube**: @thebrotherfemi
- **Website**: https://brotherfemi.org

## Credits

Designed and Developed By [FTTG Solutions](https://fttgsolutions.com)

---

**Bond Servant & Steward** ✨

*Walking in faith, serving in humility*
