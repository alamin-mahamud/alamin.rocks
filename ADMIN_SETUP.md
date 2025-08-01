# Admin Dashboard Setup Guide

This guide covers setting up and running the admin dashboard for alamin.rocks.

## Project Structure

```
alamin.rocks/
├── frontend/         # Main portfolio website (Next.js)
├── backend/          # API server (FastAPI)
├── admin/            # Admin dashboard (Next.js)
└── docker-compose.yml # Docker setup
```

## Quick Start

### Option 1: Docker (Recommended)

```bash
docker-compose up --build
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3082
- **Backend API**: http://localhost:8000
- **Database**: localhost:5432
- **Redis**: localhost:6379

### Option 2: Manual Setup

#### 1. Backend Setup (Required)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The backend will be available at http://localhost:8000

#### 2. Admin Dashboard Setup

```bash
cd admin
npm install
npm run dev
```

The admin dashboard will be available at http://localhost:3001

### 3. Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

## Features Overview

### 🔐 Authentication
- Simple login system with demo credentials
- Protected routes and persistent sessions
- Auto-redirect on authentication failure

### 📊 Dashboard
- Statistics overview with key metrics
- Recent activity feed
- Quick action buttons
- Real-time data from backend APIs

### 💬 Contact Management
- View all contact form submissions
- Filter by status (unread/read/replied)
- Detailed message viewer
- Direct reply functionality

### 🚀 Portfolio Management
- Full CRUD operations for projects
- Technology tag management
- Featured project toggles
- GitHub and live demo links

### 📄 Resume Management
- Edit contact information
- Manage executive summary
- Update skills and experience
- Real-time preview

## API Integration

The admin dashboard integrates with the FastAPI backend:

- **Contact API**: `GET/POST /api/v1/contact/`
- **Portfolio API**: `GET/POST/PATCH/DELETE /api/v1/portfolio/projects/`
- **Resume API**: `GET /api/v1/resume/`

## Design System

- **Theme**: Solarized (light/dark mode support)
- **Font**: JetBrains Mono (consistent with main site)
- **Colors**: Professional green accent (#859900)
- **Layout**: Clean, responsive design

## Development

### Environment Variables

Create `.env.local` in the admin directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Code linting
```

### Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS
- **UI Components**: Custom components with Radix UI
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Date Handling**: date-fns

## Sample Data

The backend comes pre-populated with:

- **6 Portfolio Projects** (from frontend data)
- **8 Work Experiences** (complete career history)
- **4 Contact Messages** (realistic examples)
- **Complete Resume Data** (skills, education, awards)

## Production Deployment

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Admin Dashboard
```bash
cd admin
npm run build
npm start
```

### Docker Setup
```bash
docker-compose up --build
```

## Security Notes

⚠️ **Important**: This is a demo setup with simplified authentication.

For production use:
- Implement proper JWT-based authentication
- Add rate limiting and CORS policies
- Use environment variables for secrets
- Enable HTTPS/SSL certificates
- Add database persistence
- Implement proper user management

## Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check Python version (3.11+)
   - Verify all dependencies installed
   - Check port 8000 availability

2. **Admin login not working**
   - Ensure backend is running
   - Check API URL in browser network tab
   - Clear browser local storage

3. **API requests failing**
   - Verify CORS settings in backend
   - Check network connectivity
   - Confirm API endpoints in browser

### Useful Commands

```bash
# Check backend health
curl http://localhost:8000/health

# View backend logs
uvicorn app.main:app --reload --log-level debug

# Clear admin cache
rm -rf admin/.next
```

## Next Steps

1. **Database Integration**: Replace in-memory storage with PostgreSQL
2. **Real Authentication**: Implement JWT with refresh tokens
3. **File Upload**: Add image upload for project thumbnails
4. **Bulk Operations**: Enable bulk edit/delete actions
5. **Analytics**: Add Google Analytics integration
6. **Email Integration**: Connect to email service for contact forms
7. **Backup/Restore**: Implement data export/import features

## Support

For issues or questions:
- Check the README files in individual directories
- Review the API documentation at http://localhost:8000/api/docs
- Examine browser console for client-side errors