const bookingForm = document.querySelector("#bookingForm");
const bookingCode = document.querySelector("#bookingCode");
const clearCode = document.querySelector(".clear-code");
const codeHelp = document.querySelector("#codeHelp");
const selectionSummary = document.querySelector("#selectionSummary");
const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toastMessage");

let selectedDate = "Sunday, 19 July";
let selectedTime = "10:30 AM";
let toastTimer;

function updateSelection() {
  selectionSummary.textContent = `${selectedDate} · ${selectedTime}`;
}

document.querySelectorAll(".date-option").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".date-option").forEach((option) => {
      option.classList.remove("active");
      option.setAttribute("aria-checked", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-checked", "true");
    selectedDate = button.dataset.date;
    updateSelection();
  });
});

document.querySelectorAll(".time-option").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("unavailable")) return;

    document.querySelectorAll(".time-option").forEach((option) => {
      option.classList.remove("active");
      option.setAttribute("aria-checked", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-checked", "true");
    selectedTime = button.dataset.time;
    updateSelection();
  });
});

bookingCode.addEventListener("input", () => {
  bookingCode.value = bookingCode.value.toUpperCase();
  clearCode.classList.toggle("visible", bookingCode.value.length > 0);
  codeHelp.classList.remove("error");
  codeHelp.textContent = "Your code can be found in your invitation email.";
});

clearCode.addEventListener("click", () => {
  bookingCode.value = "";
  clearCode.classList.remove("visible");
  bookingCode.focus();
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = bookingCode.value.trim();

  if (!code) {
    codeHelp.textContent = "Please enter your unique booking code.";
    codeHelp.classList.add("error");
    bookingCode.focus();
    return;
  }

  toastMessage.textContent = `${code} · ${selectedDate}, ${selectedTime}`;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4000);
});
