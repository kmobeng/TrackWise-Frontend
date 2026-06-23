import { verifyEmail, requestEmailVerification } from "./api.js";
const boxes = document.querySelectorAll(".otp-box");
const resend = document.getElementById("resend");
const verifyForm = document.getElementById("verify-form");
const verifyBtn = document.getElementById("verify-btn");
const formError = document.getElementById("form-error");

boxes[0].focus();

const checkAuth = async () => {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "/register.html";
    return;
  }
  const parsedUser = JSON.parse(user);

  if (parsedUser.isEmailVerified) {
    window.location.href = "/dashboard.html";
  }
};

checkAuth();

let token = "";
boxes.forEach((box, index) => {
  box.addEventListener("keydown", (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
    ];

    if ((e.ctrlKey || e.metaKey) && e.key === "v") return;

    if (allowedKeys.includes(e.key)) {
      if (e.key === "Backspace" && box.value === "" && index > 0) {
        boxes[index - 1].focus();
      }

      if (e.key === "Delete" && box.value === "" && index < boxes.length - 1) {
        boxes[index + 1].focus();
      }

      if (e.key === "ArrowLeft") {
        if (box.selectionStart === 0 && index > 0) {
          e.preventDefault();
          boxes[index - 1].focus();
        }
      }

      if (e.key === "ArrowRight") {
        if (
          box.selectionStart === box.value.length &&
          index < boxes.length - 1
        ) {
          e.preventDefault();
          boxes[index + 1].focus();
        }
      }

      return;
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });

  box.addEventListener("input", () => {
    box.value = box.value.replace(/\D/g, "");
    if (box.value.length === 1 && index < boxes.length - 1) {
      boxes[index + 1].focus();
    }
    token = Array.from(boxes)
      .map((b) => b.value)
      .join("");
  });

  box.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    const digits = pasteData.replace(/\D/g, "").slice(0, boxes.length);

    digits.split("").forEach((digit, i) => {
      if (boxes[i]) boxes[i].value = digit;
    });
    const nextIndex =
      digits.length < boxes.length ? digits.length : boxes.length - 1;
    boxes[nextIndex].focus();

    token = Array.from(boxes)
      .map((b) => b.value)
      .join("");
  });
});

resend.addEventListener("click", (e) => {
  e.preventDefault();
  let time = 30;
  resend.classList.add("resend-in");
  resend.innerText = `Resend code in ${time}s`;

  const IntervalId = setInterval(() => {
    time--;
    resend.innerText = `Resend code in ${time}s`;
    if (time === 0) {
      clearInterval(IntervalId);
      resend.classList.remove("resend-in");
      resend.innerHTML = `<a href="/verify-email.html">Resend code</a>`;
      return;
    }
  }, 1000);

  requestEmailVerification().catch((error) => {
    formError.textContent =
      error.message || "Something went wrong. Please try again.";
  });
});

verifyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  formError.textContent = "";

  if (token.length < boxes.length) {
    formError.textContent = "Please enter the complete 6-digit code.";
    return;
  }

  try {
    const data = await verifyEmail(token);
    console.log(data);
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.data));
      window.location.href = "/dashboard.html";
    } else if (!data.success) {
      formError.textContent = data.message;
    }
  } catch (error) {
    formError.textContent =
      error.message || "Something went wrong. Please try again.";
  }
});
