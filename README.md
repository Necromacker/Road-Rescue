# 🛣️ Road-Rescue: Emergency Roadside Assistance

**Road-Rescue** is a modern, responsive static web application designed to provide immediate, reliable assistance for vehicle emergencies. Whether it's a flat tire, fuel depletion, a dead battery, or a critical mechanical breakdown, Road-Rescue offers a sleek interface to connect users with rapid rescue services in real-time.

---

## ✨ Key Features

- **🆘 Single-Click Emergency SOS**
  Instantly broadcast an emergency help signal (Medical, Fire, or Police) with your precise GPS coordinates.
  
- **📍 Real-Time Geolocation & Tracking**
  Automatically detects the user's location securely using browser geolocation to find the nearest assistance points. Simulates real-time dispatch tracking.

- **🗺️ Interactive Map Integration**
  Visualize nearby rescue depots and track incoming rescue vehicles on a smooth, interactive map powered by Leaflet.js.

- **🏎️ Service Request Slider (GSAP)**
  A fluid, step-by-step slider interface enhanced with silky-smooth GSAP animations, allowing users to effortlessly request specific roadside services like Towing, Fuel Delivery, and Battery Jumpstarts.

- **📊 User Dashboard**
  A comprehensive personal dashboard presenting the history of past rescue requests, active service tracking, and analytics like distance metrics and ETAs.

- **📱 Fully Responsive Neo-Brutalism UI**
  Optimized and robust UI elements adopting a beautiful Neo-Brutalism aesthetic with vivid colors, bold fonts, and seamless micro-animations. Works perfectly across Desktop, Tablet, and Mobile devices.

---

## 🛡️ Tech Stack

**Road-Rescue** is structured to be blazing fast and completely serverless. It relies entirely on frontend technologies for effortless static hosting.

### Frontend Technologies
- **HTML5**: Semantic and accessible markup.
- **Vanilla CSS3**: Custom styles featuring a distinct Neo-Brutalism design system (no heavy CSS frameworks).
- **JavaScript (ES6+)**: Core logic, DOM manipulation, and asynchronous mock API integration.

### Libraries & Tools
- **[GSAP (GreenSock)](https://greensock.com/gsap/)**: State-of-the-art animation library used for the dynamic Service Request Slider and UI transitions.
- **[Leaflet.js](https://leafletjs.com/)**: Open-source JavaScript library for mobile-friendly interactive maps.
- **OpenStreetMap API**: For rendering clean, detailed map tile layers.

### Deployment / Architecture
- Contains **Mock API behaviors** that use Javascript Promises and `setTimeout` to emulate server processing, making it fully ready to be hosted as a **static site** on platforms like **Netlify, Vercel, or GitHub Pages**.

---

## 🛠️ Installation & Setup

Since this project has been heavily optimized for static hosting, there is NO complex backend server setup required. It just works out of the box!

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Road-Rescue.git
   cd Road-Rescue
   ```

2. **Launch the application:**
   Simply open the `index.html` file natively in any modern web browser.
   
   *Pro-Tip: Use a simple local server like **VS Code Live Server** or Node's `http-server` for the most accurate development experience.*

---

## 📂 Project Structure

- `index.html` — Homepage featuring the core service overview and hero area.
- `emergency.html` — Dedicated SOS page for sending immediate help signals and alerts to authorities.
- `services.html` — Detailed view of all available rescue services and pricing information.
- `dashboard.html` — The user portal to track service history and watch live vehicle tracking.
- `script.js` — The main brain of the app. Handles maps, GSAP slider interactions, SOS triggers, and mock data.
- `styles.css` — Global stylesheet driving the Neo-Brutalism visual design.
- `logos/` — Directory containing high-quality video/MP4 loop assets used in the service cards.

---

## 🚧 Roadmap & Future Enhancements

- 💳 Integration of a simulated payment gateway.
- 🌙 Implement an intelligent dark/light mode toggle.
- 🚗 Live driver-side app interface for the rescue providers.
- 📡 Progressive Web App (PWA) support for offline interactions.

---

*Drive safe. But if you get stuck, we've got your back!* 🚗💨
