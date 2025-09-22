document.addEventListener("DOMContentLoaded", () => {
  const selected = localStorage.getItem("emergency");
  const emergencyEl = document.getElementById("emergency-selected");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  if (!selected) {
    alert("No se ha seleccionado ninguna emergencia.");
    window.location.href = "emergency.html";
    return;
  }

  emergencyEl.textContent = selected;

  confirmBtn.addEventListener("click", () => {
    window.location.href = "chat.html";
  });

  cancelBtn.addEventListener("click", () => {
    localStorage.removeItem("emergency");
    window.location.href = "chat.html";
  });
});
