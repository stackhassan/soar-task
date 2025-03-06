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

The application will be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run preview` - Serves the production build locally
- `npm run lint` - Runs ESLint

## Project Structure

```
soar-task/
├── client/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store setup
│   │   └── App.tsx       # Main application component
└── public/              # Static assets
│   ├── data/ # Mocked API
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

## Screenshots

1. Desktop
![Screenshot 2025-03-06 at 12 01 23 PM](https://github.com/user-attachments/assets/d77289f9-0a09-413f-9dcc-12a4722edf94)
![Screenshot 2025-03-06 at 12 01 30 PM](https://github.com/user-attachments/assets/c5da3fac-25f9-47bd-b220-c8014210cf15)

2. Mobile

![Screenshot 2025-03-06 at 12 02 08 PM](https://github.com/user-attachments/assets/bf5dec9e-336a-4375-b9cd-79f84a651c23)
![Screenshot 2025-03-06 at 12 01 49 PM](https://github.com/user-attachments/assets/6c2bbc3c-ff8e-4c19-88bd-9773f8f2ea06)
![Screenshot 2025-03-06 at 12 01 58 PM](https://github.com/user-attachments/assets/367fe1cd-0801-4a5d-9824-c5dc128cddba)



