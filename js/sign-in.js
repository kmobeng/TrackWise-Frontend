import { signIn } from "./api.js";

const signInForm = document.getElementById("sign-in-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const formError = document.getElementById("form-error");

const checkAuth = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("switch") === "true") return;

  const user = localStorage.getItem("user");
  if (!user) return;

  const parsedUser = JSON.parse(user);
  if (!parsedUser.isEmailVerified) {
    window.location.href = "/verify-email.html";
    return;
  }
  window.location.href = "/dashboard.html";
};

checkAuth();

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  emailError.textContent = "";
  passwordError.textContent = "";
  formError.textContent = "";

  let hasError = false;

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
    const data = await signIn(
      emailInput.value.trim(),
      passwordInput.value,
    );

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("accessToken", data.data.accessToken);

      if (!data.data.isEmailVerified) {
        window.location.href = "/verify-email.html";
      } else {
        window.location.href = "/dashboard.html";
      }
    } else {
      formError.textContent = data.message;
    }
  } catch (error) {
    formError.textContent =
      error.message || "Something went wrong. Please try again.";
  }
});