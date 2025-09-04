const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let currentInput = "";

// Handle button clicks with event delegation
buttons.addEventListener("click", (e) => {
  const button = e.target;
  const value = button.dataset.value;
  const action = button.dataset.action;

  if (!button.tagName === "BUTTON") return;

  if (action === "clear") {
    currentInput = "";
    updateDisplay("0");
  } else if (action === "delete") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
  } else if (action === "calculate") {
    calculateResult();
  } else if (value) {
    currentInput += value;
    updateDisplay(currentInput);
  }
});

// Update display
function updateDisplay(content) {
  display.value = content;
}

// Calculate result safely
function calculateResult() {
  try {
    const result = Function("return " + currentInput)();
    currentInput = result.toString();
    updateDisplay(currentInput);
  } catch {
    updateDisplay("Error");
    currentInput = "";
  }
}
