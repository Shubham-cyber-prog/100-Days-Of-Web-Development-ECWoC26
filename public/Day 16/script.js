const passwordField = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const strengthText = document.getElementById("strengthText");

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

function generatePassword() {
    const length = lengthSlider.value;
    const uppercase = document.getElementById("uppercase").checked;
    const lowercase = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;

    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+[]{}|;:,.<>?";

    if (chars === "") {
        passwordField.value = "Select options";
        strengthText.textContent = "—";
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    passwordField.value = password;
    checkStrength(password);
}

function checkStrength(password) {
    let strength = "Weak";

    if (password.length >= 12) strength = "Medium";
    if (password.length >= 16) strength = "Strong";

    strengthText.textContent = strength;
}

function copyPassword() {
    if (!passwordField.value) return;
    navigator.clipboard.writeText(passwordField.value);
    alert("Password copied to clipboard!");
}
