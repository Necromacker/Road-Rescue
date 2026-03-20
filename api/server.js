const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'requests.json');

// Initialize DB if not exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeJsonSync(DB_FILE, []);
}

// Preset Helping Vehicle Points (Depots)
const RESCUE_POINTS = [
  { id: 1, name: 'Delhi Central Depot', lat: 28.6139, lng: 77.2090, status: 'available' },
  { id: 2, name: 'Noida Hub', lat: 28.5355, lng: 77.3910, status: 'available' },
  { id: 3, name: 'Gurgaon Base', lat: 28.4595, lng: 77.0266, status: 'available' },
  { id: 4, name: 'Aerocity Quick Response', lat: 28.5562, lng: 77.1000, status: 'available' },
  { id: 5, name: 'East Delhi Service Center', lat: 28.6280, lng: 77.3210, status: 'available' }
];

// Haversine Distance Helper to find nearest point
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// API: Get all rescue points
app.get('/api/points', (req, res) => {
  res.json(RESCUE_POINTS);
});

// API: Request Help
app.post('/api/request-help', async (req, res) => {
  const { fullName, phoneNumber, vehicleType, problemType, userLat, userLng, address } = req.body;

  if (!fullName || !phoneNumber || !userLat || !userLng) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Force a rescue point close to the user's actual location for simulation
  const depotLat = userLat + (Math.random() - 0.5) * 0.04; // +/- 2km
  const depotLng = userLng + (Math.random() - 0.5) * 0.04;
  
  const nearestPoint = {
    id: `DS-${Date.now()}`,
    name: 'Nearby Emergency Depot',
    lat: depotLat,
    lng: depotLng,
    status: 'dispatched'
  };

  const minDistance = getDistance(userLat, userLng, depotLat, depotLng);

  const newRequest = {
    id: Date.now(),
    fullName,
    phoneNumber,
    vehicleType,
    problemType,
    location: {
      address,
      lat: userLat,
      lng: userLng
    },
    assignedPoint: nearestPoint,
    distanceKm: parseFloat(minDistance.toFixed(2)),
    timestamp: new Date().toISOString(),
    status: 'dispatched'
  };

  const requests = await fs.readJson(DB_FILE);
  requests.push(newRequest);
  await fs.writeJson(DB_FILE, requests);

  res.json({
    message: 'Request received and help dispatched!',
    request: newRequest,
    eta: Math.max(10, Math.round(minDistance * 4)) // Roughly 4 mins per km
  });
});

// API: SOS Emergency
app.post('/api/sos', async (req, res) => {
  const { userLat, userLng, address, phoneNumber, target } = req.body;

  // Force local dispatch for simulation
  const depotLat = userLat + (Math.random() - 0.5) * 0.02; // +/- 1km
  const depotLng = userLng + (Math.random() - 0.5) * 0.02;
  
  const nearestPoint = {
    id: `DYN-SOS-${Date.now()}`,
    name: `Local ${target || 'Emergency'} Unit`,
    lat: depotLat,
    lng: depotLng,
    status: 'urgent'
  };

  const minDistance = getDistance(userLat, userLng, depotLat, depotLng);

  const sosData = {
    id: `SOS-${Date.now()}`,
    type: 'SOS_EMERGENCY',
    problemType: target || 'SOS Emergency',
    location: { address, lat: userLat, lng: userLng },
    assignedPoint: nearestPoint,
    distanceKm: parseFloat(minDistance.toFixed(2)),
    phoneNumber,
    timestamp: new Date().toISOString(),
    status: 'urgent'
  };

  const requests = await fs.readJson(DB_FILE);
  requests.push(sosData);
  await fs.writeJson(DB_FILE, requests);

  res.json({ 
    message: `${target || 'Authorities'} notified! Responder dispatched locally.`, 
    signalId: sosData.id,
    eta: Math.max(2, Math.round(minDistance * 2)) // Very fast response
  });
});

// API: Get history
app.get('/api/history', async (req, res) => {
  const sortedRequests = (await fs.readJson(DB_FILE)).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
  res.json(sortedRequests);
});

app.listen(PORT, () => {
  console.log(`RoadRescue Backend listening on port ${PORT}`);
});
