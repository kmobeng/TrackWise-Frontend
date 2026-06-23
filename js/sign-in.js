import { signIn } from "./api.js";

const signInForm = document.getElementById("sign-in-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const formError = document.getElementById("form-error");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  emailError.textContent = "";
  passwordError.textContent = "";
  formError.textContent = "";

  let hasError = false;

  if (!emailInput.value) {
    emailError.textContent = "Email is required";
    hasError = true;
  }

  if (!passwordInput.value) {
    passwordError.textContent = "Password is required";
    hasError = true;
  }

  if (hasError) return;

  try {
    const data = await signIn(
      emailInput.value.trim(),
      passwordInput.value.trim(),
    );
    if (data.success) {
        localStorage.setItem("user", JSON.stringify({id:data.id, email: data.email, name: data.name}));

        window.location.href = "/dashboard.html";
    } else if (!data.success) {
      formError.textContent = data.message;
    }
  } catch (error) {
    formError.textContent = error.message || "Something went wrong. Please try again.";
  }
});
