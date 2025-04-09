
# Convention Events Platform

## 🚀 Overview

A comprehensive event management platform for tech conferences and conventions, featuring dynamic event pages, interactive elements, user-friendly navigation, responsive design for all devices, and full CMS capabilities.

![Convention Events Platform](https://via.placeholder.com/800x400?text=Convention+Events+Platform)

## ✨ Key Features

- **Multiple Event Support**: Manage various events with their own branding and content
- **Content Management System**: Full CMS functionality for managing speakers, agenda, resources, and more
- **Interactive Particle Backgrounds**: Dynamic particle canvas backgrounds for enhanced visual appeal
- **Google Calendar Integration**: Seamless event scheduling with Google Calendar
- **Responsive Design**: Fully responsive across all devices from mobile to desktop
- **Interactive Components**: Speaker carousels, agenda sections, and dynamic navigation
- **Dark Mode Support**: Complete light/dark mode theming for better accessibility
- **Live Countdown**: Dynamic countdowns to event start dates
- **Animated UI**: Smooth animations and transitions for a premium feel

## 📋 Project Structure

The project follows a modular component-based architecture:

```
src/
├── components/    # Reusable UI components
├── data/          # Data files and mock data for events
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
├── services/      # CMS and data services
├── types/         # TypeScript interfaces and types
├── utils/         # Helper utilities
├── App.tsx        # Main app component
└── main.tsx       # Application entry point
```

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: React Query
- **Icons**: Lucide React
- **Notifications**: Sonner toast notifications
- **Interactive Backgrounds**: Custom canvas particle system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- Git for version control

### Installation

1. Clone the repository:
```sh
git clone https://github.com/your-username/convention-events-platform.git
cd convention-events-platform
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 🔧 Content Management System

The application includes a full CMS functionality that allows administrators to:

### Accessing the CMS

To access the CMS functionality:
1. Navigate to `/admin` in the application
2. Use the sidebar to access different content sections
3. Add, edit, or delete content as needed

### Managing Events

The CMS allows you to:
1. Create, edit, and delete events
2. Set event details such as title, date, location, description
3. Control visibility with publish/unpublish options
4. Feature important events

### Managing Speakers

You can:
1. Add speakers with profiles, bios, and social links
2. Associate speakers with specific events
3. Feature prominent speakers

### Managing Agenda

The agenda management system enables you to:
1. Create multi-day agenda with multiple tracks
2. Organize sessions by type (talks, workshops, breaks)
3. Link sessions with speakers
4. Set times, locations, and descriptions for each session

### Managing Resources

For event resources, you can:
1. Upload and categorize event resources
2. Add descriptions and type classifications
3. Support various file types and media

## 📱 Responsive Design

The platform is fully responsive and works well on:
- Mobile phones (portrait and landscape)
- Tablets
- Desktops and laptops
- Large displays

## 🎨 Particle Background

Dynamic particle backgrounds enhance the visual appeal:
1. Interactive particles that react to mouse movement
2. Event branding with particle colors matching event themes
3. Customizable density and color settings
4. Performance optimized for all devices

## 🚢 Deployment

### Build for Production

```sh
npm run build
```

This will create optimized production files in the `dist` directory.

### Deployment Options

1. **Static Hosting** (Recommended):
   - Deploy to Netlify, Vercel, or GitHub Pages
   - Simply connect your repository and configure build settings

2. **Traditional Hosting**:
   - Upload the contents of the `dist` directory to your web server
   - Ensure all requests are redirected to index.html for client-side routing

3. **Docker Deployment**:
   - Build a Docker image using a custom Dockerfile
   - Deploy to any container orchestration platform

## 🧪 Debugging

To debug the application effectively:

1. **Client-side Debugging**:
   - Use browser developer tools (F12)
   - Check the Console tab for errors and logs
   - Use React DevTools for component inspection
   - Enable debug mode in the application with `localStorage.setItem('debug', 'true')`

2. **Build Issues**:
   - Check for TypeScript errors in the terminal
   - Verify that all dependencies are correctly installed
   - Clear cache and node_modules if needed: `rm -rf node_modules && npm install`

3. **CMS-Related Issues**:
   - Check the browser console for API errors
   - Verify data structures match the expected types
   - Ensure permissions are correctly set up

4. **Common Error Solutions**:
   - Invalid state updates: Check that all React state updates are wrapped in the appropriate functions
   - Type errors: Ensure all data structures match their TypeScript interfaces
   - Rendering issues: Verify that conditional rendering is correctly implemented
   - Event handling: Make sure event handlers use the correct event types

## 🧩 Future Enhancements

Planned features for future releases:

1. User authentication and registration
2. Personalized schedules for attendees
3. Real-time chat and networking features
4. Analytics dashboard for event organizers
5. Integration with payment gateways for ticket sales

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
