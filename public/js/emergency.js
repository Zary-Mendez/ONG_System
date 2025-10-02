document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#emergency-options button");
  const homeBtn = document.getElementById("homeBtn");

  // Eventos para las emergencias
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const emergency = btn.dataset.emergency;
      console.log("Emergencia seleccionada:", emergency);
      localStorage.setItem("emergency", emergency);
      window.location.href = "confirm.html";
    });
  });

  // Evento para la casita -> lleva al login
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});
