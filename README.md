
# Event Management Platform

## 🚀 Overview

This is a comprehensive event management platform for tech conferences and conventions. It features dynamic event pages, interactive elements, user-friendly navigation, and responsive design for all devices.

![Project Screenshot](https://via.placeholder.com/800x400?text=Event+Management+Platform)

## ✨ Features

- **Multiple Event Support**: Manage various events with their own branding and content
- **Responsive Design**: Fully responsive across all devices from mobile to desktop
- **Interactive Components**: Speaker carousels, agenda sections, and dynamic navigation
- **Dark Mode Support**: Complete light/dark mode theming for better accessibility
- **Real-time Chat**: Interactive chatbot for answering event-related questions
- **Live Countdown**: Dynamic countdowns to event start dates
- **Animated UI**: Smooth animations and transitions for a premium feel
- **Accessibility**: ARIA-compliant components for better accessibility

## 📋 Project Structure

The project follows a modular component-based architecture:

```
src/
├── components/     # Reusable UI components
├── data/           # Data files for events
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components
├── App.tsx         # Main app component
└── main.tsx        # Application entry point
```

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Animation**: CSS transitions and Tailwind animations
- **State Management**: React Query
- **Icons**: Lucide React

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

## 🔧 Configuration

### Adding New Events

To add a new event, follow these steps:

1. Create event data in `src/data/events.ts`
2. Add speaker data in `src/data/speakers-data.ts`
3. Add FAQ data in `src/data/faqs-data.ts`
4. Add about/highlights data in `src/data/about-data.ts`
5. Create an event-specific data file (following the pattern of `rvs-event-data.ts`)

### Branding Colors

Each event has its own branding colors defined in `tailwind.config.ts`:

```ts
// Example of event color configuration
rvs: {
  primary: '#FF6479',
  secondary: '#D3E4FD',
  accent: '#9b87f5',
  light: '#FFDEE2',
}
```

## 📱 Responsive Design

The application is fully responsive with specific optimizations:

- **Mobile**: Simplified navigation with Back to Top button
- **Tablet**: Optimized layouts for medium-sized screens
- **Desktop**: Full navigation and expanded content sections

## 🔒 Security

### Best Practices

- No sensitive data stored in client-side code
- All API routes should be authenticated when integrated
- Regular dependency updates via npm audit
- Content Security Policy (CSP) headers should be configured in production

### Production Considerations

1. Enable HTTPS and configure proper security headers
2. Implement rate limiting on any API endpoints
3. Consider using a CDN for static assets
4. Set up proper CORS policies if using separate API backends

## 📊 Performance Optimization

- Code splitting for better load times
- Optimized image loading with proper sizing
- Lazy loading of content below the fold
- Efficient state management to prevent unnecessary re-renders

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

### Environment Variables

Create a `.env` file in the root directory for any environment-specific configuration:

```
VITE_API_URL=https://your-api-endpoint.com
```

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
