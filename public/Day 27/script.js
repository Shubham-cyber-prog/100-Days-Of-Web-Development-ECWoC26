const cube = document.getElementById('cube');
const rollBtn = document.getElementById('rollBtn');
const resultText = document.getElementById('resultText');

let currentClass = '';

rollBtn.addEventListener('click', () => {
    // Generate random number 1-6
    const randNum = Math.floor(Math.random() * 6) + 1;
    
    // We add some extra spins to make it exciting
    // rotateX/Y values are carefully calculated to show the correct face
    let xRotation = 0;
    let yRotation = 0;
    
    // Logic Mapping based on CSS transforms:
    // 1 (Front): 0, 0
    // 2 (Back): 0, 180 (or 0, -180)
    // 3 (Right): 0, -90 (Rotate box Left to see Right face)
    // 4 (Left): 0, 90 (Rotate box Right to see Left face)
    // 5 (Top): -90, 0 (Rotate box Down to see Top face)
    // 6 (Bottom): 90, 0 (Rotate box Up to see Bottom face)

    switch(randNum) {
        case 1: xRotation = 0; yRotation = 0; break;
        case 2: xRotation = 0; yRotation = 180; break;
        case 3: xRotation = 0; yRotation = -90; break;
        case 4: xRotation = 0; yRotation = 90; break;
        case 5: xRotation = -90; yRotation = 0; break;
        case 6: xRotation = 90; yRotation = 0; break;
    }

    // Add multiple full spins (360 degrees) so it actually rolls
    // We multiply by a random amount of spins (min 2 spins)
    const spins = 5; 
    xRotation += 360 * spins; 
    yRotation += 360 * spins;

    // Apply transform
    cube.style.transform = `translateZ(-100px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

    resultText.innerText = "Rolling...";

    // Wait for animation to finish (1s) to show result
    setTimeout(() => {
        resultText.innerText = `You rolled a ${randNum}!`;
    }, 1000);
});