# Imad's Portfolio

A modern, bilingual portfolio website showcasing projects and expertise in web development. Built with cutting-edge technologies featuring 3D animations, smooth scrolling, and a headless CMS for content management.

## 🚀 Features

- **Bilingual Support**: English and Arabic language support with RTL layout
- **3D Animations**: Interactive 3D elements using Three.js and React Three Fiber
- **Smooth Animations**: Powered by Framer Motion and Lenis for buttery smooth scrolling
- **Headless CMS**: Content management with Sanity.io
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Contact Form**: Integrated contact form with email notifications via Resend
- **SEO Optimized**: Built with Next.js for optimal performance and SEO
- **Analytics**: Google Analytics integration

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion, Lenis
- **CMS**: Sanity.io
- **Internationalization**: next-intl
- **Email**: Resend
- **Icons**: Lucide React, React Icons
- **Fonts**: Geist (optimized by Next.js)

## 📋 Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Sanity account (for content management)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd imadportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Copy `.env.local` and configure the following variables:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_BASE_URL=http://localhost:3000/
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Set up Sanity CMS**

   - Create a Sanity project at [sanity.io](https://sanity.io)
   - Configure your project ID in the environment variables
   - The schema types are already defined in `sanity/schemaTypes/`

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 📁 Project Structure

```
imadportfolio/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── ar/                # Arabic pages
│   ├── en/                # English pages
│   └── studio/            # Sanity Studio
├── components/            # React components
│   ├── Home/             # Homepage sections
│   ├── Blogs/            # Blog components
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── public/               # Static assets
├── sanity/               # Sanity configuration
│   ├── lib/             # Sanity client and utilities
│   └── schemaTypes/     # Content schemas
└── ...
```

## 🎨 Customization

### Content Management

- Use Sanity Studio at `/studio` to manage content
- Add projects, blogs, testimonials, and reviews
- All content supports both English and Arabic

### Styling

- Modify Tailwind CSS classes in components
- Update global styles in `app/globals.css`
- Customize 3D scenes in `components/Hero3D.jsx`

### Adding New Sections

1. Create components in `components/Home/`
2. Import and add to the main page component
3. Update navigation if needed

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 📞 Contact

For inquiries or collaborations, use the contact form on the website or reach out directly.

---

Built with ❤️ by Imad
