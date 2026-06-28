import { resetPassword } from "./api.js";

const resetPasswordForm = document.getElementById("reset-password-form");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const formError = document.getElementById("form-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

if (!token) {
  window.location.href = "/forgot-password.html";
}

resetPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  formError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  let hasError = false;

  if (!passwordInput.value) {
    passwordError.textContent = "Password is required";
    hasError = true;
  }

  if (!confirmPasswordInput.value) {
    confirmPasswordError.textContent = "Confirm password is required";
    hasError = true;
  }

  if (
    passwordInput.value &&
    confirmPasswordInput.value &&
    passwordInput.value !== confirmPasswordInput.value
  ) {
    confirmPasswordError.textContent = "Passwords do not match";
    hasError = true;
  }

  if (hasError) return;

  try {
    const data = await resetPassword(token, passwordInput.value);

    if (data.success) {
      window.location.href = "/sign-in.html";
    } else {
      formError.textContent = data.message;
    }
  } catch (error) {
    formError.textContent =
      error.message || "An error occurred. Please try again.";
  }
});
