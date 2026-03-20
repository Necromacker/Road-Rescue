// =========================================
// ROADRESCUE — MAIN JAVASCRIPT
// =========================================

const API_BASE_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile Navigation Toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ---------- Intersection Observer for Fade-in Animations ----------
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  }

  // ---------- Geolocation & Map Logic (Emergency Page) ----------
  const mapElement = document.getElementById('map');
  let userCoords = { lat: 28.6139, lng: 77.2090 }; // Default: Delhi
  let map, userMarker, rescuePoints = [];

  if (mapElement && typeof L !== 'undefined') {
    initMap();
    fetchUserLocation();
  }

  function initMap() {
    map = L.map('map').setView([userCoords.lat, userCoords.lng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    userMarker = L.marker([userCoords.lat, userCoords.lng]).addTo(map)
      .bindPopup('Your Location (Detected)').openPopup();

    // Fetch Rescue Points from API
    fetch(`${API_BASE_URL}/points`)
      .then(res => res.json())
      .then(points => {
        rescuePoints = points;
        points.forEach(point => {
          L.circleMarker([point.lat, point.lng], {
            radius: 8,
            fillColor: "#ff4d00",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
          }).addTo(map).bindPopup(`<b>${point.name}</b><br>Rescue Depot`);
        });
      })
      .catch(err => console.error('Error fetching points:', err));
  }

  function fetchUserLocation() {
    const locInput = document.getElementById('location');
    const statusMsg = document.getElementById('locStatusMsg');

    if (!navigator.geolocation) {
      if (statusMsg) statusMsg.textContent = "Geolocation not supported by your browser.";
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      userCoords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      if (map) {
        map.setView([userCoords.lat, userCoords.lng], 14);
        userMarker.setLatLng([userCoords.lat, userCoords.lng]);
      }

      if (locInput) locInput.value = `${userCoords.lat.toFixed(4)}, ${userCoords.lng.toFixed(4)} (GPS Corrected)`;
      if (statusMsg) statusMsg.textContent = "Location verified and secured.";
    }, (error) => {
      console.error('Geo error:', error);
      if (statusMsg) statusMsg.textContent = "Location access denied. Please enter manually.";
    });
  }

  // ---------- Emergency Request Form ----------
  const emergencyForm = document.getElementById('emergencyForm');
  const formContent = document.getElementById('formContent');
  const formConfirmation = document.getElementById('formConfirmation');

  if (emergencyForm) {
    emergencyForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = emergencyForm.querySelector('.form-submit-btn');
      submitBtn.textContent = 'Contacting Nearest Rescue Point...';
      submitBtn.disabled = true;

      const formData = {
        fullName: document.getElementById('fullName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        vehicleType: document.getElementById('vehicleType').value,
        problemType: document.getElementById('problemType').value,
        userLat: userCoords.lat,
        userLng: userCoords.lng,
        address: document.getElementById('location').value
      };

      try {
        const response = await fetch(`${API_BASE_URL}/request-help`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        // Update confirmation UI
        document.getElementById('etaVal').textContent = `${result.eta} Minutes`;
        document.getElementById('nearestPointName').textContent = result.request.assignedPoint.name;

        if (formContent) formContent.style.display = 'none';
        if (formConfirmation) formConfirmation.classList.add('show');
        formConfirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });

      } catch (error) {
        console.error('Submission error:', error);
        alert('Could not connect to the rescue server. Please call us directly at +91 98765 43210');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Retry Sending Request';
      }
    });
  }

  // ---------- Contact Form ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        const content = document.getElementById('contactFormContent');
        const confirm = document.getElementById('contactConfirmation');
        if (content) content.style.display = 'none';
        if (confirm) confirm.classList.add('show');
        confirm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1200);
    });
  }

  // ---------- Service Request Slider (GSAP) ----------
  const sliderOverlay = document.getElementById('serviceSliderOverlay');
  const sliderWrapper = document.getElementById('sliderWrapper');
  const steps = document.querySelectorAll('.slider-step');
  const progressBar = document.getElementById('progressBar');
  const requestBtns = document.querySelectorAll('.request-service-btn');
  const closeBtn = document.getElementById('closeSlider');
  
  let currentStep = 0;
  let selectedService = '';

  function updateSlider() {
    // Hide all steps, show current
    steps.forEach((step, index) => {
      if (index === currentStep) {
        step.style.display = 'block';
        gsap.fromTo(step, 
          { opacity: 0, x: 50 }, 
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
        );
        step.classList.add('active');
      } else {
        step.style.display = 'none';
        step.classList.remove('active');
      }
    });

    // Update progress bar
    const progress = ((currentStep + 1) / steps.length) * 100;
    gsap.to(progressBar, { width: `${progress}%`, duration: 0.5 });
  }

  // Open Slider
  requestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedService = btn.getAttribute('data-service');
      const serviceName = btn.textContent.split(' Request ')[1] || 'Service Request';
      document.getElementById('sliderServiceName').textContent = serviceName;
      
      currentStep = 0;
      updateSlider();
      sliderOverlay.classList.add('active');
      gsap.fromTo('.slider-container', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );

      // Start fetching location immediately when slider opens
      fetchSliderLocation();
    });
  });

  // Close Slider
  const closeSliderFunc = () => {
    gsap.to('.slider-container', { 
      scale: 0.8, 
      opacity: 0, 
      duration: 0.3, 
      onComplete: () => {
        sliderOverlay.classList.remove('active');
      }
    });
  };

  if (closeBtn) closeBtn.addEventListener('click', closeSliderFunc);
  if (document.getElementById('sliderFinalClose')) {
    document.getElementById('sliderFinalClose').addEventListener('click', closeSliderFunc);
  }

  // Navigation
  document.querySelectorAll('.next-step').forEach(btn => {
    btn.addEventListener('click', () => {
      // Basic validation for Step 1
      if (currentStep === 0 && !document.getElementById('sliderName').value) {
        alert('Please enter your name.');
        return;
      }
      // Basic validation for Step 2
      if (currentStep === 1) {
        if (!document.getElementById('sliderVehicleNum').value || !document.getElementById('sliderPhone').value) {
          alert('Please fill in vehicle and phone details.');
          return;
        }
      }

      currentStep++;
      updateSlider();
    });
  });

  document.querySelectorAll('.prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
      currentStep--;
      updateSlider();
    });
  });

  // Slider Location & Map Logic
  let sliderMap, sliderMarker;

  function initSliderMap(lat, lng) {
    if (!sliderMap && document.getElementById('sliderMap')) {
      sliderMap = L.map('sliderMap').setView([lat, lng], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(sliderMap);
      sliderMarker = L.marker([lat, lng]).addTo(sliderMap).bindPopup("Your Location");
    } else if (sliderMap) {
      sliderMap.setView([lat, lng], 14);
      sliderMarker.setLatLng([lat, lng]);
      setTimeout(() => { sliderMap.invalidateSize(); }, 300);
    }
  }

  function fetchSliderLocation() {
    const locInput = document.getElementById('sliderLocation');
    const statusMsg = document.querySelector('#sliderLocStatus span');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        if (locInput) locInput.value = `${userCoords.lat.toFixed(4)}, ${userCoords.lng.toFixed(4)} (Automatic GPS)`;
        if (statusMsg) statusMsg.textContent = "GPS Location secured.";
        
        // Update map if it's the current step
        if (currentStep === 2) { // Step 3
           initSliderMap(userCoords.lat, userCoords.lng);
        }
      }, (err) => {
        if (statusMsg) statusMsg.textContent = "GPS failed. Please allow access.";
      });
    }
  }

  // Hook into updateSlider to refresh map
  const originalUpdateSlider = updateSlider;
  updateSlider = function() {
    originalUpdateSlider();
    if (currentStep === 2) { // Step 3: Location
      initSliderMap(userCoords.lat, userCoords.lng);
    }
  }

  // Final Submit from Slider
  const submitSliderBtn = document.getElementById('submitSliderRequest');
  if (submitSliderBtn) {
    submitSliderBtn.addEventListener('click', async () => {
      submitSliderBtn.textContent = 'Contacting Depot...';
      submitSliderBtn.disabled = true;

      const formData = {
        fullName: document.getElementById('sliderName').value,
        phoneNumber: document.getElementById('sliderPhone').value,
        vehicleType: selectedService, 
        vehicleNumber: document.getElementById('sliderVehicleNum').value,
        problemType: selectedService,
        userLat: userCoords.lat,
        userLng: userCoords.lng,
        address: document.getElementById('sliderLocation').value
      };

      try {
        const response = await fetch(`${API_BASE_URL}/request-help`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        document.getElementById('sliderETA').textContent = `${result.eta} Minutes`;
        currentStep = 3; // Step 4: Success
        updateSlider();

      } catch (error) {
        console.error('Slider submission error:', error);
        alert('Server connection failed.');
        submitSliderBtn.disabled = false;
        submitSliderBtn.textContent = 'Retry';
      }
    });
  }

  // ---------- SOS Trigger Logic ----------
  const sosBtn = document.getElementById('sosTrigger');
  if (sosBtn) {
    sosBtn.addEventListener('click', async () => {
      if (confirm('EMERGENCY SOS: Send immediate distress signal with my location?')) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          try {
            const res = await fetch(`${API_BASE_URL}/sos`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userLat: pos.coords.latitude,
                userLng: pos.coords.longitude,
                phoneNumber: 'EMERGENCY_BROADCAST'
              })
            });
            const data = await res.json();
            alert(`✅ ${data.message}\nSignal ID: ${data.signalId}`);
          } catch (e) {
            alert('Failed to send SOS signal. Please call 112 or local emergency services.');
          }
        });
      }
    });
  }

  // ---------- Active Nav Link ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-links a:not(.nav-emergency)');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

});
