# Customer Account Dashboard

A modern, responsive customer account dashboard built with Next.js 15, TypeScript, and Tailwind CSS. This application provides a comprehensive banking interface for customers to manage their accounts, view transactions, and perform fund transfers.

## 🔑 Login Credentials

To access the dashboard, use one of the following credentials:

### Admin User

- **Email**: `admin@interswitch.com`
- **Password**: `admin234`

### Regular User

- **Email**: `user@interswitch.com`
- **Password**: `user234`

## 🚀 Features

### Authentication

- Secure login system with form validation
- Session management with JWT tokens
- Automatic logout after inactivity (5-minute idle timer with warning modal)
- Protected routes for authenticated users only

### Account Management

- **Account Overview**: View all customer accounts with filtering and sorting
- **Account Types**: Support for Savings, Current, Loan, and Overdraft accounts
- **Balance Display**: Real-time account balances with currency formatting
- **Sensitive Information**: Masked account numbers with option to reveal

### Transaction Features

- **Transaction History**: Detailed transaction listings with pagination
- **Transaction Filtering**: Search by date, description, or transaction type
- **CSV Export**: Download transaction history as CSV files
- **Real-time Updates**: Live transaction data with React Query

### Fund Transfers

- **Secure Transfer Form**: Formik-powered forms with Yup validation
- **Transfer Confirmation**: Modal confirmation before processing transfers
- **Success Feedback**: Visual confirmation of successful transfers
- **Error Handling**: Comprehensive error messages and toast notifications

### User Experience

- **Responsive Design**: Mobile-first design that works on all devices
- **Loading States**: Elegant loading spinners and skeleton screens
- **Accessibility**: WCAG compliant components and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query
- **Form Handling**: Formik + Yup validation
- **UI Components**: Custom component library
- **Icons**: Custom SVG icon system
- **Notifications**: Sonner toast notifications
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Arinzemike1/interswitch-customer-account-dashboard.git
   cd interswitch-customer-account-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000` and login with the credentials above.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (authenticated)/          # Protected routes
│   │   └── accounts/            # Account management pages
│   ├── api/                     # API routes
│   │   ├── accounts/           # Account data endpoints
│   │   ├── login/              # Authentication endpoint
│   │   └── transfers/          # Transfer processing
│   ├── auth/                   # Authentication pages
│   ├── components/             # Reusable UI components
│   ├── lib/                    # Utilities and types
│   ├── services/               # API service functions
│   └── stores/                 # State management
```

## 🎯 Key Components

### Authentication System

- **Login Form**: Secure authentication with validation
- **Auth Store**: Zustand-based authentication state management
- **Route Protection**: Middleware for protecting authenticated routes
- **Idle Timer**: Automatic logout with user warning

## 🔒 Security Features

- **Input Validation**: Comprehensive form validation with Yup schemas
- **CSRF Protection**: Secure API endpoints
- **Session Management**: Token-based authentication
- **Idle Session Detection**: Automatic logout for inactive users
- **Sensitive Data Masking**: Account numbers and balances protection

## 🚀 Performance Optimizations

- **React Query**: Efficient data fetching and caching
- **Code Splitting**: Route-based code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized loading
- **Bundle Analysis**: Optimized build sizes

---

**Note**: This is a demo application with mock data. Do not use the authentication system in production environments.
