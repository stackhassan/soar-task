# Soar Task - Financial Management Dashboard

A comprehensive React-based financial management application that provides intuitive financial tracking with advanced data visualization and responsive design.

## Features

- 📊 Dynamic financial dashboard with real-time updates
- 💳 Credit card management with interactive card displays
- 📈 Advanced data visualization using ApexCharts
- 💸 Quick transfer functionality with user selection
- 📱 Mobile-first responsive interface
- 🎨 Modern design with Tailwind CSS and shadcn/ui
- 🔄 State management with Redux and React Query

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux Toolkit + TanStack Query
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: ApexCharts
- **Form Handling**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd soar-task
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run preview` - Serves the production build locally
- `npm run lint` - Runs ESLint
- `npm run type-check` - Runs TypeScript type checking

## Project Structure

```
soar-task/
├── client/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── data/         # Mock JSON data
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store setup
│   │   └── App.tsx       # Main application component
├── server/               # Backend server code
├── shared/              # Shared types and utilities
└── public/              # Static assets
```

## Component Guidelines

- Components are organized by feature and reusability
- UI components are built using shadcn/ui components
- Lazy loading is implemented for route-level code splitting
- State management uses Redux for global state and React Query for server state

## Development Guidelines

1. **Code Style**
   - Follow TypeScript best practices
   - Use functional components with hooks
   - Implement proper error handling
   - Write meaningful component and variable names

2. **Performance**
   - Implement lazy loading where applicable
   - Optimize images and assets
   - Use proper memoization techniques
   - Monitor bundle size

3. **Accessibility**
   - Follow WCAG guidelines
   - Implement proper keyboard navigation
   - Use semantic HTML elements
   - Include proper ARIA attributes

4. **State Management**
   - Use Redux for global application state
   - Implement React Query for server state management
   - Follow proper data fetching patterns

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details
