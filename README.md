# 📚 Bestseller‑Anatomy

A comprehensive narrative analytics platform that decodes the DNA of bestsellers through multi-dimensional analysis. By examining structural patterns, emotional arcs, and narrative techniques across successful novels, this project reveals the underlying mechanics that make stories resonate with readers. The project consists of two main components:

1. A proprietary analysis engine (closed source) that powers the metrics
2. An open-source web interface that provides:
   - Deep insights into what makes bestsellers successful through comprehensive analysis of successful fictions
   - Interactive metrics dashboard for analyzing your own manuscript

## 🚀 Live Demo

👉 Analysis showcase: [https://v0-bestseller-website-design.vercel.app/](https://v0-bestseller-website-design.vercel.app/)

The demo has two main features:
- **Anatomy of a Bestseller** – Explore detailed insights and patterns from our analysis of successful novels, revealing the key elements that make stories resonate with readers
- **Analyze My Book** – Upload your manuscript (TXT) to receive a comprehensive metrics dashboard showing how your story compares to bestseller patterns

## 🔮 Coming Soon

### Predictive Analytics Engine
- **Bestseller Probability Score**: Get an AI-powered prediction of your manuscript's potential success
- **Success Factors Analysis**: Understand which elements contribute to or detract from your book's bestseller potential
- **Comparative Market Analysis**: See how your book compares to current market trends
- **Optimization Suggestions**: Receive data-driven recommendations to improve your manuscript's market potential

### How It Works
1. Upload your manuscript
2. Our AI analyzes your text against our bestseller database
3. Receive a comprehensive probability score
4. Get detailed insights into:
   - Market fit
   - Reader engagement potential
   - Competitive positioning
   - Optimization opportunities

## 🔍 Project Architecture

### 1) Analysis Engine (Proprietary)

The core analysis engine is built on extensive research and machine learning models. While the engine itself is not open source, here's what it does:

#### Research Foundation
- Analyzed 80 contemporary bestsellers (≈ 8.3 M words)
- Developed proprietary scoring algorithms
- Implemented advanced NLP techniques

#### Technical Stack
| Category | Libraries/Tools | Purpose |
|----------|----------------|---------|
| Deep Learning & NLP | PyTorch, Transformers | BERT-based text analysis and inference |
| Scientific Computing | NumPy, SciPy | Numerical operations and statistical analysis |
| Data Processing | Pandas | Data manipulation and analysis |
| Classical ML & Statistics | scikit-learn | Model preparation and metrics |
| Language Modeling | SpaCy, Gensim, NLTK | Tokenization, embeddings, word vectors |
| Visualization | Matplotlib | Statistical plots and analysis visualization |
| System Tools | os, pathlib, json, re, time | File management, regex, debugging |
| Environment | Google Colab GPU | CUDA acceleration for processing |

#### Key Capabilities
- Chapter-level sentiment analysis
- Emotional arc tracking
- Pacing and tension measurement
- Style and readability metrics
- Temporal and sensory analysis

#### Output Metrics
- ~100 raw metrics per chapter
- ~200 derived features
- Statistical validation
- Pattern recognition
- Archetype identification

### 2) Web Interface (Open Source)

This repository contains the open-source web interface that connects to the analysis engine. It provides:

#### Features
- TXT file upload
- Real-time analysis processing
- Interactive visualizations
- Comprehensive dashboards
- Export capabilities

#### Technical Implementation

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | Next.js 14, React 19 | User interface and interactions |
| File Processing | Supabase Storage | Secure file handling |
| Analysis Pipeline | Edge Functions | Serverless processing |
| Data Storage | Supabase Postgres | Metrics persistence |
| Visualization | Plotly.js, Recharts | Interactive charts |

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Component Library**: Radix UI
- **Form Handling**: React Hook Form with Zod validation
- **Data Visualization**: Plotly.js, Recharts
- **Database**: Supabase
- **State Management**: React Hooks
- **Date Handling**: date-fns

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd bestseller_anatomy
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🏃‍♂️ Development

Run the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Build

To create a production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## 📁 Project Structure

```
bestseller_anatomy/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
│
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── tabs/             # Tab-related components
│   ├── book-dashboard.tsx    # Book analysis dashboard
│   ├── chart-viewer.tsx      # Data visualization components
│   ├── nav-tabs.tsx          # Navigation components
│   ├── podcast-player.tsx    # Audio content player
│   └── table-of-contents.tsx # Content navigation
│
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── public/              # Static assets
├── styles/              # Global styles and Tailwind configurations
│
├── next.config.mjs      # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── postcss.config.mjs   # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## 📊 Data Visualization

The web interface includes multiple visualization types for comprehensive analysis:

### Distribution Analysis
- **Scatter/Bubble Plots**: Readability vs. length distribution, cluster analysis
- **Box/Violin Plots**: Chapter length distribution, word count variance

### Progress Analysis
- **Line/Area Charts**: Emotional flow, pacing variations, peak points across chapters
- **Timeline/Step Charts**: Structural turning points (Disturbance, Doorways, Midpoint)
- **Progress Indicators**: Chapter-by-chapter advancement

### Comparative Analysis
- **Bar/Column Charts**: Genre-based average reading times, feature comparisons
- **Stacked/100% Stacked Bars**: Character traits, narrative POV, mood distributions
- **Donut/Pie Charts**: Sensory balance (visual-auditory-tactile ratios)

### Key Metrics
- **KPI Cards**: 
  - Readability scores
  - Word counts
  - Average chapter length
  - Key success metrics

### Interactive Features
- Zoom and pan capabilities
- Tooltip information
- Dynamic filtering
- Export functionality

## 📝 License

GNU General Public License v3.0 (GPL-3.0)

This project is licensed under the GPL-3.0 License. Commercial use is not permitted.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ℹ️ Note

This repository contains only the web interface code. The analysis engine that powers the metrics is proprietary and not included in this repository.