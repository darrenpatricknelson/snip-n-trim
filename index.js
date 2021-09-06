// This is the carousel on the portfolio page
// Project 1
var slideIndexP1 = 1;
showSlidesP1(slideIndexP1);

// Next/previous controls
function plusSlidesP1(n) {
  showSlidesP1((slideIndexP1 += n));
}

// Thumbnail image controls
function currentSlideP1(n) {
  showSlidesP1((slideIndexP1 = n));
}

function showSlidesP1(n) {
  var i;
  var slides = document.getElementsByClassName("slideshow1");
  if (n > slides.length) {
    slideIndexP1 = 1;
  }
  if (n < 1) {
    slideIndexP1 = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndexP1 - 1].style.display = "block";
}

// Project 2
var slideIndexP2 = 1;
showSlidesP2(slideIndexP2);

// Next/previous controls
function plusSlidesP2(n) {
  showSlidesP2((slideIndexP2 += n));
}

// Thumbnail image controls
function currentSlideP2(n) {
  showSlidesP2((slideIndexP2 = n));
}

function showSlidesP2(n) {
  var i;
  var slides = document.getElementsByClassName("slideshow2");
  if (n > slides.length) {
    slideIndexP2 = 1;
  }
  if (n < 1) {
    slideIndexP2 = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndexP2 - 1].style.display = "block";
}

// Project 3
var slideIndexP3 = 1;
showSlidesP3(slideIndexP3);

// Next/previous controls
function plusSlidesP3(n) {
  showSlidesP3((slideIndexP3 += n));
}

// Thumbnail image controls
function currentSlideP3(n) {
  showSlidesP3((slideIndexP3 = n));
}

function showSlidesP3(n) {
  var i;
  var slides = document.getElementsByClassName("slideshow3");
  if (n > slides.length) {
    slideIndexP3 = 1;
  }
  if (n < 1) {
    slideIndexP3 = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndexP3 - 1].style.display = "block";
}

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD8jhwZ3mad1ZgNLR_askhj1M5XpjuRAUc",
  authDomain: "snip-n-trim.firebaseapp.com",
  databaseURL: "https://snip-n-trim-default-rtdb.firebaseio.com",
  projectId: "snip-n-trim",
  storageBucket: "snip-n-trim.appspot.com",
  messagingSenderId: "1073689430763",
  appId: "1:1073689430763:web:642618f14787e746e54cae",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// create a reference to contactInfo
let contactInfo = firebase.database().ref("clientInformation");

// capturing the information from the form (being called in the reCAPTCHA event)
function submitForm() {
  let clientName = document.querySelector(".client_name").value;
  let clientEmail = document.querySelector(".client_email").value;
  let clientPhone = document.querySelector(".client_phone").value;
  let clientMessage = document.querySelector(".client_message").value;

  saveContactInfo(clientName, clientEmail, clientPhone, clientMessage);

  // sendEmail(clientName, clientEmail, clientPhone, clientMessage);
}

// save all the info to firebase

function saveContactInfo(clientName, clientEmail, clientPhone, clientMessage) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    Username: clientName,
    email: clientEmail,
    phoneNumber: clientPhone,
    message: clientMessage,
  });

  retrieveInfos();
}

//  retrieving your client information

let clientInformation = [];

async function logData(snapshot) {
  var data = await snapshot.toJSON();
  var keys = Object.keys(data);

  keys.forEach((key) => {
    clientInformation.push(data[key]);
    sendEmail();
  });
}

function retrieveInfos() {
  firebase
    .database()
    .ref("clientInformation")
    .orderByKey()
    .limitToLast(1)
    .on("value", logData);
}

//  send the email

// function sendEmail() {
//   console.log(clientInformation[0]);
//   Email.send({
//     Host: "smtp.gmail.com",
//     Username: "darrenp.dev@gmail.com",
//     Password: "Darrenp10",
//     To: "darrenp.dev@gmail.com",
//     From: "darrenp.dev@gmail.com",
//     Subject: `You received a new email`,
//     Body: `${clientInformation}`,
//   }).then((clientInformation) => console.log("Message sent successfully"));
// }

// all the form listen events

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
// for the input decoration (we will have to figure this shit out)
// (what needs to happen is = once you click on the input field)
// (it should stay active, however, once you click to the next active field)
// (that field becomes active and the previous field becomes inactive)
// const inputField = document.querySelector(".input");

// inputField.addEventListener("click", (e) => {
//   inputField.classList.add("input-active");
// });

// actual contact form

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
// var phoneNumber = /^\d{10}$/;
var phoneNumber2 = /(\d{3})[ -]?(\d{3})[ -]?(\d{4})*$/;
var phoneError1 = /^\d{11}$/;
var phoneError2 = /^\d{12}$/;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let message1 = null;
  let message2 = null;
  let message3 = null;

  if (theirName.value === "" || theirName.value == null) {
    theirName.classList.add("input-error");
    message1 = "* Name is required";
  } else {
    theirName.classList.remove("input-error");
  }

  if (!email.value.match(validRegex)) {
    email.classList.add("input-error");
    message2 = "* Valid email is required";
  } else {
    email.classList.remove("input-error");
  }

  if (
    !phone.value
      .replaceAll(/[^\w\s]/gi, "")
      .replaceAll(" ", "")
      .match(/^[0-9]{10}$/)
  ) {
    phone.classList.add("input-error");
    message3 = "* Valid phone number is required";
  } else {
    phone.classList.remove("input-error");
  }

  if (message1) {
    errorElement_name.innerText = message1;
  } else {
    errorElement_name.innerText = "";
  }

  if (message2) {
    errorElement_email.innerText = message2;
  } else {
    errorElement_email.innerText = "";
  }

  if (message3) {
    errorElement_phone.innerText = message3;
  } else {
    errorElement_phone.innerText = "";
  }

  if (!message1 && !message2 && !message3) {
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

let message4 = null;

checked.addEventListener("click", (e) => {
  e.preventDefault();

  // This will present the hidden overlay, commencing the 'reCAPTCHA' click event
  presentation.classList.remove("looker");
  loading.classList.remove("hide-content");
  setTimeout(() => {
    loading.classList.add("hide-content");
    confirmed.classList.remove("hide-content");
  }, 1000);

  // this is the function that will save all the contact information to firebase
  setTimeout(submitForm, 1999);

  // This will clear all the fields
  setTimeout(() => {
    robotCheckForm.classList.add("hide-content");
    theirName.value = "";
    email.value = "";
    phone.value = "";
    message.value = "";
    message4 = "Thank you for your enquiry!";

    if (message4) {
      successMessage.innerText = message4;
    } else {
      successMessage.innerText = "";
    }
  }, 2000);

  // This will add the decoration back to the hidden overlay
  setTimeout(() => {
    presentation.classList.add("looker");
    confirmed.classList.add("hide-content");
    message4 = null;
  }, 2001);

  // This will clear the "Thank you message"
  setTimeout(() => {
    successMessage.innerText = "";
  }, 10000);
});

exit.addEventListener("click", (e) => {
  e.preventDefault();
  robotCheckForm.classList.add("hide-content");
});
