const button = document.querySelector("#header-collapse");
const menu = document.querySelector("header ul");

button.addEventListener("click", function () {
  menu.classList.toggle("hidden");
});