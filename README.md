# Universal Knowledge Chatbot

AI powered chat for anything - A modern React application with intelligent chatbot capabilities and SSO authentication, built using the latest web technologies and best practices.

## 🚀 Tech Stack

### Core

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router Dom** - Client-side routing

### Authentication

- **Auth0** - Enterprise-grade authentication with Google SSO
- **Backend-first security** - No credentials exposed to frontend
- **HTTP-only cookies** - Secure session management

### API & Data Management

- **TanStack React Query** - Powerful data synchronization for React
- **Axios** - Promise-based HTTP client with interceptors

### Forms & Validation

- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema declaration and validation library

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible UI components
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful & consistent icons

### Code Quality & Development Tools

- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

## 🔧 Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd universal-knowledge-chatbot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your SSO provider settings:

   ```env
   VITE_API_URL=http://localhost:5000
   VITE_OIDC_AUTHORITY=https://your-identity-provider.com
   VITE_OIDC_CLIENT_ID=your-client-id
   VITE_OIDC_REDIRECT_URI=http://localhost:3000/auth/callback
   VITE_OIDC_POST_LOGOUT_URI=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## 🔐 SSO Configuration

This application supports major identity providers:

### Auth0

```env
VITE_OIDC_AUTHORITY=https://your-tenant.auth0.com
VITE_OIDC_CLIENT_ID=your-auth0-client-id
```

### Azure AD

```env
VITE_OIDC_AUTHORITY=https://login.microsoftonline.com/your-tenant-id/v2.0
VITE_OIDC_CLIENT_ID=your-azure-client-id
```

### Okta

```env
VITE_OIDC_AUTHORITY=https://your-org.okta.com
VITE_OIDC_CLIENT_ID=your-okta-client-id
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ProtectedRoute.tsx
│   └── AuthCallback.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── hooks/              # Custom React hooks
│   └── useApi.ts
├── pages/              # Page components
│   ├── LoginPage.tsx
│   └── HomePage.tsx
├── services/           # API and external services
│   ├── auth.service.ts
│   └── api.service.ts
├── config/             # Configuration files
│   └── index.ts
├── lib/                # Utility functions
│   └── utils.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🛡️ Security Features

- **Secure credential management** - No hardcoded secrets
- **Environment-based configuration** - Separate configs for different environments
- **OIDC/OAuth 2.0 compliance** - Industry-standard authentication
- **Automatic token renewal** - Silent token refresh
- **Protected routes** - Client-side route protection
- **API request interception** - Automatic token injection and error handling

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🧪 Testing & Coverage

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Quick coverage check (no watch mode)
npm test -- --coverage --watchAll=false

# Run specific test file
npm test -- --testPathPattern=HomePage.test.tsx

# Run tests matching a pattern
npm test -- --testNamePattern="should render"

# Run UI component tests only
npm run test:ui

# Run service layer tests only
npm run test:services
```

### Current Test Coverage

![Coverage Status](https://img.shields.io/badge/coverage-68.13%25-orange) ![Tests](https://img.shields.io/badge/tests-203%2F235%20passing-green) ![Test Suites](https://img.shields.io/badge/suites-9%2F12%20passing-yellow)

| Metric         | Current | Target | Status             |
| -------------- | ------- | ------ | ------------------ |
| **Statements** | 68.13%  | 80%    | 🟡 In Progress     |
| **Branches**   | 72.72%  | 75%    | 🟡 Close to Target |
| **Functions**  | 56.09%  | 80%    | 🔴 Needs Work      |
| **Lines**      | 69.08%  | 80%    | 🟡 In Progress     |

### Test Statistics

- **Total Tests**: 235
- **Passing Tests**: 203 (86.4% pass rate)
- **Failing Tests**: 32
- **Test Suites Passing**: 9/12

### Coverage by Component

| Component         | Statements | Branches | Functions | Lines  |
| ----------------- | ---------- | -------- | --------- | ------ |
| **UI Components** | 100%       | 100%     | 100%      | 100%   |
| **Pages**         | 87.24%     | 86.36%   | 90.62%    | 88.33% |
| **Contexts**      | 88.88%     | 50%      | 84.61%    | 88.23% |
| **Services**      | 44.95%     | 22.72%   | 48.38%    | 44.95% |

### How to Check Coverage

1. **Generate coverage report**:

   ```bash
   npm test -- --coverage --watchAll=false
   ```

2. **View detailed HTML report**:

   ```bash
   npm test -- --coverage --watchAll=false
   open coverage/lcov-report/index.html
   ```

3. **Coverage files are generated in**:
   - `coverage/` - HTML reports
   - `coverage/lcov-report/index.html` - Interactive coverage explorer

### Testing Strategy

- **Unit Tests**: Individual component and function testing
- **Integration Tests**: Component interaction testing
- **UI Testing**: User interaction and accessibility testing
- **API Testing**: Service layer and HTTP client testing

### Test Configuration

Tests are configured with:

- **Jest** - Test runner and framework
- **React Testing Library** - Component testing utilities
- **User Event** - User interaction simulation
- **jsdom** - DOM environment for testing

## 📦 API Integration

The application includes a complete API setup with:

- **Axios client** with automatic authentication
- **Request/response interceptors** for token management
- **React Query hooks** for data fetching and caching
- **Error handling** and retry logic
- **TypeScript types** for API responses

Example API usage:

```typescript
import { useProjects, useCreateProject } from '@/hooks/useApi';

const { data: projects, isLoading } = useProjects();
const createProject = useCreateProject();
```

## 🎨 UI Components

Built with shadcn/ui components for:

- Consistent design system
- Accessibility compliance
- Customizable themes
- TypeScript support

## 🔄 Development Workflow

1. **Git hooks** automatically format and lint code
2. **TypeScript** ensures type safety
3. **ESLint** catches potential issues
4. **Prettier** maintains consistent formatting

## 📱 Features

### Chatbot Features

- ✅ AI-powered conversations
- ✅ Universal knowledge base
- ✅ Real-time responses
- ✅ Context-aware interactions

### Authentication

- ✅ SSO login with OIDC
- ✅ Automatic token refresh
- ✅ Secure logout
- ✅ Protected routes
- ✅ Authentication state management

### User Interface

- ✅ Responsive design
- ✅ Dark/light theme support
- ✅ Smooth animations
- ✅ Loading states
- ✅ Error handling

### Development Experience

- ✅ Hot reload
- ✅ TypeScript support
- ✅ Code formatting
- ✅ Linting
- ✅ Git hooks

## 🚀 Deployment

The application is built with Vite and can be deployed to any static hosting service:

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

3. **Configure environment variables** on your hosting platform

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

Built with ❤️ using modern React, TypeScript, and AI technologies
