// Hamburger menu open/close logic

document.addEventListener('DOMContentLoaded', function() {
  const openBtn = document.getElementById('openHamburgerMenu');
  const closeBtn = document.getElementById('closeHamburgerMenu');
  const sliderMenu = document.getElementById('hamburgerSliderMenu');

  if (openBtn && sliderMenu) {
    openBtn.addEventListener('click', function() {
      sliderMenu.classList.add('open');
    });
  }
  if (closeBtn && sliderMenu) {
    closeBtn.addEventListener('click', function() {
      sliderMenu.classList.remove('open');
    });
  }
});
