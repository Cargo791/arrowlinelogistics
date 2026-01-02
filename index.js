window.addEventListener("scroll", () => {
  const nav = document.querySelector(".ghost");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
// Tracking logic
const form = document.getElementById("trackingForm");
const resultDiv = document.getElementById("trackingResult");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const trackingId = document.getElementById("trackingId").value.trim();
  resultDiv.innerHTML = `<p class="text-gray-600">Tracking package...</p>`;

  try {
    const response = await fetch("https://cargoship.onrender.com/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trackingId }),
    });

    const data = await response.json();

    if (response.ok) {
      // === Progress & Color Logic ===
      let percentage = 0;
      let statusColor = "bg-gray-400"; // default

      switch (data.status?.toLowerCase()) {
        case "on hold":
          percentage = 70;
          statusColor = "bg-red-500";
          break;
        case "picked up":
          percentage = 40;
          statusColor = "bg-orange-500";
          break;
        case "in transit":
          percentage = 60;
          statusColor = "bg-blue-500";
          break;
        case "out for delivery":
          percentage = 90;
          statusColor = "bg-yellow-400";
          break;
        case "delivered":
          percentage = 100;
          statusColor = "bg-green-500";
          break;
        default:
          percentage = 80;
          statusColor = "bg-gray-400";
      }

      // === HTML Output ===
      resultDiv.innerHTML = `
        <div class="bg-white shadow-xl rounded-xl p-6 w-full max-w-2xl transition-all duration-700">
          
          <!-- Progress bar -->
          <div class="relative w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
            <div id="progressBar" 
                 class="${statusColor} h-4 rounded-full transition-all duration-[2000ms]" 
                 style="width: 0%;">
            </div>
          </div>
          <p class="text-sm text-gray-600 text-right mb-4">${percentage}% complete</p>

          <!-- Shipment Info -->
          <h2 class="text-lg font-bold text-gray-800 mb-3">Shipment Details</h2>
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Current Location:</strong> ${data.location}</p>
          <p><strong>Delivery Date (ETA):</strong> ${data.eta || "Pending"}</p>

          <hr class="my-4">

          <h3 class="text-md font-semibold text-gray-700 mb-2">Sender</h3>
          <p><strong>Name:</strong> ${data.sender_name}</p>
          <p><strong>Email:</strong> ${data.sender_email}</p>
          <p><strong>Phone:</strong> ${data.sender_phone}</p>
          <p><strong>Address:</strong> ${data.sender_address}</p>

          <hr class="my-4">

          <h3 class="text-md font-semibold text-gray-700 mb-2">Receiver</h3>
          <p><strong>Name:</strong> ${data.receiver_name}</p>
          <p><strong>Email:</strong> ${data.receiver_email}</p>
          <p><strong>Phone:</strong> ${data.receiver_phone}</p>
          <p><strong>Address:</strong> ${data.receiver_address}</p>

          <hr class="my-4">

          <p><strong>Package:</strong> ${data.package_description}</p>
          <p><strong>Weight:</strong> ${data.package_weight || "N/A"} kg</p>

          <hr class="my-6">

          <!-- Status indicator -->
          <div class="flex justify-between text-sm font-medium text-gray-600">
            <span class="${data.status?.toLowerCase() === 'on hold' ? 'text-red-500 font-bold' : ''}">On Hold</span>
            <span class="${data.status?.toLowerCase() === 'in transit' ? 'text-blue-500 font-bold' : ''}">In Transit</span>
            <span class="${data.status?.toLowerCase() === 'out for delivery' ? 'text-yellow-500 font-bold' : ''}">Out for Delivery</span>
            <span class="${data.status?.toLowerCase() === 'delivered' ? 'text-green-500 font-bold' : ''}">Delivered</span>
          </div>
        </div>
      `;

      // === Animate Progress Bar ===
      setTimeout(() => {
        document.getElementById("progressBar").style.width = percentage + "%";
      }, 300);
    } else {
      resultDiv.innerHTML = `<div class="bg-red-100 text-red-700 p-4 rounded-md w-full max-w-md">${data.message}</div>`;
    }
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `<div class="bg-red-100 text-red-700 p-4 rounded-md w-full max-w-md">Error connecting to API</div>`;
  }
});


const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada",
  "Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia",
  "Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador",
  "Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia",
  "Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti",
  "Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia",
  "Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia",
  "Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro",
  "Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria",
  "North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru",
  "Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines",
  "Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia",
  "Slovenia","Solomon Islands","Somalia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Suriname","Sweden",
  "Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia",
  "Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu",
  "Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

// Populate both dropdowns
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");

countries.forEach(country => {
  const opt1 = document.createElement("option");
  opt1.value = country;
  opt1.textContent = country;
  fromSelect.appendChild(opt1.cloneNode(true));
  toSelect.appendChild(opt1);
});

// Quote calculation
document.getElementById("quoteForm").addEventListener("submit", e => {
  e.preventDefault();

  const from = fromSelect.value;
  const to = toSelect.value;
  const weight = parseFloat(document.getElementById("weight").value.trim()) || 1;
  const type = document.getElementById("type").value;
  const result = document.getElementById("quoteResult");

  if (!from || !to || !type) {
    result.classList.remove("hidden");
    result.classList.add("text-red-500");
    result.innerText = "тЪая╕П Please fill in all fields.";
    return;
  }

  result.classList.remove("hidden", "text-red-500");
  result.classList.add("text-gray-600");
  result.innerText = "Calculating quote...";

  setTimeout(() => {
    const estimatedPrice = (Math.random() * 200 * weight).toFixed(2);
    result.classList.remove("text-gray-600");
    result.innerHTML = `
      ЁЯТ░ Estimated Shipping Cost: 
      <span class="text-green-600 font-bold">$${estimatedPrice}</span>
    `;
  }, 800);
});
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => links.classList.toggle('show'));

   function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close dropdown if clicked outside
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      document.getElementById("myDropdown").classList.remove("show");
    }
  }

  // Set language function
  function setLanguage(lang) {
    // Update all elements with class 'lang'
    const elements = document.querySelectorAll('.lang');
    elements.forEach(el => {
      el.textContent = el.dataset[lang]; // data-en or data-es
    });

    // Update button text
    document.getElementById("languageButton").textContent = lang === 'en' ? 'English' : 'Español';
  }
