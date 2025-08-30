// /js/blog-extras.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Blog Extras loaded");

  /* ===============================
     1. SCROLL PROGRESS BAR
  =============================== */
  const progressBar = document.createElement("div");
  progressBar.id = "scroll-progress";
  Object.assign(progressBar.style, {
    position: "fixed",
    top: 0,
    left: 0,
    height: "4px",
    background: "var(--color-accent, #00D4FF)",
    width: "0%",
    zIndex: "9999",
    transition: "width 0.15s ease-out"
  });
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });

  /* ===============================
     2. SCROLL TO TOP BUTTON
  =============================== */
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scroll-to-top";
  scrollBtn.innerHTML = "↑";
  Object.assign(scrollBtn.style, {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    padding: "0.8rem 1rem",
    fontSize: "1.4rem",
    background: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    opacity: "0",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    zIndex: "9999"
  });
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.transform = "scale(1)";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.transform = "scale(0.9)";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ===============================
     3. SHARE BUTTONS (if exists)
  =============================== */
  document.querySelectorAll("[data-share]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const url = btn.getAttribute("data-url") || window.location.href;
      const title = btn.getAttribute("data-title") || document.title;

      if (navigator.share) {
        try {
          await navigator.share({ title, url });
          console.log("Shared successfully");
        } catch (err) {
          console.warn("Share cancelled", err);
        }
      } else {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    });
  });
});
