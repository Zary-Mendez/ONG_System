document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#emergency-options button");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const emergency = btn.dataset.emergency;
      console.log("Emergencia seleccionada:", emergency);
      localStorage.setItem("emergency", emergency);
      window.location.href = "confirm.html";
    });
  });
  
});