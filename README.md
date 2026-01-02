# Ragment 

A modern Next.js application that replicates the core functionality of Google's NotebookLM, allowing users to interact with their documents through AI-powered conversations.
### Server Repo - https://github.com/Uriyo/ragment-server.git



<img width="1460" height="797" alt="Screenshot 2025-12-17 at 8 52 30 PM" src="https://github.com/user-attachments/assets/d8c009e6-7fe0-47bd-b2bf-65afab4260c0" />

## Features

- 📄 **Document Upload & Management** - Upload and organize your documents for AI analysis
- 💬 **AI-Powered Chat Interface** - Interact with your documents through natural language conversations
- 🏠 **Dashboard & Home Views** - Intuitive interface for managing projects and documents
- 🎨 **Modern UI Components** - Built with reusable React components for a consistent experience
- 🔐 **Authentication System** - Secure user authentication and authorization

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: CSS/Tailwind CSS (via globals.css)
- **Configuration**: ESLint, PostCSS
- **Package Manager**: npm/yarn/pnpm

## Project Structure

```
CLIENT/
├── .next/                  # Next.js build output
├── node_modules/          # Dependencies
├── public/                # Static assets
│   └── favicon.ico        # Site favicon
├── src/
│   ├── app/               # App Router pages
│   │   ├── (auth)/        # Authentication routes
│   │   ├── (dashboard)/   # Dashboard routes
│   │   ├── home/          # Home page
│   │   ├── favicon.ico    # App favicon
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page component
│   ├── components/        # Reusable React components
│   │   ├── chat/          # Chat interface components
│   │   ├── home/          # Home page components
│   │   ├── layout/        # Layout components
│   │   ├── projects/      # Project management components
│   │   └── ui/            # UI library components
│   └── lib/               # Utility functions and helpers
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── next-env.d.ts         # Next.js TypeScript declarations
├── package.json          # Project dependencies
├── package-lock.json     # Lock file
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CLIENT
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```
NEXT_PUBLIC_API_URL=your_api_url
# Add other environment variables as needed
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Key Components

### Authentication
Located in `src/app/(auth)/`, handles user login, registration, and authentication flows.

### Dashboard
The main application interface in `src/app/(dashboard)/` where users manage their projects and documents.

### Chat Interface
Found in `src/components/chat/`, provides the conversational AI interface for interacting with documents.

### Project Management
Components in `src/components/projects/` handle project creation, organization, and management.

## Development

### Code Style

The project uses ESLint for code quality. Run linting with:
```bash
npm run lint
```

### TypeScript

This project is built with TypeScript. Type checking is automatic during development, but you can also run:
```bash
npx tsc --noEmit
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy!

### Other Platforms

The application can also be deployed to:
- AWS Amplify
- Netlify
- Docker containers
- Any Node.js hosting service

## Environment Variables

Required environment variables:

```
NEXT_PUBLIC_API_URL=         # Backend API endpoint
NEXT_PUBLIC_APP_URL=         # Frontend URL
# Add authentication variables
# Add other service API keys
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Google's NotebookLM
- Built with Next.js and React
- Powered by AI language models

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using Next.js
