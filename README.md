
# Event Management Platform

## 🚀 Overview

This is a comprehensive event management platform for tech conferences and conventions. It features dynamic event pages, interactive elements, user-friendly navigation, responsive design for all devices, and full CMS capabilities.

![Project Screenshot](https://via.placeholder.com/800x400?text=Event+Management+Platform)

## ✨ Features

- **Multiple Event Support**: Manage various events with their own branding and content
- **Content Management System**: Full CMS functionality for managing speakers, agenda, resources, and more
- **Interactive Particle Backgrounds**: Dynamic particle canvas backgrounds for enhanced visual appeal
- **Google Calendar Integration**: Seamless event scheduling with Google Calendar
- **Responsive Design**: Fully responsive across all devices from mobile to desktop
- **Interactive Components**: Speaker carousels, agenda sections, and dynamic navigation
- **Dark Mode Support**: Complete light/dark mode theming for better accessibility
- **Real-time Chat**: Interactive chatbot for answering event-related questions
- **Live Countdown**: Dynamic countdowns to event start dates
- **Animated UI**: Smooth animations and transitions for a premium feel
- **Enhanced Security**: Data validation, input sanitization, and security best practices
- **Accessibility**: ARIA-compliant components for better accessibility

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
- **Animation**: Framer Motion and CSS animations
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
git clone https://your-git-url/event-management-platform.git
cd event-management-platform
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

1. **Manage Events**:
   - Create, edit, or delete events
   - Control event visibility with publish/unpublish options
   - Feature important events

2. **Manage Speakers**:
   - Add speakers with profiles, bios, and social links
   - Associate speakers with specific events
   - Feature prominent speakers

3. **Manage Agenda**:
   - Create multi-day agenda with multiple tracks
   - Organize sessions by type (talks, workshops, breaks)
   - Link sessions with speakers

4. **Manage Resources**:
   - Upload and categorize event resources
   - Track downloads and engagement
   - Support various file types and media

5. **Manage Other Content**:
   - FAQs, topics, partners, and more
   - Organize content with categories and tags

### Using the CMS

To access the CMS functionality:
1. Navigate to `/admin` in the application
2. Use the sidebar to access different content sections
3. Add, edit, or delete content as needed

## 🔒 Security Features

The application implements various security measures:

1. **Input Validation**: All user inputs are validated against allowed patterns
2. **Data Sanitization**: Text inputs are sanitized to prevent XSS attacks
3. **CSRF Protection**: Token-based protection for forms and API calls
4. **Rate Limiting**: Throttling to prevent abuse of API endpoints
5. **Secure Data Storage**: Data encryption for sensitive information
6. **Security Headers**: Implementation of recommended security headers

## 📅 Google Calendar Integration

The application features seamless Google Calendar integration:

1. **Add to Calendar**: Event attendees can add events to their Google Calendar with one click
2. **Event Details**: Automatic population of event title, description, location, and date/time
3. **Custom Reminders**: Option to set custom reminders when adding to calendar

## 🎨 Particle Background

Dynamic particle backgrounds enhance the visual appeal:

1. **Interactive Particles**: Particles react to mouse movement
2. **Event Branding**: Particle colors match event branding
3. **Customizable**: Adjust density, color, and interactivity
4. **Performance Optimized**: Efficiently rendered for all devices

## 🚢 Deployment

### Build for Production

```sh
npm run build
```

This will create optimized production files in the `dist` directory.

### Deployment Options

1. **Static Hosting** (Recommended):
   - Netlify, Vercel, or GitHub Pages
   - Simply connect your repository and configure build settings

2. **Traditional Hosting**:
   - Upload the contents of the `dist` directory to your web server
   - Ensure all requests are redirected to index.html for client-side routing

3. **Docker Deployment**:
   - Build a Docker image using the provided Dockerfile
   - Deploy to any container orchestration platform

## 🧪 Testing

Run tests with:

```sh
npm test
```

The project uses Vitest for unit testing and Cypress for E2E testing.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions, please open an issue in the repository or contact the maintainers directly.
