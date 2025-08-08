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

  // Hover effect: swap src between gray and color
  var graySrc = 'images/logo/AIceberg_mind_logo_gray.svg';
  var colorSrc = 'images/logo/AIceberg_mind_logo_color.svg';
  logo.addEventListener('mouseenter', function() {
    logo.src = colorSrc;
  });
  logo.addEventListener('mouseleave', function() {
    logo.src = graySrc;
  });
});
