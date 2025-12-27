# RAG Playground - Interactive AI Learning Platform

An educational, Netflix-style web application that teaches users 8 different RAG (Retrieval Augmented Generation) architectures through interactive visualizations and live demos.

## 🎯 Features

- **8 RAG Architectures**: Explore Naive RAG, Multimodal RAG, HyDE, Corrective RAG, Graph RAG, Hybrid RAG, Adaptive RAG, and Agentic RAG
- **Interactive Flowcharts**: Animated visualizations showing how data flows through each architecture
- **Live Demos**: Try each architecture with interactive demos (no real API calls needed)
- **Code Examples**: View implementation code in Python and TypeScript
- **Comparison Mode**: Compare up to 3 architectures side-by-side
- **Beautiful UI**: Netflix-inspired dark theme with smooth animations

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + custom components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
rag-playground/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── playground/
│   │   └── page.tsx        # Main playground interface
│   ├── api/
│   │   └── demo/
│   │       └── route.ts    # Mock API for demos
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── Navigation.tsx      # Top navigation
│   ├── Hero.tsx            # Landing page hero
│   ├── RAGArchitecture.tsx # Architecture detail view
│   ├── InteractiveFlow.tsx # Animated flowchart
│   ├── DemoPanel.tsx       # Interactive demo interface
│   ├── CodeViewer.tsx      # Code snippet viewer
│   └── ComparisonMatrix.tsx # Architecture comparison
├── lib/
│   ├── ragArchitectures.ts # Architecture configurations
│   ├── mockData.ts         # Sample data
│   └── utils.ts            # Utility functions
└── package.json
```

## 🎨 Design System

### Colors
- Background: `#141414` (main), `#1a1a1a` (cards), `#0a0a0a` (darker)
- Primary: `#e50914` (Netflix red)
- Accent: `#00d4ff` (electric blue)
- Text: `#ffffff` (primary), `#b3b3b3` (secondary), `#808080` (tertiary)

### Typography
- Headings & Body: Inter
- Code: JetBrains Mono

## 🎮 Usage

1. **Landing Page**: Start at the home page to see the hero section and feature highlights
2. **Playground**: Navigate to `/playground` to explore architectures
3. **Select Architecture**: Click on any architecture from the left panel
4. **Run Demo**: Use the demo panel to try queries and see the flow animation
5. **Compare**: Click "Compare" to compare multiple architectures side-by-side
6. **View Code**: Expand code snippets to see implementation examples

## 🏗️ Architecture Details

Each architecture includes:
- Animated flow diagram
- Interactive demo
- Code examples (Python & TypeScript)
- Pros and cons
- Use cases
- Best for recommendations

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy (Vercel will auto-detect Next.js)

The app is optimized for Vercel's free tier with:
- ISR (Incremental Static Regeneration)
- Edge functions
- Optimized images
- Minimal API calls

## 📝 License

MIT

## 🙏 Acknowledgments

Built to help AI learners worldwide understand RAG architectures through interactive learning.

---

Made with ❤️ for the AI community

