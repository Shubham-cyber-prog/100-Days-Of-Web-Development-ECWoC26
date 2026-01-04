
function calculateBMI() {
    const heightValue = document.getElementById("height").value;
    const heightUnit = document.getElementById("heightUnit").value;
    const weight = document.getElementById("weight").value;

    const result = document.getElementById("bmiResult");
    const status = document.getElementById("bmiStatus");
    const idealInfo = document.getElementById("idealInfo");

    if (!heightValue || !weight || heightValue <= 0 || weight <= 0) {
        result.textContent = "Please enter valid values";
        status.textContent = "";
        idealInfo.textContent = "";
        status.className = "";
        return;
    }

    // Convert height to meters
    let heightCm = heightUnit === "ft"
        ? heightValue * 30.48
        : heightValue;

    const heightMeters = heightCm / 100;
    const bmi = weight / (heightMeters * heightMeters);
    const roundedBMI = bmi.toFixed(2);

    let message = "";
    let tip = "";
    let className = "";

    if (bmi < 18.5) {
        message = "Underweight";
        tip = "Increase calorie intake with nutritious food and strength training.";
        className = "underweight";
    } else if (bmi < 24.9) {
        message = "Normal weight";
        tip = "Maintain a balanced diet and regular exercise.";
        className = "normal";
    } else if (bmi < 29.9) {
        message = "Overweight";
        tip = "Focus on cardio, portion control, and consistency.";
        className = "overweight";
    } else {
        message = "Obese";
        tip = "Gradual weight loss through diet, exercise, and guidance is recommended.";
        className = "obese";
    }

    // Ideal BMI calculation
    const idealMinWeight = (18.5 * heightMeters * heightMeters).toFixed(1);
    const idealMaxWeight = (24.9 * heightMeters * heightMeters).toFixed(1);

    result.textContent = `Your BMI: ${roundedBMI}`;
    status.textContent = `Status: ${message} — ${tip}`;
    status.className = className;

    idealInfo.textContent =
        `Ideal BMI range: 18.5 – 24.9.
        For your height, ideal weight is between ${idealMinWeight} kg and ${idealMaxWeight} kg.`;
}
=======
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultContainer = document.getElementById('result');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiMessage = document.getElementById('bmi-message');

    calculateBtn.addEventListener('click', calculateBMI);

    // Also calculate when pressing Enter in input fields
    heightInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateBMI();
    });
    
    weightInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateBMI();
    });

    function calculateBMI() {
        const height = parseFloat(heightInput.value) / 100; // Convert cm to m
        const weight = parseFloat(weightInput.value);
        
        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            alert('Please enter valid height and weight values');
            return;
        }
        
        const bmi = weight / (height * height);
        displayResult(bmi);
    }

    function displayResult(bmi) {
        resultContainer.classList.remove('hidden');
        
        // Animate the BMI value counting up
        animateValue(bmiValue, 0, bmi, 1000);
        
        // Determine category and set appropriate color/message
        let category, message, color;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            message = 'You are underweight. Consider gaining some weight for better health.';
            color = '#3498db';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal';
            message = 'Great! You have a healthy weight. Keep it up!';
            color = '#2ecc71';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            message = 'You are overweight. Consider some lifestyle changes to improve your health.';
            color = '#f39c12';
        } else {
            category = 'Obese';
            message = 'You are obese. Please consult with a healthcare professional for guidance.';
            color = '#e74c3c';
        }
        
        bmiCategory.textContent = category;
        bmiCategory.style.color = color;
        bmiMessage.textContent = message;
        bmiValue.style.color = color;
    }

    // Function to animate the counting up of the BMI value
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toFixed(1);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});

