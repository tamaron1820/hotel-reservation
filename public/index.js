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
    let registerlink = id("register-link");
    let loginForm = id("login-form");
    loginForm.addEventListener("submit", login);
    registerlink.addEventListener("click", handleRegisterLink);
    let registerForm = id("register");
    registerForm.addEventListener("submit", handleRegistrationForm);
    let bookBtn = id("book-btn");
    bookBtn.addEventListener("click", bookRoom);
    let roomPhoto = id("rooms-photo");
    roomPhoto.addEventListener('click',showRoom);
    let diningPhoto = id("dining-photo");
    diningPhoto.addEventListener('click',showDining);
    let contactPhoto = id("contact-photo");
    contactPhoto.addEventListener('click',showContact);
    let bookingPhoto = id("booking-photo");
    bookingPhoto.addEventListener('click',showBooking);
    let backFromRoom = id("back-from-room");
    backFromRoom.addEventListener('click', backRoom);
    let backFromContact = id("back-from-contact");
    backFromContact.addEventListener('click', backContact);
    let backFromCheckout= id("back-from-checkout");
    backFromCheckout.addEventListener('click', backCheckout);
    let backFromDining = id("back-from-dining");
    backFromDining.addEventListener('click', backDining);
    let backFromConfirmation= id("back-from-confiramtion");
    backFromConfirmation.addEventListener('click', backConfirmation);
    let changeFilter = id("fil-button");
    changeFilter.addEventListener('click', changeFilterView);
    let changeReview = id("review-button");
    changeReview.addEventListener('click', changeReviewView);
    let backFromFilter = id("back-from-search");
    backFromFilter.addEventListener('click', backFilter);
    let backFromReview = id("back-from-review");
    backFromReview.addEventListener('click', backReview);
    let reviewForm = id("review-form");
    reviewForm.addEventListener('submit', submitReview);
    getAndDisplayReviews();
  }

  function showRoom() {
    id("main-menu").classList.add("hidden");
    id("room-menu").classList.remove("hidden");
  }

  function showDining() {
    id("main-menu").classList.add("hidden");
    id("dining-menu").classList.remove("hidden");
  }

  function showContact() {
    id("main-menu").classList.add("hidden");
    id("contact-menu").classList.remove("hidden");
  }

  function showBooking() {
    id("main-menu").classList.add("hidden");
    id("check-out").classList.remove("hidden");
  }

  function backRoom() {
    id("main-menu").classList.remove("hidden");
    id("room-menu").classList.add("hidden");
  }

  function backDining() {
    id("main-menu").classList.remove("hidden");
    id("dining-menu").classList.add("hidden");
  }

  function backContact() {
    id("main-menu").classList.remove("hidden");
    id("contact-menu").classList.add("hidden");
  }

  function backCheckout() {
    id("main-menu").classList.remove("hidden");
    id("check-out").classList.add("hidden");
  }

  function backConfirmation() {
    id("main-menu").classList.remove("hidden");
    id("confirmation").classList.add("hidden");
  }

  function changeFilterView() {
    id("main-menu").classList.add("hidden");
    id("choose-stay").classList.remove("hidden");
  }

  function backFilter() {
    id("main-menu").classList.remove("hidden");
    id("choose-stay").classList.add("hidden");
  }

  function changeReviewView() {
    id("main-menu").classList.add("hidden");
    id("review-menu").classList.remove("hidden")
  }

  function backReview() {
    id("main-menu").classList.remove("hidden");
    id("review-menu").classList.add("hidden");
  }
  function login(event) {
    event.preventDefault();

    let username = id("username").value;
    let password = id("password").value;

    let user = {
      username: username,
      password: password
    };

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        id("main-menu").classList.remove("hidden");
        id("login-form").classList.add("hidden");
      })
      .catch(error => {
        console.error("Error:", error);
      });

    id("username").value = "";
    id("password").value = "";
  }

  function handleRegisterLink(event) {
    event.preventDefault();
    id("register").classList.remove("hidden");
    id("login-form").classList.add("hidden");
  }

  function handleBackFromRegister(event) {
    id("login-form").classList.remove("hidden");
    id("register").classList.add("hidden");
  }


  function handleRegistrationForm(event) {
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
        console.error("Error:", error);
      });
      console.log("success")
    id("new-username").value="";
    id("new-password").value="";
    handleBackFromRegister();
  }

  /**
   * Handles the room booking process.
   */
  function bookRoom(event) {
    event.preventDefault();

    let username = id("checkout-username").value;
    let roomtype = document.querySelector("select[name='dropdown']").value;

    let booking = {
      username: username,
      roomtype: roomtype
    };
    console.log(booking);
    fetch('/book-room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Booking failed");
      }
      return response.json(); // parse response as JSON
    })
    .then(data => {
      // save confirmation number to localStorage
      id("confirmation").classList.remove("hidden");
      id("check-out").classList.add("hidden");
    })
    .catch(error => {
      console.error("Error:", error);
    });

    id("checkout-username").value = "";
    id("address").value = "";
    id("email").value = "";
    id("phonenumber").value = "";
  }

  function submitReview(event) {
    event.preventDefault();

    let rating = document.querySelector('input[name="rate"]:checked').value;
    let title = id("reviewer-name").value;
    let comment = id("comment-text").value;
    let username = localStorage.getItem('username');

    let review = {
      username: username,
      rating: rating,
      title: title,
      comment: comment
    };

    fetch('/submit-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Review submission failed");
        }
        return response.json(); // parse response as JSON
      })
      .then(data => {
        // success - refresh reviews
        getAndDisplayReviews();
      })
      .catch(error => {
        console.error("Error:", error);
      });

    id("reviewer-name").value = "";
    id("comment-text").value = "";
    document.querySelector('input[name="rate"]:checked').checked = false;
  }

  function getAndDisplayReviews() {
    fetch('/get-reviews')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to get reviews");
        }
        return response.json(); // parse response as JSON
      })
      .then(data => {
        // success - display reviews
        let reviews = id('reviews');
        reviews.innerHTML = '';

        data.forEach(review => {
          let reviewElement = document.createElement('div');
          reviewElement.classList.add('review');

          let starRating = '';
          for (let i = 0; i < MAX_STARS; i++) {
            if (i < review.rating) {
              starRating += '★';
            } else {
              starRating += '☆';
            }
          }

          reviewElement.innerHTML = `
            <h2>${review.title}</h2>
            <p>${starRating}</p>
            <p>${review.comment}</p>
          `;

          reviews.appendChild(reviewElement);
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

async function getBookingHistory(username) {
  try {
    const response = await fetch(`/booking-history?username=${username}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
}

// This function displays the booking history on the webpage
function displayBookingHistory() {
  let username = localStorage.getItem('username');
  if (!username) {
    // user is not logged in, do not display booking history
    return;
  }
  getBookingHistory(username)
    .then(bookings => {
      let bookingList = id('booking-list');
      bookingList.innerHTML = '';

      bookings.forEach(booking => {
        let listItem = document.createElement('li');
        listItem.textContent = `Room Type: ${booking.roomtype}, Date: ${booking.date}, Confirmation Number: ${booking.confirmation_number}`;
        bookingList.appendChild(listItem);
      });
    });
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
})();
