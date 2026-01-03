const qrCanvas = document.getElementById("qrCanvas");
const qrBox = document.getElementById("qrBox");
const downloadBtn = document.getElementById("downloadBtn");
let currentTab = "text";

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

  document.querySelector(`[onclick="switchTab('${tab}')"]`).classList.add("active");
  document.getElementById(tab).classList.add("active");
}

function generateQR() {
  let data = "";

  if (currentTab === "text") {
    data = document.getElementById("textInput").value.trim();
  }

  if (currentTab === "wifi") {
    const ssid = document.getElementById("ssid").value;
    const pass = document.getElementById("wifiPass").value;
    data = `WIFI:T:WPA;S:${ssid};P:${pass};;`;
  }

  if (currentTab === "contact") {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    data = `BEGIN:VCARD\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
  }

  if (!data) {
    alert("Please fill the fields");
    return;
  }

  QRCode.toCanvas(qrCanvas, data, { width: 180, margin: 2 });

  qrBox.style.display = "block";
  downloadBtn.style.display = "block";
}

function downloadQR() {
  const link = document.createElement("a");
  link.download = "qr-code.png";
  link.href = qrCanvas.toDataURL();
  link.click();
}
