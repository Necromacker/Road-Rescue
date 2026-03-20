const fs = require('fs');
const path = require('path');

const replacements = {
  '<div class="logo-icon">🚨</div>': '<div class="logo-icon"><video src="logos/Emergency Siren.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; pointer-events: none;"></video></div>',
  '<div class="service-icon">⛽</div>': '<div class="service-icon"><video src="logos/Fuel Pump.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; pointer-events: none;"></video></div>',
  '<div class="service-icon">🔧</div>': '<div class="service-icon"><video src="logos/Tyre Repair.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; pointer-events: none;"></video></div>',
  '<div class="service-icon">🔋</div>': '<div class="service-icon"><video src="logos/Car Battery.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; pointer-events: none;"></video></div>',
  '<div class="service-icon">🚛</div>': '<div class="service-icon"><video src="logos/Tow Truck.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; pointer-events: none;"></video></div>',
  '<div class="service-detail-icon">⛽</div>': '<div class="service-detail-icon"><video src="logos/Fuel Pump.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; pointer-events: none;"></video></div>',
  '<div class="service-detail-icon">🔧</div>': '<div class="service-detail-icon"><video src="logos/Tyre Repair.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; pointer-events: none;"></video></div>',
  '<div class="service-detail-icon">🔋</div>': '<div class="service-detail-icon"><video src="logos/Car Battery.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; pointer-events: none;"></video></div>',
  '<div class="service-detail-icon">🚛</div>': '<div class="service-detail-icon"><video src="logos/Tow Truck.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; pointer-events: none;"></video></div>',
  '<div class="about-image fade-in">\n          🚐\n        </div>': '<div class="about-image fade-in">\n          <video src="logos/Tow Truck.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; pointer-events: none;"></video>\n        </div>'
};

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let changed = false;
  
  for (const [oldStr, newStr] of Object.entries(replacements)) {
    if (content.includes(oldStr)) {
      content = content.split(oldStr).join(newStr);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log('Updated ' + file);
  }
});
