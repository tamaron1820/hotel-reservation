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
    //let registerlink = document.getElementById("register-link");
    //let loginForm = document.getElementById("login-form");
    //loginForm.addEventListener("submit", login);
    //registerlink.addEventListener("click", handleRegisterLink);
    //let registerForm = document.getElementById("register");
    //registerForm.addEventListener("submit", handleRegistrationForm);
    let bookBtn = document.getElementById("book-btn");
    bookBtn.addEventListener("click", bookRoom);
    //let username = getUsername();
    //displayBookingHistory(username);
  }


  function login(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

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
        localStorage.setItem('username', data.username);
        window.location.href = "bookinghistory.html";
      })
      .catch(error => {
        console.error("Error:", error);
      });

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
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
    let username = document.getElementById("new-username").value;
    let password = document.getElementById("new-password").value;

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
    document.getElementById("new-username").value="";
    document.getElementById("new-password").value="";
    handleBackFromRegister();
  }

  /**
   * Handles the room booking process.
   */
  function bookRoom(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let roomtype = document.querySelector("select[name='dropdown']").value;

    let booking = {
      username: username,
      roomtype: roomtype
    };

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
      localStorage.setItem('confirmationNumber', data.confirmationNumber);
      window.location.href = "confirmation.html";
    })
    .catch(error => {
      console.error("Error:", error);
    });

    document.getElementById("username").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phonenumber").value = "";
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
      let bookingList = document.getElementById('booking-list');
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
