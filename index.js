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

document.addEventListener("DOMContentLoaded", () => {
  // pages
  const homePage = document.querySelector("#home");
  const aboutUsPage = document.querySelector("#about-us");
  const servicesPage = document.querySelector("#services");
  const portfolioPage = document.querySelector("#portfolio");
  const testimonialPage = document.querySelector("#testimonials");
  const contactPage = document.querySelector("#contact");

  // active status
  const homePageActive = document.querySelector("#home-link");
  const aboutUsPageActive = document.querySelector("#about-us-link");
  const servicesPageActive = document.querySelector("#services-link");
  const portfolioPageActive = document.querySelector("#portfolio-link");
  const testimonialPageActive = document.querySelector("#testimonial-link");
  const contactPageActive = document.querySelector("#contact-link");

  // navbar Home link javascript
  document.querySelector("#home-link").addEventListener("click", (e) => {
    e.preventDefault();
    homePage.classList.remove("hide-content");
    aboutUsPage.classList.add("hide-content");
    servicesPage.classList.add("hide-content");
    portfolioPage.classList.add("hide-content");
    testimonialPage.classList.add("hide-content");
    contactPage.classList.add("hide-content");

    // active status
    homePageActive.classList.add("active");
    aboutUsPageActive.classList.remove("active");
    servicesPageActive.classList.remove("active");
    portfolioPageActive.classList.remove("active");
    testimonialPageActive.classList.remove("active");
    contactPageActive.classList.remove("active");

    navToggle();
  });

  // navbar about us link javascript
  document.querySelector("#about-us-link").addEventListener("click", (e) => {
    e.preventDefault();
    homePage.classList.add("hide-content");
    aboutUsPage.classList.remove("hide-content");
    servicesPage.classList.add("hide-content");
    portfolioPage.classList.add("hide-content");
    testimonialPage.classList.add("hide-content");
    contactPage.classList.add("hide-content");

    // active status
    homePageActive.classList.remove("active");
    aboutUsPageActive.classList.add("active");
    servicesPageActive.classList.remove("active");
    portfolioPageActive.classList.remove("active");
    testimonialPageActive.classList.remove("active");
    contactPageActive.classList.remove("active");

    navToggle();
  });

  // navbar services link javascript
  document.querySelector("#services-link").addEventListener("click", (e) => {
    e.preventDefault();
    homePage.classList.add("hide-content");
    aboutUsPage.classList.add("hide-content");
    servicesPage.classList.remove("hide-content");
    portfolioPage.classList.add("hide-content");
    testimonialPage.classList.add("hide-content");
    contactPage.classList.add("hide-content");

    // active status
    homePageActive.classList.remove("active");
    aboutUsPageActive.classList.remove("active");
    servicesPageActive.classList.add("active");
    portfolioPageActive.classList.remove("active");
    testimonialPageActive.classList.remove("active");
    contactPageActive.classList.remove("active");

    navToggle();
  });

  // navbar portfolio link javascript
  document.querySelector("#portfolio-link").addEventListener("click", (e) => {
    e.preventDefault();
    homePage.classList.add("hide-content");
    aboutUsPage.classList.add("hide-content");
    servicesPage.classList.add("hide-content");
    portfolioPage.classList.remove("hide-content");
    testimonialPage.classList.add("hide-content");
    contactPage.classList.add("hide-content");

    // active status
    homePageActive.classList.remove("active");
    aboutUsPageActive.classList.remove("active");
    servicesPageActive.classList.remove("active");
    portfolioPageActive.classList.add("active");
    testimonialPageActive.classList.remove("active");
    contactPageActive.classList.remove("active");

    navToggle();
  });

  // navbar testimonials link javascript
  document.querySelector("#testimonial-link").addEventListener("click", (e) => {
    e.preventDefault();
    homePage.classList.add("hide-content");
    aboutUsPage.classList.add("hide-content");
    servicesPage.classList.add("hide-content");
    portfolioPage.classList.add("hide-content");
    testimonialPage.classList.remove("hide-content");
    contactPage.classList.add("hide-content");

    // active status
    homePageActive.classList.remove("active");
    aboutUsPageActive.classList.remove("active");
    servicesPageActive.classList.remove("active");
    portfolioPageActive.classList.remove("active");
    testimonialPageActive.classList.add("active");
    contactPageActive.classList.remove("active");

    navToggle();
  });

  // navbar contact link javascript
  document.querySelector("#contact-link").addEventListener("click", (e) => {
    e.preventDefault();
    homePage.classList.add("hide-content");
    aboutUsPage.classList.add("hide-content");
    servicesPage.classList.add("hide-content");
    portfolioPage.classList.add("hide-content");
    testimonialPage.classList.add("hide-content");
    contactPage.classList.remove("hide-content");

    // active status
    homePageActive.classList.remove("active");
    aboutUsPageActive.classList.remove("active");
    servicesPageActive.classList.remove("active");
    portfolioPageActive.classList.remove("active");
    testimonialPageActive.classList.remove("active");
    contactPageActive.classList.add("active");

    navToggle();
  });
});
