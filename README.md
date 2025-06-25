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

#### Option 1: Standard Development
```bash
npm run dev
```

#### Option 2: Development with Email Testing (Recommended)
```bash
# Install MailDev globally (one time setup)
npm install -g maildev

# Run development server with email testing
npm run dev:full
```

This will start:
- Next.js app on `http://localhost:3000`
- MailDev email interface on `http://localhost:1080`

## 📧 Email Configuration

### Development (MailDev)
For testing emails locally, use MailDev:
```env
EMAIL_HOST="localhost"
EMAIL_PORT="1025"
EMAIL_USER=""
EMAIL_PASS=""
```

### Production (Gmail)
For production, use Gmail with App Password:
```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your_gmail@gmail.com"
EMAIL_PASS="your_16_character_app_password"
```

**Setting up Gmail App Password:**
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account Settings > Security > App Passwords
3. Generate a new app password
4. Use this 16-character password in `EMAIL_PASS`

## 🌐 Deployment

### Environment Variables for Production
Update these variables for your deployment:

```env
BETTER_AUTH_URL="https://yourdomain.com"  # Your deployed app URL
DATABASE_URL="your_production_mongodb_url"
BETTER_AUTH_SECRET="your_production_secret"
# ... other variables same as development
```

### Recommended Platforms

#### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

#### Other Options
- Netlify
- Railway
- Render
- AWS/Azure/GCP

## 📱 Usage

### Authentication Flow

1. **Signup**: `/signup`
   - Enter email and password
   - Receive verification email
   - Click verification link
   - Automatic login after verification

2. **Login**: `/login`
   - Email/password or Google OAuth
   - Forgot password link available

3. **Forgot Password**: `/forgot-password`
   - Enter email address
   - Receive reset link via email
   - Reset password securely

4. **Dashboard**: `/dashboard`
   - Protected route for authenticated users
   - Session management

### API Endpoints

- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/custom-verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

## 🎨 Customization

### Theme Colors
The app uses a dark purple theme. Main colors:
- Background: `#1E0A29`
- Primary: Purple variants
- Text: White/Gray variants

### Components
- Located in `src/components/`
- Reusable UI components in `src/components/ui/`
- Page components in `src/components/pages/`

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run dev:mail     # Start MailDev only
npm run dev:full     # Start both Next.js and MailDev
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🛡️ Security Features

- Password hashing with Better Auth
- Secure session cookies
- CSRF protection
- Email verification required
- Rate limiting on auth endpoints
- Secure password reset flow

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── api/auth/       # Authentication API routes
│   ├── dashboard/      # Protected dashboard
│   ├── login/          # Login page
│   ├── signup/         # Signup page
│   └── ...
├── components/         # React components
│   ├── Auth/          # Auth-specific components
│   ├── pages/         # Page components
│   └── ui/            # Reusable UI components
├── lib/               # Utility libraries
│   ├── auth.ts        # Better Auth configuration
│   ├── email.ts       # Email service
│   └── schema/        # Validation schemas
└── generated/         # Prisma generated files
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Email verification not working**
   - Check `BETTER_AUTH_URL` matches your domain
   - Verify email service configuration
   - Check spam folder

2. **Database connection issues**
   - Verify MongoDB connection string
   - Ensure database is accessible
   - Check Prisma schema sync

3. **OAuth not working**
   - Verify Google OAuth credentials
   - Check redirect URLs in Google Console
   - Ensure environment variables are set

### Getting Help

- Create an issue for bugs
- Check existing issues for solutions
- Review the Better Auth documentation

---

Built with ❤️ using Next.js and Better Auth
