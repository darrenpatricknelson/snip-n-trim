const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", navToggle);

function navToggle() {
  navToggler.classList.toggle("active");
  const nav = document.querySelector(".nav");
  nav.classList.toggle("open");
  if (nav.classList.contains("open")) {
    nav.style.maxHeight = nav.scrollHeight + "px";
  } else {
    nav.removeAttribute("style");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const pageLinks = document.querySelectorAll("[data-page-link]");
  const pages = document.querySelectorAll("[data-pages]");

  pageLinks.forEach((pageLink) => {
    pageLink.addEventListener("click", (e) => {
      e.preventDefault();

      pageLinks.forEach((pageLinkSibling) =>
        pageLinkSibling.classList.remove("active")
      );

      pageLink.classList.add("active");

      pages.forEach((page) => {
        page.classList.add("hide-content");
      });

      document
        .getElementById(pageLink.dataset.target)
        .classList.remove("hide-content");

      navToggle();
    });
  });
});

// contact form
const form = document.getElementById("form");
const theirName = document.getElementById("form_name");
const email = document.getElementById("form_email");
const phone = document.getElementById("form_phone");
const message = document.getElementById("form_message");
const errorElement_name = document.getElementById("error_name");
const errorElement_email = document.getElementById("error_email");
const errorElement_phone = document.getElementById("error_phone");
const robotCheckForm = document.getElementById("robot-check-form");

var validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var phoneNumber = /^\d{10}$/;

form.addEventListener("submit", (e) => {
  let message1 = [];
  let message2 = [];
  let message3 = [];

  if (theirName.value === "" || theirName.value == null) {
    message1.push("* Name is required");
  }

  if (!email.value.match(validRegex)) {
    message2.push("* Valid email is required");
  }

  if (!phone.value.match(phoneNumber)) {
    message3.push("* Invalid phone number");
  }

  if (message1.length > 0) {
    e.preventDefault();
    errorElement_name.innerText = message1;
  } else {
    e.preventDefault();
    errorElement_name.innerText = "";
  }

  if (message2.length > 0) {
    e.preventDefault();
    errorElement_email.innerText = message2;
  } else {
    e.preventDefault();
    errorElement_email.innerText = "";
  }

  if (message3.length > 0) {
    e.preventDefault();
    errorElement_phone.innerText = message3;
  } else {
    e.preventDefault();
    errorElement_phone.innerText = "";
  }

  if (message1.length === 0 && message2.length === 0 && message3.length === 0) {
    robotCheckForm.classList.remove("hide-content");
  }
});

// this is the reCAPTCHA click event

const presentation = document.getElementById("presentation-box");
const checked = document.getElementById("checked");
const loading = document.getElementById("check-loading");
const confirmed = document.getElementById("check-confirmed");
const exit = document.getElementById("exit");
const successMessage = document.getElementById("thankYou");

let message4 = [];

checked.addEventListener("click", (e) => {
  e.preventDefault();
  presentation.classList.remove("looker");
  loading.classList.remove("hide-content");
  setTimeout(() => {
    loading.classList.add("hide-content");
  }, 1000);

  setTimeout(() => {
    confirmed.classList.remove("hide-content");
  }, 1000);

  setTimeout(() => {
    robotCheckForm.classList.add("hide-content");
    theirName.value = "";
    email.value = "";
    phone.value = "";
    message.value = "";
    message4.push("Thank you for your enquiry!");

    if (message4.length > 0) {
      e.preventDefault();
      successMessage.innerText = message4;
    } else {
      successMessage.innerText = "";
    }
  }, 2000);

  setTimeout(() => {
    presentation.classList.add("looker");
    confirmed.classList.add("hide-content");
  }, 2001);

  setTimeout(() => {
    successMessage.innerText = "";
  }, 10000);
});

exit.addEventListener("click", (e) => {
  e.preventDefault();
  robotCheckForm.classList.add("hide-content");
});

// theirName.innerText = "";
// email.innerText = "";
// phone.innerText = "";
// message.innerText = "";
