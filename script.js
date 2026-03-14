// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {

  // Elements
  const envelope = document.querySelector(".envelope");
  const letterOverlay = document.querySelector(".letter-overlay");
  const closeLetter = document.querySelector(".close-letter");

  const gift = document.querySelector(".gift-box");
  const teddy = document.querySelector(".teddy");

  const hugButton = document.getElementById("hugButton");
  const comfortButton = document.getElementById("comfortButton");
  const constellationBtn = document.getElementById("constellationButton");
  const constellationLayer = document.querySelector(".constellation-layer");

  const polaroids = document.querySelectorAll(".polaroid");

  /* ---------------- LETTER ---------------- */
  envelope?.addEventListener("click", () => {
    letterOverlay.style.display = "flex";
  });

  closeLetter?.addEventListener("click", () => {
    letterOverlay.style.display = "none";
  });

  /* ---------------- BUTTONS ---------------- */
  hugButton?.addEventListener("click", () => {
    showOverlayMessage("🤗 Sending you the warmest hug!");
  });

  comfortButton?.addEventListener("click", () => {
    showOverlayMessage("💌 You are loved, cared for, and never alone.");
  });

  /* ---------------- TEDDY ---------------- */
  teddy?.addEventListener("click", () => {
    showOverlayMessage("🧸 Teddy hug just for you!");
  });

  /* ---------------- GIFT ---------------- */
  gift?.addEventListener("click", () => {
    showOverlayMessage("🎁 Surprise! You are truly special 💖");
  });

  /* ---------------- HEART EXPLOSION ---------------- */
  document.addEventListener("click", (e) => {
    const heart = document.createElement("div");
    heart.innerText = "💖";
    Object.assign(heart.style, {
      position: "fixed",
      left: e.clientX + "px",
      top: e.clientY + "px",
      fontSize: "20px",
      pointerEvents: "none",
      transition: "1s"
    });
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = "translateY(-80px)";
      heart.style.opacity = "0";
    }, 10);

    setTimeout(() => heart.remove(), 1000);
  });

  /* ---------------- CONSTELLATION ---------------- */
  constellationBtn?.addEventListener("click", () => {
    constellationLayer.innerHTML = "";

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 3;

    const stars = [
      // R
      [-150, -40], [-150, 0], [-150, 40],
      [-130, -40], [-110, -40],
      [-110, -10],
      [-130, 0], [-110, 0],
      [-110, 40],
      // I
      [-60, -40], [-60, 0], [-60, 40],
      // Y
      [-20, -40], [0, -10], [20, -40],
      [0, 20], [0, 50],
      // A
      [60, 40], [80, -40], [100, 40],
      [70, 0], [90, 0]
    ];

    const starElements = [];

    stars.forEach((pos, i) => {
      const star = document.createElement("div");
      Object.assign(star.style, {
        position: "absolute",
        left: centerX + pos[0] + "px",
        top: centerY + pos[1] + "px",
        width: "7px",
        height: "7px",
        background: "white",
        borderRadius: "50%",
        boxShadow: "0 0 12px white",
        opacity: "0",
        transition: "opacity 0.4s"
      });
      constellationLayer.appendChild(star);
      starElements.push(star);

      setTimeout(() => { star.style.opacity = "1"; }, i * 120);
    });

    // Connect stars with faint glowing lines
    setTimeout(() => {
      for (let i = 0; i < starElements.length - 1; i++) {
        const line = document.createElement("div");
        const x1 = parseInt(starElements[i].style.left);
        const y1 = parseInt(starElements[i].style.top);
        const x2 = parseInt(starElements[i+1].style.left);
        const y2 = parseInt(starElements[i+1].style.top);

        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        Object.assign(line.style, {
          position: "absolute",
          left: x1 + "px",
          top: y1 + "px",
          width: length + "px",
          height: "2px",
          background: "rgba(255,255,255,0.4)",
          transformOrigin: "0 0",
          transform: `rotate(${angle}deg)`,
          boxShadow: "0 0 6px white"
        });

        constellationLayer.appendChild(line);
      }
    }, stars.length * 120);
  });

  /* ---------------- DRAG POLAROIDS ---------------- */
  polaroids.forEach(card => {
    let dragging = false, offsetX = 0, offsetY = 0;

    card.addEventListener("mousedown", (e) => {
      dragging = true;
      offsetX = e.clientX - card.offsetLeft;
      offsetY = e.clientY - card.offsetTop;
      card.style.zIndex = "100"; // bring to front
    });

    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      card.style.left = (e.clientX - offsetX) + "px";
      card.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
      dragging = false;
      card.style.zIndex = "10";
    });
  });

  /* ---------------- HELPER: Overlay Message ---------------- */
  function showOverlayMessage(text) {
    const overlay = document.createElement("div");
    overlay.innerText = text;
    Object.assign(overlay.style, {
      position: "fixed",
      top: "50%", left: "50%",
      transform: "translate(-50%,-50%)",
      background: "rgba(255,255,255,0.9)",
      color: "#333",
      padding: "20px 30px",
      borderRadius: "12px",
      boxShadow: "0 0 20px rgba(255,255,255,0.8)",
      fontSize: "18px",
      zIndex: "200",
      textAlign: "center",
      animation: "fadeInOut 3s ease forwards"
    });
    document.body.appendChild(overlay);

    setTimeout(() => overlay.remove(), 3000);
  }

});

