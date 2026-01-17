# AP-group Website

A modern, premium website for AP-group built with Next.js 15, featuring stunning 3D visuals, smooth animations, and a futuristic tech-forward design.

## 🚀 Tech Stack

- **Next.js 15** (App Router) - React framework for production
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Three.js / React Three Fiber** - 3D graphics and visualizations
- **React Three Drei** - Useful helpers for React Three Fiber

## 🎨 Design System

### Colors
- **Background**: Dark graphite (#0F1115)
- **Primary**: Forest green (#1F6F54)
- **Secondary**: Muted teal (#2B9C82)
- **Accent**: Soft white (#F2F3F5)

### Typography
- **Font Family**: Geist Sans (modern, clean)
- **Headings**: Bold, large-scale typography
- **Body**: Clean, readable text with proper hierarchy

## 📁 Project Structure

```
demo-website/
├── app/
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── contact/
│   │   └── page.tsx          # Contact page with form
│   ├── globals.css           # Global styles and CSS variables
│   ├── layout.tsx            # Root layout with Navbar/Footer
│   ├── page.tsx              # Home page with 3D hero
│   └── template.tsx          # Page transition wrapper
├── components/
│   ├── Footer.tsx            # Footer component
│   ├── Logo.tsx              # Custom AP-group logo SVG
│   ├── Navbar.tsx            # Navigation bar
│   ├── PageTransition.tsx    # Page transition component
│   └── Scene3D.tsx           # 3D floating nodes scene
├── tailwind.config.ts        # Tailwind configuration
└── next.config.ts            # Next.js configuration
```

## 🎯 Features

### Home Page
- **3D Hero Section**: Floating geometric nodes with subtle animations
- **Smooth Entrance Animations**: Fade and slide effects using Framer Motion
- **Scroll Indicator**: Animated scroll prompt
- **Features Section**: Grid of service offerings
- **CTA Section**: Call-to-action for project inquiries

### About Page
- **Clean Layout**: Well-structured content sections
- **Scroll Animations**: Elements animate into view on scroll
- **Abstract Background**: Geometric grid pattern
- **Process Breakdown**: Step-by-step workflow visualization

### Contact Page
- **Minimal Form**: Clean, accessible contact form
- **Smooth States**: Hover and focus animations
- **Contact Information**: Multiple ways to get in touch
- **Form Validation**: Client-side validation with visual feedback

### Global Features
- **Page Transitions**: Smooth transitions between routes
- **Responsive Design**: Mobile-first, works on all devices
- **Performance Optimized**: Dynamic imports for 3D components
- **Accessibility**: Semantic HTML and proper ARIA labels

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd demo-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Colors
Edit `app/globals.css` and `tailwind.config.ts` to customize the color scheme:

```css
:root {
  --background: #0F1115;
  --primary: #1F6F54;
  --secondary: #2B9C82;
}
```

### Logo
Modify `components/Logo.tsx` to update the logo design.

### 3D Scene
Customize the 3D visuals in `components/Scene3D.tsx`:
- Adjust node count
- Change colors and materials
- Modify animation speeds

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Build for Production
```bash
npm run build
npm run start
```

## 📝 Notes

- The 3D scene is client-side only (using dynamic import with `ssr: false`)
- Contact form is currently a mock implementation (no backend)
- Page transitions use Framer Motion's AnimatePresence
- All animations follow a smooth, minimal aesthetic

## 🎯 Performance

- Lazy loading for 3D components
- Optimized images and assets
- Minimal JavaScript bundle size
- Server-side rendering where appropriate

## 📄 License

See LICENSE file for details.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
