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
    let registerlink = document.getElementById("register-link");
    let loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", login);
    registerlink.addEventListener("click", handleRegisterLink);
    let registerForm = document.getElementById("register");
    registerForm.addEventListener("submit", handleRegistrationForm);
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
        window.location.href = "filter.html";
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
   * Returns the element with the specified ID attribute.
   *
   * @param {string} id - The ID attribute.
   * @returns {HTMLElement} The DOM object associated with the ID attribute.
   */
  function id(id) {
    return document.getElementById(id);
  }
})();
