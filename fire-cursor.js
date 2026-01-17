 // 4. Select the cursor element
  const cursor = document.querySelector('.cursor');

  // 5. Listen to mouse movement
  document.addEventListener('mousemove', (event) => {
    const mouseX = event.pageX; // x-coordinate
    const mouseY = event.pageY; // y-coordinate

    // 6. Move the cursor div to mouse position
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });