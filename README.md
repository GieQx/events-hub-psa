
# Convention Events Hub

A comprehensive platform for managing and showcasing convention events with dynamic content, responsive design, and interactive features.

## 🚀 Features

- **Multi-event Management**: Display and manage multiple convention events
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Interactive Components**: 
  - Speaker carousel
  - Event agenda with detailed schedules
  - Chatbot for answering attendee questions
  - Countdown timers to upcoming events
  - Back-to-top navigation
- **Branding Control**: Each event has its own color scheme and branding
- **Dark/Light Mode**: Toggle between light and dark themes

## 📋 Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher) or yarn (v1.22.0 or higher)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/convention-events-hub.git
   cd convention-events-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Access the application at [http://localhost:5173](http://localhost:5173)

## 🏗️ Building for Production

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Preview the production build locally:
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## 🚢 Deployment

The project is configured to be deployed on GitHub Pages. To deploy:

1. Update the `base` property in `vite.config.js` to match your repository name:
   ```javascript
   base: '/your-repo-name/',
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Push the dist folder to GitHub Pages
   ```

## 💻 CMS Integration Options

To make this a dynamic CMS-driven website, consider these options:

### 1. Headless CMS Integration

You can integrate with headless CMS platforms like:
- **Contentful**: Great for structured content management
- **Sanity.io**: Offers real-time collaboration features
- **Strapi**: Open-source with self-hosting options

Implementation steps:
1. Set up content models in your chosen CMS
2. Create API keys for secure access
3. Install the CMS client library: `npm install @contentful/rich-text-react-renderer`
4. Create API service files to fetch content
5. Replace static data with dynamic API calls

### 2. Firebase Integration

For a complete solution with authentication and data storage:

1. Create a Firebase project
2. Set up Firestore for content storage
3. Configure Firebase Authentication for admin access
4. Install Firebase: `npm install firebase`
5. Create content management interfaces for admins

### 3. Custom Backend

For complete control:
1. Create a Node.js/Express backend
2. Set up MongoDB or PostgreSQL for data storage
3. Build RESTful APIs for content management
4. Implement JWT authentication for admin access

## 🔐 Security Considerations

- **API Keys**: Store sensitive keys in environment variables
- **Authentication**: Implement proper authentication for admin access
- **Data Validation**: Validate all user inputs and CMS data
- **CORS Configuration**: Set appropriate CORS policies
- **Rate Limiting**: Implement API rate limiting to prevent abuse

## 🧪 Testing

Run tests with:
```bash
npm test
# or
yarn test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Project Maintainer - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/yourusername/convention-events-hub](https://github.com/yourusername/convention-events-hub)
