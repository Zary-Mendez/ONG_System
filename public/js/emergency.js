document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#emergency-options button");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const emergency = btn.dataset.emergency;
      localStorage.setItem("emergency", emergency);
      window.location.href = "emergency.html";
      window.location.href = "confirmar.html";
    });
  });
  window.location.href = "confirm.html";
});
