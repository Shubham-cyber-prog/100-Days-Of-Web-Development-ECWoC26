const calculateBtn = document.getElementById('calculate-btn');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
});

//  Logic for BMI Calculation
calculateBtn.addEventListener('click', () => {
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);

    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
        alert("Please enter valid positive numbers");
        return;
    }

    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    displayResult(bmi);
});

function displayResult(bmi) {
    const resultContainer = document.getElementById('resCont');
    const bmiDisplay = document.getElementById('bmi-display');
    const statusDisplay = document.getElementById('status-display');
    const tipsDisplay = document.getElementById('tips-display');

    resultContainer.classList.remove('hidden');
    bmiDisplay.textContent = bmi;

    let status = "";
    let tips = "";

    if (bmi < 18.5) {
        status = "Underweight";
        tips = "Focus on nutrient-dense foods and healthy fats. Consider strength training to build muscle mass.";
    } else if (bmi < 24.9) {
        status = "Normal Weight";
        tips = "Great job! Maintain your current lifestyle with a balanced diet and regular physical activity.";
    } else if (bmi < 29.9) {
        status = "Overweight";
        tips = "Try incorporating 30 minutes of moderate exercise daily and monitor your portion sizes.";
    } else {
        status = "Obese";
        tips = "Consult with a healthcare provider for a personalized plan. Focus on whole foods and reducing processed sugars.";
    }

    statusDisplay.textContent = status;
    tipsDisplay.textContent = tips;
}