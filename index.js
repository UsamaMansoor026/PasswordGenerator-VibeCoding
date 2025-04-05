const input = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.querySelector(".btn");

const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");

// Event listener for button
generateBtn.addEventListener("click", () => {
  generatePassword(); // Uses selected user options
});

function generatePassword(length = null, useNumbers = null, useSymbols = null) {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Use params if provided, otherwise read from UI
  const finalLength =
    length ||
    parseInt(document.querySelector('input[name="length"]:checked').value);
  const addNumbers = useNumbers !== null ? useNumbers : includeNumbers.checked;
  const addSymbols = useSymbols !== null ? useSymbols : includeSymbols.checked;

  if (addNumbers) chars += "0123456789";
  if (addSymbols) chars += "!@#$%^&*()_+{}[]:;<>,.?~";

  let password = "";
  for (let i = 0; i < finalLength; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  input.value = password;
  toggleCopyIcon();
}

function toggleCopyIcon() {
  copyBtn.style.display = input.value.trim() !== "" ? "block" : "none";
}

function copyToClipboard() {
  input.select();
  document.execCommand("copy");
  copyBtn.textContent = "✅";
  setTimeout(() => {
    copyBtn.textContent = "📋";
  }, 1000);
}

// Generate initial password on first load (length 6, alphabets only)
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    generatePassword(6, false, false);
  }, 1400);
});
