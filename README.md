# National Theater Ticketing System

A modern, responsive, and user-friendly ticketing system for the National Theater, built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎭 Browse upcoming shows and events
- 🎟️ Secure ticket purchasing and management
- 🔐 User authentication with Google OAuth
- 📱 Fully responsive design
- 🌓 Dark mode support
- ⚡ Fast performance with Next.js 16

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vlex127/national-theater-ticketing-system.git
   cd national-theater-ticketing-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **UI Components**: Shadcn/ui
- **Form Handling**: React Hook Form
- **Icons**: Lucide Icons
- **Deployment**: Vercel

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
