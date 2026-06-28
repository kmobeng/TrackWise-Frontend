import { registerUser } from "./api.js";

const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const formError = document.getElementById("form-error");

const checkAuth = async () => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    if (!parsedUser.isEmailVerified) {
      window.location.href = "/verify-email.html";
      return;
    }
    window.location.href = "/dashboard.html";
  }
};

checkAuth()

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  formError.textContent = "";

  let hasError = false;

  if (!nameInput.value.trim()) {
    nameError.textContent = "Name is required";
    hasError = true;
  }

  if (!emailInput.value.trim()) {
    emailError.textContent = "Email is required";
    hasError = true;
  }

  if (!passwordInput.value) {
    passwordError.textContent = "Password is required";
    hasError = true;
  }

  if (hasError) return;

  try {
    const data = await registerUser(
      nameInput.value.trim(),
      emailInput.value.trim(),
      passwordInput.value.trim(),
    );

    if (data.success) {
      localStorage.setItem(
        "user",
        JSON.stringify(data.data),
      );
      window.location.href = "/verify-email.html";
    } else if (!data.success) {
      formError.textContent = data.message;
    }
  } catch (error) {
    formError.textContent =
      error.message || "Something went wrong. Please try again.";
  }
});
