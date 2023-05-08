"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    let review = id("reviewForm");
    review.addEventListener("submit", submitForm);
  }

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
   * Return the element with specified ID attribute
   * @param {string} id - element ID
   * @returns {HTMLElement} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }
})();
