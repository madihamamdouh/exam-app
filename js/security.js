// const email = document.forms["regForm"]["mail"];
// const username = document.forms["regForm"]["username"];
// const password = document.forms["regForm"]["password"];
// const password_confirm = document.forms["regForm"]["reset-password"];

//reset password confirmation//
// var name_error = document.getElementById("name_error");
// var email_error = document.getElementById("email_error");
// var password_error = document.getElementById("password_error");

const password_confirm = document.getElementById("reset-password");
const password = document.getElementById("regpass");
password_confirm.addEventListener("input", function (event) {
  if (password_confirm.value !== password.value) {
    password_confirm.setCustomValidity("password is not match!");
    password_confirm.reportValidity();
  } else {
    password_confirm.setCustomValidity("");
  }
});
const signUp = () => {
  let formData = {
    regemail: document.getElementById("regemail").value,
    regpassword: document.getElementById("regpassword").value,
  };
  localStorage.setItem("formData", JSON.stringify(formData));
  console.log(localStorage.getItem("formData"));
};
