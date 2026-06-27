import { forgotPassword } from "./api.js";

const formError = document.getElementById("form-error");
const forgotPasswordForm = document.getElementById("forgot-password-form");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const rightContent = document.querySelector(".right-content");

forgotPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  formError.textContent = "";
  emailError.textContent = "";

  if (!emailInput.value.trim()) {
    emailError.textContent = "Email is required";
    return;
  }

  try {
    const result = await forgotPassword(emailInput.value.trim());
    showSuccessMessage();
  } catch (error) {
    if(error.status === 500) {
        formError.textContent = error.message || "Something went wrong. Please try again later.";
        return;
    }

    showSuccessMessage();
  }
});

const showSuccessMessage = () => {
  rightContent.innerHTML = `
        <a href="/index.html" class="right-logo">TrackWise</a>
          <h2 class="right-title">Check your inbox</h2>
          <p class="right-description">
            <span class="right-description-subtext1"
              >If an account exists for
              <span class="email-display">${emailInput.value.trim()}</span>, a reset
              link is on its way.
            </span>
            <span class="right-description-subtext2"
              >The link expires in 30 minutes. Check your spam folder if you
              don't see it.
            </span>
          </p>
          <button class="google-btn">Try a different email</button>
          <p class="back">
            <i class="fa-solid fa-arrow-left"></i
            ><a href="/sign-in.html">Back to sign in</a>
          </p>`;

  document.querySelector(".google-btn").addEventListener("click", () => {
    window.location.href = "/forgot-password.html";
  });

  rightContent.classList.add("width");
};
