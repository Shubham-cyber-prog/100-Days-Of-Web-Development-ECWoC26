const qrCanvas = document.getElementById("qrCanvas");
const qrBox = document.getElementById("qrBox");
const downloadBtn = document.getElementById("downloadBtn");
let currentTab = "text";

function switchTab(tab) {
  currentTab = tab;

  document.querySelectorAll(".tab").forEach(btn =>
    btn.classList.remove("active")
  );
  document.querySelectorAll(".tab-content").forEach(c =>
    c.classList.remove("active")
  );

  document
    .querySelector(`[onclick="switchTab('${tab}')"]`)
    .classList.add("active");

  document.getElementById(tab).classList.add("active");

  // Reset QR when switching tabs
  qrBox.style.display = "none";
  downloadBtn.style.display = "none";
}

function generateQR() {
  let data = "";

  if (currentTab === "text") {
    data = document.getElementById("textInput").value.trim();
  }

  if (currentTab === "wifi") {
    const ssid = document.getElementById("ssid").value.trim();
    const pass = document.getElementById("wifiPass").value.trim();
    data = `WIFI:T:WPA;S:${ssid};P:${pass};;`;
  }

  if (currentTab === "contact") {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    data = `BEGIN:VCARD
FN:${name}
TEL:${phone}
EMAIL:${email}
END:VCARD`;
  }

  if (!data) {
    alert("Please fill the fields");
    return;
  }

  // Generate QR
  QRCode.toCanvas(qrCanvas, data, { width: 180, margin: 2 });

  // 🔥 Animation reset + trigger
  qrBox.style.display = "block";
  qrBox.classList.remove("show");
  void qrBox.offsetWidth; // force reflow (important)
  qrBox.classList.add("show");

  downloadBtn.style.display = "block";
}

function downloadQR() {
  const link = document.createElement("a");
  link.download = "qr-code.png";
  link.href = qrCanvas.toDataURL();
  link.click();
}
