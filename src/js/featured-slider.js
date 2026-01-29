(() => {
  const root = document.querySelector("[data-featured-slider]");
  if (!root) return;

  const slides = Array.from(root.querySelectorAll("[data-slide]"));
  const dots = Array.from(root.querySelectorAll("[data-dot]"));

  if (slides.length <= 1) return;

  let i = 0;
  const intervalMs = Number(root.getAttribute("data-interval")) || 5000;
  let timer = null;

  const show = (idx) => {
    i = (idx + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
    dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
  };

  const next = () => show(i + 1);

  const start = () => {
    stop();
    timer = setInterval(next, intervalMs);
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  dots.forEach((d, k) => d.addEventListener("click", () => { show(k); start(); }));

  // Pausa cuando pasas el mouse
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);

  show(0);
  start();
})();
