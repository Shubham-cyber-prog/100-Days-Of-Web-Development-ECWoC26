function generateQR() {
  const text = document.getElementById("qrText").value.trim();
  const img = document.getElementById("qrImage");

  if (!text) {
    alert("Please enter text or URL");
    return;
  }

  img.classList.remove("show");

  img.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(text);

  img.onload = () => {
    img.classList.add("show");
  };
}
