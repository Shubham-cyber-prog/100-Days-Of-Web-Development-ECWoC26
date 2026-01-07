const form = document.getElementById("signupForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-text");

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  formGroup.querySelector("small").innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}

function checkRequired(inputs) {
  inputs.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, `${input.id} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkEmail(input) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(input.value.trim())) {
    showError(input, "Email is not valid");
  } else {
    showSuccess(input);
  }
}

function checkLength(input, min) {
  if (input.value.length < min) {
    showError(input, `${input.id} must be at least ${min} characters`);
  } else {
    showSuccess(input);
  }
}


function checkPasswordStrength(value) {
  let strength = 0;

  if (value.length >= 6) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;

  switch (strength) {
    case 0:
      strengthBar.style.width = "0%";
      strengthText.innerText = "";
      break;
    case 1:
      strengthBar.style.width = "25%";
      strengthBar.style.background = "#e74c3c";
      strengthText.innerText = "Weak";
      break;
    case 2:
      strengthBar.style.width = "50%";
      strengthBar.style.background = "#f39c12";
      strengthText.innerText = "Medium";
      break;
    case 3:
      strengthBar.style.width = "75%";
      strengthBar.style.background = "#3498db";
      strengthText.innerText = "Strong";
      break;
    case 4:
      strengthBar.style.width = "100%";
      strengthBar.style.background = "#2ecc71";
      strengthText.innerText = "Very Strong";
      break;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password]);
  checkLength(username, 3);
  checkLength(password, 6);
  checkEmail(email);
});

// Real-time validation
username.addEventListener("input", () => checkLength(username, 3));
email.addEventListener("input", () => checkEmail(email));
password.addEventListener("input", () => {
  checkLength(password, 6);
  checkPasswordStrength(password.value);
});
