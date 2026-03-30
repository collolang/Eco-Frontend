# EcoTrack Frontend

React + Vite + Tailwind CSS frontend for the EcoTrack Carbon Footprint Tracker.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
cd ecotrack-frontend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set VITE_API_URL to your backend URL
```
Default: `VITE_API_URL=http://localhost:3000/api`

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

> **Note:** Make sure your EcoTrack backend is running on port 3000 first.

---

## 📁 Project Structure

```
ecotrack-frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   └── ui.jsx             # Shared UI primitives (Button, Card, Input…)
│   ├── context/
│   │   ├── AuthContext.jsx    # JWT auth state + login/logout
│   │   └── ToastContext.jsx   # Global toast notifications
│   ├── pages/
│   │   ├── Landing.jsx        # Public landing page
│   │   ├── Auth.jsx           # Login + Register (tabbed)
│   │   ├── Dashboard.jsx      # Dashboard shell with sidebar routing
│   │   ├── DashboardPanel.jsx # Analytics: charts, metrics, recommendations
│   │   ├── CompanyProfile.jsx # View/edit company profile
│   │   ├── DataEntry.jsx      # Full CRUD emission entries
│   │   └── Reports.jsx        # Report generator + history
│   ├── services/
│   │   └── api.js             # All API calls + auto JWT refresh
│   ├── utils/
│   │   └── carbonCalculator.js # Emission factor calculations
│   ├── App.jsx                # Router + auth guards
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind + global styles
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🔌 Backend API Compatibility

This frontend is built to work with the EcoTrack Express backend. It calls:

| Endpoint | Used In |
|----------|---------|
| `POST /api/auth/register` | Auth page — Register |
| `POST /api/auth/login` | Auth page — Login |
| `POST /api/auth/refresh` | Auto token refresh (transparent) |
| `POST /api/auth/logout` | Sidebar logout button |
| `GET /api/auth/me` | Session restore on page reload |
| `GET/PUT /api/company/profile` | Company Profile page |
| `GET/POST /api/emissions` | Data Entry — list + create |
| `PUT/DELETE /api/emissions/:id` | Data Entry — edit + delete |
| `GET /api/emissions/monthly` | Dashboard chart |
| `GET /api/emissions/breakdown` | Dashboard pie chart |
| `GET /api/emissions/total` | Dashboard metric card |
| `GET /api/emissions/yearly` | Dashboard bar chart |
| `GET /api/reports` | Reports page |
| `GET /api/reports/history` | Reports history sidebar |

JWT access tokens are stored in `localStorage` and automatically refreshed using the refresh token when they expire (transparent to the user).

---

## 🎨 Tech Stack

- **React 18** — UI library
- **React Router v6** — Client-side routing
- **Recharts** — Charts (line, area, bar, pie)
- **Tailwind CSS 3** — Utility-first styling
- **Lucide React** — Icons
- **Vite** — Build tool + dev server

---

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🌍 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3000/api` | Backend API base URL |
