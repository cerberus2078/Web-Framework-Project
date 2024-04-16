// Get the toggle button
var toggleButton = document.getElementById("toggle-high-contrast");

// Add a click event listener to the toggle button
toggleButton.addEventListener("click", function() {
    // Get the body element
    var body = document.getElementsByTagName("body")[0];
    // Toggle the "high-contrast" class on the body element
    body.classList.toggle("high-contrast");
});