# 🛣️ Road-Rescue: Emergency Roadside Assistance

**Road-Rescue** is a modern, responsive web application designed to provide immediate assistance for vehicle emergencies. Whether it's a flat tire, fuel depletion, or a mechanical breakdown, Road-Rescue connects users with the nearest rescue depots in real-time.

---

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine.

### 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

---

## 🛠️ Installation & Setup

### 1. Backend Setup
The backend serves as the core API for handling rescue requests and tracking locations.

1. Open your terminal and navigate to the `api` directory:
   ```bash
   cd api
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   *The server will start running on `http://localhost:3000`.*

### 2. Frontend Setup
The frontend is a static web application that communicates with the backend.

1. Navigate back to the root directory (if you are in `api`):
   ```bash
   cd ..
   ```
2. Simply open the `index.html` file in your preferred web browser.
   - Alternatively, you can use a local development server like **VS Code Live Server** for a better experience.

---

## ✨ Key Features
- **Real-time Geolocation**: Automatically detects your location to find the nearest assistance.
- **Interactive Map**: Visualize nearby rescue depots using Leaflet.js maps.
- **Emergency SOS**: Single-click SOS trigger for immediate authorities notification.
- **Service Request Slider**: A smooth, step-by-step process to request specific services (Towing, Fuel, Battery, etc.).
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.

---

## 📂 Project Structure
- `index.html`: Homepage with service overview.
- `emergency.html`: Dedicated page for sending help requests and SOS.
- `services.html`: Detailed view of all available rescue services.
- `dashboard.html`: User dashboard to track request history.
- `api/`: Express.js backend for data management and logic.
- `logos/`: High-quality video assets for service cards.

---

## 🛡️ Technologies Used
- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+), GSAP (Animations), Leaflet.js (Maps).
- **Backend**: Node.js, Express.js.
- **Data Storage**: JSON-based local database for requests tracking.

---

## 👨‍💻 Development
To run the backend in development mode with automatic restarts:
```bash
cd api
npm run dev
```
*(Requires `nodemon` to be installed globally or as a dev dependency)*

---

*Drive safe, we've got your back!* 🚗💨
