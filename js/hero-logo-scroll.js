// Logo shrink on scroll for hero only
document.addEventListener('DOMContentLoaded', function() {
  var logo = document.querySelector('.hero-logo-scroll');
  if (!logo) return;
  var shrinkPoint = 60;
  // Shrink effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > shrinkPoint) {
      logo.classList.add('shrink');
    } else {
      logo.classList.remove('shrink');
    }
  });
});
