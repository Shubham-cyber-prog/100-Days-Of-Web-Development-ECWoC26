const images = [
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1016/600/400",
    "https://picsum.photos/id/1018/600/400",
    "https://picsum.photos/id/1020/600/400",
    "https://picsum.photos/id/1024/600/400",
    "https://picsum.photos/id/1025/600/400"
  ];
  
  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.getElementById("close");
  
  // Render images
  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Gallery image";
    img.addEventListener("click", () => openModal(src));
    gallery.appendChild(img);
  });
  
  function openModal(src) {
    modal.style.display = "flex";
    modalImg.src = src;
  }
  
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  // Close modal on background click
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  