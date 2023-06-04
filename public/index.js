/*
 * Name: Tastuhiko Araki, Luna Osaki
 * Date: 05.05.2023
 * Section: CSE 154 AA, AF
 *
 * This is the JS file to implement the UI for hotel reservation page
 * This program control review page of the reservation service
 */
"use strict";

(function() {
  window.addEventListener("load", init);
  const MAX_STARS = 5;

  /**
   * Initializes the application by adding a 'submit' event listener to the review form.
   */
  function init() {
    id("login-form").addEventListener("submit", login);
    id("register-link").addEventListener("click", handleRegisterLink);
    id("register").addEventListener("submit", handleRegistrationForm);
    id("book-btn").addEventListener("click", bookRoom);
    id("rooms-photo").addEventListener('click', showRoom);
    id("dining-photo").addEventListener('click', showDining);
    id("contact-photo").addEventListener('click', showContact);
    id("booking-photo").addEventListener('click', showBooking);
    id("back-from-room").addEventListener('click', backRoom);
    id("back-from-contact").addEventListener('click', backContact);
    id("back-from-checkout").addEventListener('click', backCheckout);
    id("back-from-dining").addEventListener('click', backDining);
    id("back-from-confiramtion").addEventListener('click', backConfirmation);
    id("fil-button").addEventListener('click', changeFilterView);
    id("review-button").addEventListener('click', changeReviewView);
    id("back-from-search").addEventListener('click', backFilter);
    id("back-from-review").addEventListener('click', backReview);
    id("review-form").addEventListener('submit', submitReview);
    getAndDisplayReviews();
  }

  /**
   * Displays the room menu.
   */
  function showRoom() {
    id("main-menu").classList.add("hidden");
    id("room-menu").classList.remove("hidden");
  }

  /**
   * Displays the dining menu.
   */
  function showDining() {
    id("main-menu").classList.add("hidden");
    id("dining-menu").classList.remove("hidden");
  }

  /**
   * Displays the contact menu.
   */
  function showContact() {
    id("main-menu").classList.add("hidden");
    id("contact-menu").classList.remove("hidden");
  }

  /**
   * Displays the check-out page.
   */
  function showBooking() {
    id("main-menu").classList.add("hidden");
    id("check-out").classList.remove("hidden");
  }

  /**
   * Returns to the main menu from the room menu.
   */
  function backRoom() {
    id("main-menu").classList.remove("hidden");
    id("room-menu").classList.add("hidden");
  }

  /**
   * Returns to the main menu from the dining menu.
   */
  function backDining() {
    id("main-menu").classList.remove("hidden");
    id("dining-menu").classList.add("hidden");
  }

  /**
   * Returns to the main menu from the contact menu.
   */
  function backContact() {
    id("main-menu").classList.remove("hidden");
    id("contact-menu").classList.add("hidden");
  }

  /**
   * Returns to the main menu from the check-out page.
   */
  function backCheckout() {
    id("main-menu").classList.remove("hidden");
    id("check-out").classList.add("hidden");
  }

  /**
   * Returns to the main menu from the confirmation page.
   */
  function backConfirmation() {
    id("main-menu").classList.remove("hidden");
    id("confirmation").classList.add("hidden");
  }

  /**
   * Displays the filter view.
   */
  function changeFilterView() {
    id("main-menu").classList.add("hidden");
    id("choose-stay").classList.remove("hidden");
  }

  /**
   * Returns to the main menu from the filter view.
   */
  function backFilter() {
    id("main-menu").classList.remove("hidden");
    id("choose-stay").classList.add("hidden");
  }

  /**
   * Displays the review view.
   */
  function changeReviewView() {
    id("main-menu").classList.add("hidden");
    id("review-menu").classList.remove("hidden");
  }

  /**
   * Returns to the main menu from the review view.
   */
  function backReview() {
    id("main-menu").classList.remove("hidden");
    id("review-menu").classList.add("hidden");
  }

  /**
   * Handles the login process.
   *
   * @param {Event} event - The submit event.
   */
  function login(event) {
    event.preventDefault();

    let username = id("username").value;
    let password = id("password").value;

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('/login', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        id("main-menu").classList.remove("hidden");
        id("login-form").classList.add("hidden");
      })
      .catch(error => {
        handleError("Error during login: " + error.message);
      });

    id("username").value = "";
    id("password").value = "";
  }

  /**
   * Handles the registration link click event.
   *
   * @param {Event} event - The click event.
   */
  function handleRegisterLink(event) {
    event.preventDefault();
    id("register").classList.remove("hidden");
    id("login-form").classList.add("hidden");
  }

  /**
   * Returns to the login-form from the register page.
   */
  function handleBackFromRegister() {
    id("login-form").classList.remove("hidden");
    id("register").classList.add("hidden");
  }

  /**
   * Handles the registration form submission.
   */
  function handleRegistrationForm() {
    let username = id("new-username").value;
    let password = id("new-password").value;

    let user = {
      username: username,
      password: password
    };

    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Registration failed");
        }
        window.location.href = "filter.html";
      })
      .catch(error => {
        handleError("Error during registration: " + error.message);
      });
    id("new-username").value = "";
    id("new-password").value = "";
    handleBackFromRegister();
  }

  /**
   * Handles the room booking process.
   *
   * @param {Event} event - The click event.
   */
  function bookRoom(event) {
    event.preventDefault();
    let username = id("checkout-username").value;
    let roomtype = document.querySelector("select[name='dropdown']").value;
    let formData = new FormData();
    formData.append('username', username);
    formData.append('roomtype', roomtype);
    fetch('/book-room', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Booking failed");
        }
        return response.json();
      })
      .then(() => {
        id("confirmation").classList.remove("hidden");
        id("check-out").classList.add("hidden");
      })
      .catch(error => {
        handleError("Error during booking: " + error.message);
      });
    id("checkout-username").value = "";
    id("address").value = "";
    id("email").value = "";
    id("phonenumber").value = "";
  }

  /**
   * Submits a review.
   *
   * @param {Event} event - The submit event.
   */
  function submitReview(event) {
    event.preventDefault();
    let rating = document.querySelector('input[name="rate"]:checked').value;
    let title = id("reviewer-name").value;
    let comment = id("comment-text").value;
    let username = localStorage.getItem('username');
    let formData = new FormData();
    formData.append('username', username);
    formData.append('rating', rating);
    formData.append('title', title);
    formData.append('comment', comment);
    fetch('/submit-review', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Review submission failed");
        }
        return response.json();
      })
      .then(() => {
        getAndDisplayReviews();
      })
      .catch(error => {
        handleError("Error during review submission: " + error.message);
      });
    id("reviewer-name").value = "";
    id("comment-text").value = "";
    document.querySelector('input[name="rate"]:checked').checked = false;
  }

  /**
   * Retrieves and displays the reviews.
   */
  function getAndDisplayReviews() {
    fetch('/get-reviews')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to get reviews");
        }
        return response.json();
      })
      .then(data => {
        displayReviews(data);
      })
      .catch(error => {
        handleError("Error during fetching reviews: " + error.message);
      });
  }

  /**
   * Display reviews on the page.
   *
   * @param {Array} data - An array of review objects.
   */
  function displayReviews(data) {
    let reviews = id('reviews');
    reviews.innerHTML = '';
    data.forEach(review => {
      let reviewElement = document.createElement('div');
      reviewElement.classList.add('review');
      let starRating = getStarRating(review.rating);
      reviewElement.innerHTML = `
        <h2>${review.title}</h2>
        <p>${starRating}</p>
        <p>${review.comment}</p>
      `;
      reviews.appendChild(reviewElement);
    });
  }

  /**
   * Get the star rating based on the given rating.
   *
   * @param {number} rating - The rating value.
   * @returns {string} The star rating as a string.
   */
  function getStarRating(rating) {
    let starRating = '';
    for (let i = 0; i < MAX_STARS; i++) {
      if (i < rating) {
        starRating += '★';
      } else {
        starRating += '☆';
      }
    }
    return starRating;
  }

  /**
   * Returns the element with the specified ID attribute.
   *
   * @param {string} id - The ID attribute.
   * @returns {HTMLElement} The DOM object associated with the ID attribute.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Displays an error message to the user.
   * @param {string} errorMessage - The error message to display.
   */
  function handleError(errorMessage) {
    let errorElement = id("error-message");
    errorElement.textContent = errorMessage;
    errorElement.classList.remove("hidden");
  }
})();
