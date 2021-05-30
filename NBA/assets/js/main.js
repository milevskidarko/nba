let loginForm = document.getElementById("login-form");
let loginButton = document.getElementById("login-form-submit");
let loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  let username = loginForm.username.value;

  if (username) {
    alert("You have successfully logged in.");
    window.location.href = "players.html";
  } else {
    loginErrorMsg.style.opacity = 1;
  }

  localStorage.setItem("username", username);
});
