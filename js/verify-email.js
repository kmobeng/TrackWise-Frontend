const boxes = document.querySelectorAll(".otp-box");
const resend = document.getElementById("resend");

boxes[0].focus();

boxes.forEach((box, index) => {
  box.addEventListener("keydown", (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
    ];
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
  });
});

resend.addEventListener("click", (e) => {
  e.preventDefault();
  let time = 5;
  resend.classList.add("resend-in");
  resend.innerText = `Resend code in ${time}s`;

  const IntervalId = setInterval(() => {
    time--;
    resend.innerText = `Resend code in ${time}s`;
    if (time === 0) {
      clearInterval(IntervalId);
      resend.innerHTML = `<a href="/verify-email.html">Resend code</a>`;
      return;
    }
  }, 1000);
});
