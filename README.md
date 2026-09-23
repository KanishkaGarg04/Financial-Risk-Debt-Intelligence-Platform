# Financial Risk & Debt Intelligence Platform

<p align="center">
  <img src="./screenshots/dashboard.png" width="100%"/>
</p>

<p align="center">
  A full-stack financial intelligence platform for risk assessment, debt stress analysis, repayment scenario modelling, market data integration, and AI-assisted financial decision support.
</p>

---

## Overview

The **Financial Risk & Debt Intelligence Platform** is a full-stack web application designed to help users evaluate their financial position through structured financial analysis, scenario modelling, market data, AI-assisted recommendations, and financial report generation.

The platform combines a custom financial analysis engine with AI services and external market data to provide a unified workflow for:

- Financial risk assessment
- Debt and loan analysis
- Cash-flow evaluation
- Repayment scenario comparison
- Investment allocation analysis
- Market monitoring
- AI-assisted financial insights
- Financial report generation

---

## Core Capabilities

### Financial Risk Assessment

The platform evaluates user-provided financial data and calculates key financial indicators including:

- Financial Health Score
- Debt-to-Income Ratio
- Savings Rate
- Emergency Fund Estimate
- Monthly Cash Flow
- Loan EMI
- Debt Stress Indicators

A custom analysis engine processes these metrics to generate a **0–100 financial risk score** and corresponding financial insights.

---

### Debt & Loan Analysis

Users can evaluate their current and projected debt position through:

- Loan EMI calculations
- Debt-to-Income analysis
- Debt stress evaluation
- Repayment scenario comparison
- Loan optimization insights
- Financial risk analysis

The platform allows users to compare different financial scenarios before making financial decisions.

---

### AI-Assisted Financial Analysis

The application integrates the **OpenRouter API** to generate AI-assisted financial insights based on calculated financial metrics and user-provided context.

The AI workflow can generate:

- Executive financial summaries
- Financial strengths
- Potential risks
- Actionable recommendations
- Investment insights
- Loan optimization suggestions

AI output is generated after the application processes the underlying financial data through its analysis engine.

---

## Financial Analysis Workflow

```text
User Financial Input
        ↓
Financial Calculation Engine
        ↓
Financial Metrics
        ↓
Risk & Debt Analysis
        ↓
OpenRouter AI
        ↓
AI-Assisted Insights
        ↓
Financial Report / Dashboard
```

---

### Investment Analysis

The platform provides investment allocation analysis across multiple asset categories, including:

- Stocks
- Mutual Funds
- Debt Funds
- Gold
- Cash

Users can review allocation scenarios and receive AI-assisted recommendations based on their financial inputs.

---

### Live Market Data

The application integrates external market-data services to display financial market information, including:

- NIFTY 50
- SENSEX
- USD/INR
- Gold Prices
- Market Trends

Market information is surfaced through a dedicated dashboard for monitoring financial indicators.

---

### Professional Financial Reports

Users can generate downloadable financial reports containing:

- Executive Summary
- Financial Metrics
- Loan Analysis
- Investment Allocation
- Risk Assessment
- AI-Assisted Recommendations

Reports are generated as formatted PDF documents using **jsPDF**.

---

### Offline Report Storage

Generated reports can be stored locally using **IndexedDB**, allowing users to access previously downloaded reports without requiring an active internet connection.

Users can:

- Open saved reports
- View reports offline
- Manage downloaded reports
- Delete stored reports

---

### Email Reports

Generated financial reports can be shared through email using the backend email service.

---

### Responsive Interface

The application is designed for:

- Desktop
- Laptop
- Tablet
- Mobile devices

The frontend uses responsive layouts, reusable components, interactive charts, and motion-based UI transitions.

---

## Authentication & Security

The application implements:

- JWT-based authentication
- Protected routes
- Secure login and registration
- Password hashing
- User-specific reports
- Protected REST APIs
- Environment-based secret management
- Helmet security middleware

---

# Screenshots

## Dashboard

<img src="./screenshots/dashboard.png" width="100%"/>

---

## Live Market Overview

<img src="./screenshots/market.png" width="100%"/>

---

## Financial Analysis

<img src="./screenshots/analysis-form.png" width="100%"/>

---

## AI Financial Advisor

<img src="./screenshots/ai-advisor.png" width="100%"/>

---

## Financial Analytics

<img src="./screenshots/charts.png" width="100%"/>

---

## Investment Planning

<img src="./screenshots/investments.png" width="100%"/>

---

## Financial Report

<img src="./screenshots/reports.png" width="100%"/>

---

## Offline Reports

<img src="./screenshots/offline.png" width="100%"/>

---

## Mobile Interface

<img src="./screenshots/mobile.png" width="300"/>

---

# System Architecture

```text
                    React + Vite
                         │
                    Axios Requests
                         │
                         ▼
                  Express.js API
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
   JWT Authentication  Analysis      Market Data
                         Engine        Integration
                          │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
   Financial Metrics   OpenRouter     MongoDB Atlas
                       AI Service
          │              │
          └───────┬──────┘
                  ▼
          AI-Assisted Insights
                  │
                  ▼
          Reports / Dashboard
```

---

# Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- Lucide React
- IndexedDB
- Recharts

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Nodemailer
- Helmet
- Compression Middleware

## AI & External Services

- OpenRouter API
- Market Data API

## PDF & Reporting

- jsPDF

---

# Project Structure

```text
financial-risk-debt-intelligence-platform/

├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   └── utils/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── config/
│
├── screenshots/
│   ├── dashboard.png
│   ├── market.png
│   ├── analysis-form.png
│   ├── ai-advisor.png
│   ├── charts.png
│   ├── investments.png
│   ├── reports.png
│   ├── offline.png
│   └── mobile.png
│
└── README.md
```

---

# API Overview

## Authentication

```http
POST /api/auth/signup
POST /api/auth/login
```

## Financial Analysis

```http
POST /api/analysis
GET /api/analysis/history
GET /api/analysis/:id
POST /api/analysis/email
```

## Market Data

```http
GET /api/market/live
```

## AI Assistant

```http
POST /api/chat
```

---

# Financial Analysis Flow

```text
1. User enters financial information
            ↓
2. Application calculates financial metrics
            ↓
3. Risk and debt indicators are generated
            ↓
4. Financial scenarios are evaluated
            ↓
5. Relevant context is sent to OpenRouter AI
            ↓
6. AI-assisted insights are generated
            ↓
7. Results are displayed on the dashboard
            ↓
8. User can generate and store a financial report
```

---

# Performance & Engineering Practices

- Responsive component architecture
- Reusable React components
- Axios-based API communication
- Protected API routes
- IndexedDB-based offline storage
- Axios interceptors
- Lazy rendering where applicable
- Compression middleware
- Helmet security middleware
- Modular frontend and backend structure
- Environment-based configuration

---

# Environment Variables

## Backend

Create a `.env` file inside the `backend` directory.

```env
PORT=
MONGO_URI=
JWT_SECRET=
OPENROUTER_API_KEY=
EMAIL_USER=
EMAIL_PASS=
```

## Frontend

Create a `.env` file inside the `frontend` directory.

```env
VITE_API_URL=
```

Do not commit environment files or secret credentials to the repository.

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/KanishkaGarg04/financial-risk-debt-intelligence-platform.git
cd financial-risk-debt-intelligence-platform
```

---

## 2. Configure the Backend

```bash
cd backend
npm install
npm run dev
```

---

## 3. Configure the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

---

# Future Improvements

- Progressive Web App support
- Financial alerts
- EMI calendar
- Portfolio tracking
- Credit score prediction
- Tax planning
- Goal-based financial planning
- Advanced financial analytics
- Voice-enabled AI assistant

---

# Project Highlights

- Full-stack MERN architecture
- Custom financial risk scoring engine
- Debt stress and repayment scenario analysis
- AI-assisted financial recommendations
- External market data integration
- JWT authentication
- RESTful API architecture
- PDF report generation
- Offline report storage with IndexedDB
- Responsive dashboard
- Modular frontend and backend structure

---

# Author

**Kanishka Garg**

GitHub:  
https://github.com/KanishkaGarg04
