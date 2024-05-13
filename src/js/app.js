import * as flsFunctions from "./modules/functions.js";

const emailInpueEl = document.querySelector(".footer__email-area-input");
const emailButtonEl = document.querySelector(".footer__email-area-button");
let isEmailValid = false;

emailInpueEl.addEventListener("input", function (event) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const inputValue = event.target.value;
  if (inputValue !== "" && !inputValue.match(emailRegex)) {
    emailInpueEl.classList.add("error-input");
    emailButtonEl.classList.add("error-button");
    emailButtonEl.disabled = true;
    isEmailValid = false;
  } else {
    emailInpueEl.classList.remove("error-input");
    emailButtonEl.classList.remove("error-button");
    emailButtonEl.disabled = false;
    isEmailValid = true;
  }
});

emailButtonEl.addEventListener("click", function (event) {
  if (isEmailValid) {
    console.log(`Client email: ${emailInpueEl.value}`);
  }
});

window.addEventListener("click", (e) => {
  const currElClassList = Array.from(e.target?.classList || []);
  if (
    !currElClassList.includes("header__navigation-item") ||
    currElClassList.includes("header__navigation-item--active") ||
    !currElClassList.length
  ) {
    return;
  }

  const prevActive = document.querySelector(".header__navigation-item--active");
  const prevActiveClassList = Array.from(prevActive?.classList || []);
  if (prevActiveClassList.includes("header__navigation-item--active")) {
    prevActive.classList.remove("header__navigation-item--active");
  }

  e.target.classList.add("header__navigation-item--active");
});

// Header title
const headerCompanyName = document.querySelector(".header__company-title");

const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const headerCompanyNameParent = headerCompanyName?.parentElement;
    const secondChild = headerCompanyNameParent?.children?.[1];
    let previousSibling = headerCompanyName.previousElementSibling;
    let nextSibling = headerCompanyName.nextElementSibling;
    const newWidth = entry.contentRect.width;
    const headEclipseEl = document.querySelector(".head-bg-eclipse");

    if (headEclipseEl) {
      if (newWidth < 797) {
        headEclipseEl.style.display = "none";
      } else {
        headEclipseEl.style.display = "block";
      }
    }

    if (!headerCompanyNameParent || !secondChild) {
      return;
    }

    const secondChildClasses = Array.from(secondChild.classList);

    if (
      newWidth < 1200 &&
      secondChildClasses.includes("header__company-title")
    ) {
      headerCompanyNameParent.insertBefore(headerCompanyName, previousSibling);
      return;
    }

    if (
      newWidth > 1200 &&
      !secondChildClasses.includes("header__company-title")
    ) {
      headerCompanyNameParent.insertBefore(nextSibling, headerCompanyName);
    }
  }
});

// Начинаем отслеживание изменений ширины экрана для определенного элемента
resizeObserver.observe(document.body);

flsFunctions.isWebp();
