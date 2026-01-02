// ================= NAVBAR SCROLL =================
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".ghost");
  if (!nav) return;

  window.scrollY > 50
    ? nav.classList.add("scrolled")
    : nav.classList.remove("scrolled");
});

// ================= MOBILE MENU =================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// ================= TRACKING LOGIC =================
const form = document.getElementById("trackingForm");
const resultDiv = document.getElementById("trackingResult");

if (form && resultDiv) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const trackingInput = document.getElementById("trackingId");
    const trackingId = trackingInput?.value.trim();

    if (!trackingId) {
      resultDiv.innerHTML =
        `<div class="bg-red-100 text-red-700 p-4 rounded-md">Please enter a tracking ID.</div>`;
      return;
    }

    resultDiv.innerHTML =
      `<p class="text-gray-600">Tracking package...</p>`;

    try {
      const response = await fetch(
        "https://cargoship.onrender.com/track",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trackingId }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!response.ok) {
        throw new Error(data.message || "Tracking not found");
      }

      // ===== STATUS & PROGRESS =====
      let percentage = 80;
      let statusColor = "bg-gray-400";
      const status = data.status?.toLowerCase();

      const statusMap = {
        "picked up": [40, "bg-orange-500"],
        "in transit": [60, "bg-blue-500"],
        "on hold": [70, "bg-red-500"],
        "out for delivery": [90, "bg-yellow-400"],
        "delivered": [100, "bg-green-500"],
      };

      if (statusMap[status]) {
        [percentage, statusColor] = statusMap[status];
      }

      // ===== OUTPUT =====
      resultDiv.innerHTML = `
        <div class="bg-white shadow-xl rounded-xl p-6 w-full max-w-2xl transition-all duration-700">
          <div class="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
            <div id="progressBar"
              class="${statusColor} h-4 rounded-full transition-all duration-[2000ms]"
              style="width:0%">
            </div>
          </div>

          <p class="text-sm text-gray-600 text-right mb-4">${percentage}% complete</p>

          <h2 class="text-lg font-bold mb-3">Shipment Details</h2>
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>ETA:</strong> ${data.eta || "Pending"}</p>

          <hr class="my-4">

          <h3 class="font-semibold mb-2">Sender</h3>
          <p>${data.sender_name}</p>
          <p>${data.sender_email}</p>
          <p>${data.sender_phone}</p>
          <p>${data.sender_address}</p>

          <hr class="my-4">

          <h3 class="font-semibold mb-2">Receiver</h3>
          <p>${data.receiver_name}</p>
          <p>${data.receiver_email}</p>
          <p>${data.receiver_phone}</p>
          <p>${data.receiver_address}</p>

          <hr class="my-4">

          <p><strong>Package:</strong> ${data.package_description}</p>
          <p><strong>Weight:</strong> ${data.package_weight || "N/A"} kg</p>
        </div>
      `;

      setTimeout(() => {
        const bar = document.getElementById("progressBar");
        if (bar) bar.style.width = percentage + "%";
      }, 300);

    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = `
        <div class="bg-red-100 text-red-700 p-4 rounded-md">
          ${error.message || "Error connecting to API"}
        </div>
      `;
    }
  });
}

// ================= COUNTRIES =================
const countries = [ "Afghanistan","Albania","Algeria","Nigeria","United States","United Kingdom","Canada","Germany","France","China","Japan","India","Brazil","South Africa" ];

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");

if (fromSelect && toSelect) {
  countries.forEach(country => {
    fromSelect.add(new Option(country, country));
    toSelect.add(new Option(country, country));
  });
}

// ================= QUOTE FORM =================
const quoteForm = document.getElementById("quoteForm");
const quoteResult = document.getElementById("quoteResult");

if (quoteForm && quoteResult) {
  quoteForm.addEventListener("submit", e => {
    e.preventDefault();

    const weight = parseFloat(document.getElementById("weight")?.value) || 1;

    quoteResult.classList.remove("hidden");
    quoteResult.textContent = "Calculating quote...";

    setTimeout(() => {
      const price = (Math.random() * 200 * weight).toFixed(2);
      quoteResult.innerHTML =
        `Estimated Shipping Cost: <strong class="text-green-600">$${price}</strong>`;
    }, 800);
  });
}

// ================= DROPDOWNS =================
function toggleDropdown() {
  document.getElementById("myDropdown")?.classList.toggle("show");
}

window.addEventListener("click", e => {
  if (!e.target.matches(".dropbtn")) {
    document.getElementById("myDropdown")?.classList.remove("show");
  }
});

// ================= LANGUAGE =================
function setLanguage(lang) {
  document.querySelectorAll(".lang").forEach(el => {
    el.textContent = el.dataset[lang];
  });

  document.getElementById("languageButton").textContent =
    lang === "en" ? "English" : "Español";
}
