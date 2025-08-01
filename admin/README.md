# Admin Dashboard - alamin.rocks

Modern admin dashboard for managing portfolio content built with Next.js 14.

## Features

### 🔐 Authentication
- Simple login system (demo: admin/admin123)
- Protected routes with authentication wrapper
- Persistent session management

### 📊 Dashboard Overview
- Statistics cards showing key metrics
- Recent activity feed
- Quick action buttons
- Modern Solarized theme matching main site

### 💬 Contact Messages Management
- View all contact form submissions
- Filter by status (unread, read, replied)
- Detailed message viewer with reply functionality
- Mark messages as read/replied

### 🚀 Portfolio Projects Management
- Complete CRUD operations for projects
- Rich project form with technology tags
- Featured project management
- Direct links to GitHub and live demos

### 📄 Resume Content Management
- Edit contact information
- Manage executive summary points
- Update skills categories
- Quick stats overview

### ⚙️ Settings
- Profile management
- Notification preferences
- Security settings
- Data export/import

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS with Solarized theme
- **UI Components**: Custom components with Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **API**: Axios for HTTP requests
- **TypeScript**: Full type safety

## Architecture

```
admin/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── login/          # Authentication
│   │   ├── messages/       # Contact management
│   │   ├── projects/       # Portfolio management
│   │   ├── resume/         # Resume management
│   │   └── settings/       # Admin settings
│   ├── components/         # Reusable components
│   │   ├── ui/            # Base UI components
│   │   ├── Dashboard/     # Dashboard-specific components
│   │   └── Projects/      # Project management components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilities and API client
│   └── types/             # TypeScript type definitions
```

## Design System

### Colors (Solarized)
- **Light Theme**: Clean, professional look with warm tones
- **Dark Theme**: Easy on the eyes with proper contrast
- **Accent**: Green (#859900) for primary actions
- **Status Colors**: 
  - Success: Green
  - Warning: Yellow  
  - Error: Red
  - Info: Blue

### Typography
- **Font**: JetBrains Mono for consistency with main site
- **Hierarchy**: Clear heading structure
- **Readability**: Optimized line heights and spacing

### Layout
- **Sidebar Navigation**: Fixed sidebar with clear sections
- **Header**: User profile and theme toggle
- **Content Area**: Responsive grid layouts
- **Cards**: Consistent card-based design

## Development

### Setup
```bash
cd admin
npm install
npm run dev
```

### Build
```bash
npm run build
npm start
```

### Environment Variables
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## API Integration

The admin dashboard integrates with the FastAPI backend:

- **Contact API**: `/api/v1/contact/`
- **Portfolio API**: `/api/v1/portfolio/`
- **Resume API**: `/api/v1/resume/`

Currently uses mock data for demonstration. Update the API client in `src/lib/api.ts` to use real endpoints.

## Authentication

Simple token-based authentication:
- Demo credentials: `admin` / `admin123`
- Token stored in localStorage
- Auto-redirect on authentication failure

## Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Tablet**: Adjusted layouts for medium screens
- **Desktop**: Full-featured layout with sidebar

## Performance

- **Code Splitting**: Automatic with Next.js App Router
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Next.js Image component
- **Minimal Bundle**: Tree-shaking and minification

## Deployment

Ready for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Docker containers

## Next Steps

1. **Real Authentication**: Implement JWT-based auth
2. **API Integration**: Connect to live backend APIs
3. **File Upload**: Add image upload for projects
4. **Analytics**: Integrate analytics dashboard
5. **Bulk Operations**: Add bulk edit/delete features
6. **Export/Import**: Data backup and restore
7. **User Management**: Multi-admin support
8. **Audit Logs**: Track all admin actions