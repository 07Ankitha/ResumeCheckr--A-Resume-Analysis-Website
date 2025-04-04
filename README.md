# ResumeCheckr - AI-Powered Resume Analysis Platform

ResumeCheckr is a modern web application that helps users analyze and improve their resumes using AI technology. The platform provides detailed feedback, suggestions, and access to professional resume templates to help users create impactful resumes.

## 🚀 Features

### Resume Analysis
- **AI-Powered Analysis**: Get detailed feedback on your resume's content, structure, and formatting
- **Score System**: Receive an overall score with specific areas for improvement
- **Detailed Feedback**: Get strengths, weaknesses, and actionable recommendations
- **Low Score Alerts**: Special popup with template recommendations for low-scoring resumes

### Template Management
- **Categorized Templates**: Access both free and premium resume templates
- **Template Preview**: View templates before downloading
- **Secure Downloads**: Protected access to premium templates
- **Download Tracking**: Monitor template usage and popularity

### User Management
- **Secure Authentication**: User registration and login system
- **Profile Management**: Update user information and preferences
- **Session Management**: Secure session handling with NextAuth.js

### Contact System
- **Contact Form**: Easy-to-use form for user inquiries
- **Email Notifications**: Automatic email responses
- **Message Tracking**: Database storage of all communications

## 🛠️ Technologies Used

### Frontend
- **Next.js 14**: React framework for server-side rendering
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful hand-crafted SVG icons
- **React-PDF**: PDF viewer and renderer

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Prisma**: Modern database ORM
- **PostgreSQL**: Robust relational database
- **NextAuth.js**: Authentication and session management
- **Nodemailer**: Email handling

### AI & Processing
- **PDF.js**: PDF text extraction
- **Custom Analysis Algorithms**: Resume scoring and feedback generation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resumecheckr.git
   cd resumecheckr
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/resumecheckr"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="your-email@gmail.com"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Visit `http://localhost:3000` to see the application

## 📸 Screenshots

### Home Page
![Home Page](public/screenshots/home.png)
*The landing page showcasing the main features and call-to-action*

### Resume Analysis
![Resume Analysis](public/screenshots/analysis.png)
*The resume analysis page with AI-powered feedback*

### Templates
![Templates](public/screenshots/templates.png)
*The templates page with categorized resume templates*

### User Dashboard
![Dashboard](public/screenshots/dashboard.png)
*User dashboard showing analysis history and saved resumes*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- All contributors and users of the project
