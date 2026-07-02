# 🎓 UniRank — University Rank Checker

A premium full-stack web application to check university rank by registration number. Built with React + Vite + Tailwind CSS on the frontend and Node.js + Express on the backend.

---

## 🚀 Tech Stack

| Layer     | Tech                                      |
|-----------|-------------------------------------------|
| Frontend  | React 19, Vite 8, Tailwind CSS v4, Framer Motion, Recharts, Lucide React, Axios |
| Backend   | Node.js, Express.js, Axios, Helmet, Morgan, Rate Limiter |
| PDF       | jsPDF + html2canvas                       |

---

## 📁 Project Structure

```
university-rank-checker/
├── backend/
│   ├── config/         # Environment config
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Error handling, rate limiting, validation
│   ├── routes/         # Express routes
│   ├── services/       # External API calls
│   └── server.js       # Entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── charts/     # Recharts visualizations
        │   ├── dashboard/  # Dashboard sections
        │   ├── landing/    # Hero / landing page
        │   └── ui/         # Shared UI components
        ├── context/        # Theme context
        ├── hooks/          # Custom React hooks
        ├── pages/          # Page-level components
        ├── services/       # Axios API service
        └── utils/          # Helpers & utilities
```

---

## ⚡ Quick Start

### Backend
```bash
cd backend
npm install
npm run dev        # starts on port 8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # starts on port 5173
```

Open **http://localhost:5173** in your browser.

---

## 🔌 API

| Method | Endpoint          | Description          |
|--------|-------------------|----------------------|
| GET    | /health           | Health check         |
| POST   | /api/check-rank   | Check student rank   |

**Request:**
```json
{ "registrationNumber": "12320802" }
```

---

## ✨ Features

- 🔍 Real-time rank lookup by registration number  
- 📊 Analytics dashboard with Recharts (CGPA gauge, percentile bar, rank distribution)  
- 🌙 Dark / Light mode toggle  
- 📄 PDF export of full dashboard  
- 🕓 Search history (localStorage, last 10)  
- 📋 Copy student details to clipboard  
- 💡 AI-generated insights based on rank/percentile/CGPA  
- ⚡ Skeleton loaders & graceful error states  
- 📱 Fully responsive (mobile → desktop)  
- 🔒 Rate limiting, input validation, CORS, Helmet
