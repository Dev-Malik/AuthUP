# AuthUp - Complete Authentication System

A modern, full-featured authentication system built with Next.js, Better Auth, and MongoDB. Features a beautiful dark purple theme and comprehensive email verification system.

## ✨ Features

- **User Authentication**
  - Email/Password signup and login
  - Google OAuth integration
  - Email verification with custom UI
  - Forgot password functionality
  - Password reset system

- **Security**
  - Secure session management
  - Email verification required for signup
  - Password reset tokens
  - Protected routes and API endpoints

- **UI/UX**
  - Beautiful dark purple theme
  - Responsive design
  - Loading states and error handling
  - Toast notifications with Sonner
  - Modern form components

- **Development Tools**
  - MailDev integration for email testing
  - TypeScript support
  - ESLint configuration
  - Prisma ORM with MongoDB

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Authentication**: Better Auth
- **Database**: MongoDB with Prisma ORM
- **Styling**: Tailwind CSS
- **Email**: Nodemailer (Gmail/MailDev)
- **UI Components**: Custom components with Shadcn/ui
- **Notifications**: Sonner

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Gmail account (for production emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd auth/signinprac
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_mongodb_connection_string"
   
   # Better Auth
   BETTER_AUTH_URL="http://localhost:3000"  # Change to your domain in production
   BETTER_AUTH_SECRET="your_secret_key_here"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   
   # Email Configuration
   EMAIL_HOST="smtp.gmail.com"          # Use "localhost" for MailDev
   EMAIL_PORT="587"                     # Use "1025" for MailDev  
   EMAIL_USER="your_gmail@gmail.com"    # Leave empty for MailDev
   EMAIL_PASS="your_app_password"       # Leave empty for MailDev
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
