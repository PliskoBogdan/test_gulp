import * as flsFunctions from "./modules/functions.js";

const emailInpueEl = document.querySelector(".footer__email-area-input");
const emailButtonEl = document.querySelector(".footer__email-area-button");
let isEmailValid = false

emailInpueEl.addEventListener("input", function (event) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const inputValue = event.target.value;
  if (inputValue !== "" && !inputValue.match(emailRegex)) {
    emailInpueEl.classList.add("error-input");
    emailButtonEl.classList.add("error-button");
    emailButtonEl.disabled = true
    isEmailValid = false
  } else {
    emailInpueEl.classList.remove("error-input");
    emailButtonEl.classList.remove("error-button");
    emailButtonEl.disabled = false
    isEmailValid = true
  }
});

emailButtonEl.addEventListener("click", function(event) {
    if (isEmailValid) {
        console.log(`Client email: ${emailInpueEl.value}`)
    }
})

console.log(emailInpueEl);

flsFunctions.isWebp();
