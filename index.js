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

// To change pages

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

// create a reference to reviewer info
let reviewerInfo = firebase.database().ref("reviewerInfo");

// fetching latest objects
reviewerInfo.orderByKey().limitToLast(6).once("value", appendInitialReviews);

async function appendInitialReviews(snapshot) {
  var data = await snapshot.toJSON();
  var keys = Object.keys(data);

  keys.forEach((key) => {
    setReview(data[key]);
  });
}

// capturing the information from the form
function submitReview() {
  let reviewerName = document.querySelector(".reviewer_name").value;
  let reviewerMessage = document.querySelector(".review_message").value;

  saveReviewerInfo(reviewerName, reviewerMessage);
}

// save all the info to firebase
function saveReviewerInfo(reviewerName, reviewerMessage) {
  let newReviewerInfo = reviewerInfo.push();

  newReviewerInfo.set({
    Username: reviewerName,
    message: reviewerMessage,
  });

  retrieveReviewerInfos();
}

//  retrieving your client information

async function appendLastReview(snapshot) {
  var data = await snapshot.toJSON();
  var keys = Object.keys(data);

  setReview(data[keys[0]]);

  reviewerInfo.off("value", appendLastReview);
}

function retrieveReviewerInfos() {
  reviewerInfo.orderByKey().limitToLast(1).on("value", appendLastReview);
}

//  set review

function setReview(data) {
  data;

  // create the parent
  let reviewSection = document.getElementById("reviewSection");

  // create the child
  let reviewBox = document.createElement("div");
  reviewBox.classList.add("review-box");

  // create grandchildren
  let textName = document.createElement("p");
  let textDate = document.createElement("p");
  let textMessage = document.createElement("p");

  // create the values (name, date and message)
  let date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  date = document.createTextNode(
    " - " + date.getDate() + " " + months[date.getMonth()]
  );
  let nameValue = document.createTextNode(data.Username);
  let messsageValue = document.createTextNode(data.message);

  // add text to p tag
  textName.appendChild(nameValue);
  textName.classList.add("review-title");
  textName.classList.add("inline");
  textDate.appendChild(date);
  textDate.classList.add("inline");
  textMessage.appendChild(messsageValue);
  textMessage.classList.add("review-message");

  // add grandchildren to child (name and messages to the review box)
  reviewBox.appendChild(textName);
  reviewBox.appendChild(textDate);
  reviewBox.appendChild(textMessage);
  reviewBox.classList.add("inline");

  // add child to parent (review box to review section)
  reviewSection.appendChild(reviewBox);
}

// review form on the testimonial page
const reviewForm = document.getElementById("review-form");
const reviewerName = document.getElementById("reviewer_name");
const reviewerMessage = document.getElementById("review_message");
const errorElement_reviewerName = document.getElementById("review_error_name");
const errorElement_reviewerMessage = document.getElementById(
  "review_error_message"
);
const reviewSuccessMessage = document.getElementById("review_thankYou");

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let reviewerNameBox = reviewerName;
  let reviewerMessageBox = reviewerMessage;
  let reviewer_nameError = null;
  let reviewer_messageError = null;
  let reviewer_thankYou = null;

  // error for blank name
  if (reviewerName.value === "" || reviewerName.value == null) {
    reviewerName.classList.add("input-error");
    reviewer_nameError = "* Name and surname is required";
  } else {
    reviewerName.classList.remove("input-error");
  }

  // error for blank message
  if (reviewerMessage.value === "" || reviewerMessage.value == null) {
    reviewerMessage.classList.add("input-error");
    reviewer_messageError = "* Your review is important to us";
  } else {
    reviewerMessage.classList.remove("input-error");
  }

  if (reviewer_nameError) {
    errorElement_reviewerName.innerText = reviewer_nameError;
  } else {
    errorElement_reviewerName.innerText = "";
  }

  if (reviewer_messageError) {
    errorElement_reviewerMessage.innerText = reviewer_messageError;
  } else {
    errorElement_reviewerMessage.innerText = "";
  }

  if (!reviewer_nameError && !reviewer_messageError) {
    submitReview();
    reviewerNameBox.value = "";
    reviewerMessageBox.value = "";
    reviewer_thankYou =
      "Thank you for your review. We appreciate our loyal cliental";
    reviewSuccessMessage.innerText = reviewer_thankYou;
    setTimeout(() => {
      reviewer_thankYou = "";
      reviewSuccessMessage.innerText = reviewer_thankYou;
    }, 3000);
  }
});

// create a reference to reviewer info
let reviewerInfoAll = firebase.database().ref("reviewerInfo");

// fetching latest objects
reviewerInfoAll.orderByKey().once("value", appendInitialReviewsAll);

async function appendInitialReviewsAll(snapshot) {
  var dataAll = await snapshot.toJSON();
  var keys = Object.keys(dataAll);

  keys.forEach((key) => {
    seeAll(dataAll[key]);
  });
}

// function to show all reviews

function seeAll(dataAll) {
  console.log("yebo!");
  let reviewSection = document.getElementById("seeAllReviews");
  reviewSection.classList.remove("hide-content");

  dataAll;

  // create the parent
  let reviewSectionAll = document.getElementById("reviewSectionAll");

  // create the child
  let reviewBox = document.createElement("div");
  reviewBox.classList.add("review-box");

  // create grandchildren
  let textName = document.createElement("p");
  let textDate = document.createElement("p");
  let textMessage = document.createElement("p");

  // create the values (name, date and message)
  let date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  date = document.createTextNode(
    " - " + date.getDate() + " " + months[date.getMonth()]
  );
  let nameValue = document.createTextNode(dataAll.Username);
  let messsageValue = document.createTextNode(dataAll.message);

  // add text to p tag
  textName.appendChild(nameValue);
  textName.classList.add("review-title");
  textName.classList.add("inline");
  textDate.appendChild(date);
  textDate.classList.add("inline");
  textMessage.appendChild(messsageValue);
  textMessage.classList.add("review-message");

  // add grandchildren to child (name and messages to the review box)
  reviewBox.appendChild(textName);
  reviewBox.appendChild(textDate);
  reviewBox.appendChild(textMessage);
  reviewBox.classList.add("inline");

  // add child to parent (review box to review section)
  reviewSectionAll.appendChild(reviewBox);
}

// exit the field
function exitSeeAll() {
  let reviewSection = document.getElementById("seeAllReviews");
  reviewSection.classList.add("hide-content");
}

// contact form on the contact page

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

const tickBox = document.getElementById("tick-box");
const checked = document.getElementById("checked");
const loading = document.getElementById("check-loading");
const confirmed = document.getElementById("check-confirmed");
const exit = document.getElementById("exit");
const successMessage = document.getElementById("thankYou");

let message4 = null;

checked.addEventListener("click", (e) => {
  e.preventDefault();

  // This will present the hidden overlay, commencing the 'reCAPTCHA' click event
  tickBox.classList.remove("looker");
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
    tickBox.classList.add("looker");
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
