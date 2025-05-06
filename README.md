# ⚡ HEC Électricité – Frontend Application

![HEC Électricité](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue)

This is the frontend interface for the HEC Électricité platform, designed to provide an intuitive and responsive experience for clients, engineers, and administrators. Built using the MERN stack, the frontend communicates with the backend API to manage projects, appointments, cost simulations, and user dashboards.

## ✨ Project Overview

HEC Électricité's frontend delivers an elegant and efficient user experience for:

- � Clients managing their electrical projects
- 🔧 Engineers scheduling consultations and tracking work
- 👔 Admins overseeing operations via dashboards

The frontend is optimized for desktop and mobile using responsive design principles.

## 🛠️ Tech Stack

| Category            | Technologies                          |
|---------------------|--------------------------------------|
| Framework           | React.js                             |
| Language            | JavaScript / TypeScript              |
| Routing             | React Router                         |
| State Management    | Redux Toolkit or Context API         |
| HTTP Client         | Axios                                |
| Styling             | Tailwind CSS / Sass / Styled Components |
| Form Handling       | React Hook Form / Formik             |
| Authentication      | JWT-based (via backend API)          |
| Testing             | React Testing Library                |
| Build Tool          | Vite / Create React App              |
| Deployment          | Vercel / Render                      |

## 🌟 Key Features

### 👨‍🔧 Client Portal
- Login & secure access
- View current and past projects
- Request updates or schedule appointments

### 💰 Cost Estimator
- Interactive tool for simulation
- Instant feedback on pricing models

### 📅 Appointment Booking
- Pick available time slots
- Receive reminders via email/in-app

### 📊 Admin Dashboard
- Visual project KPIs
- Manage clients, engineers, and system settings

## 🚀 Getting Started

### 📦 Installation & Setup
```bash
git clone https://github.com/BenMabroukAya/hecfrontend.git
cd hecfrontend
npm install
▶️ Run Development Server
bash
npm run dev
🧪 Run Tests
bash
npm test
🌐 Environment Variables
Create a .env file in the root directory:

env
VITE_API_URL=http://localhost:5000/api
📁 Project Structure
src/
├── assets/          # Static assets
├── components/      # Reusable components
├── pages/           # Application pages
├── services/        # API services
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── layouts/         # Layout components
└── App.jsx          # Main application component
👥 Contributors
BEN MABROUK AYA – Full-Stack Developer

📜 License
This project is licensed under the MIT License.

📬 Contact
For feedback or inquiries, please contact:
📧 aya.benmabrouk@isimg.tn