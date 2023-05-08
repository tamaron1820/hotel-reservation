/*
 * Name: Tastuhiko Araki, Luna Osaki
 * Date: 05.05.2023
 * Section: CSE 154 AA, AF
 *
 * This is the JS file to implement the UI for hotel reservation page
 * This program control review page of the reservation service
 */
"use strict";

(function () {
  window.addEventListener("load", init);

  /**
   * Initializes the application by adding a 'submit' event listener to the review form.
   */
  function init() {
    let review = id("reviewForm");
    review.addEventListener("submit", submitForm);
  }

  /**
   * Submits the review form, preventing the page from refreshing and adding
   * a new review to the page.
   *
   * @param {Event} event - The submit event.
   */
  function submitForm(event) {
    event.preventDefault(); // prevent page refresh
    let rating = document.querySelector('input[name="rate"]:checked').value;
    let title = id("reviewerName").value;
    let comment = id("reviewText").value;
    let reviewContainer = id("reviews");
    let newReview = document.createElement("article");
    newReview.classList.add("review", "submit-all-form");
    newReview.innerHTML = `<h2 class="title-form">${title ? title : "Please enter a title"}</h2>
                        <p class="rate-form-static">${generateStars(rating)}</p>
                        <p class="comment-form">${comment}</p>`;
    reviewContainer.appendChild(newReview);

    // Clear form inputs
    id("reviewerName").value = "";
    id("reviewText").value = "";
    document.querySelector('input[name="rate"]:checked').checked = false;
  }

  /**
   * Generates a string of stars based on the rating value.
   *
   * @param {number} rating - The rating value.
   * @returns {string} A string of stars representing the rating value.
   */
  function generateStars(rating) {
    let stars = "";
    for (let i = 5; i > 0; i--) {
      if (i <= rating) {
        stars += "<span class=\"selected\">★</span>";
      } else {
        stars += "<span></span>";
      }
    }
    return stars;
  }

  // Event listener for star rating
  let starRadios = document.querySelectorAll('input[name="rate"]');
  starRadios.forEach(radio => {
    radio.addEventListener("click", updateStars);
  });

  /**
   * Updates the star rating based on the selected value.
   *
   * @param {Event} event - The click event.
   */
  function updateStars(event) {
    let rating = event.target.value;
    let starLabels = document.querySelectorAll('.rate-form label');
    for (let i = starLabels.length - 1; i >= 0; i--) {
      let starValue = starLabels[i].getAttribute('for').replace('star', '');
      if (starValue <= rating) {
        starLabels[i].classList.add('selected');
      } else {
        starLabels[i].classList.remove('selected');
      }
    }
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
