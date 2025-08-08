// BREADCRUMB + MOBILE MENU HYBRID GENERATOR
// Genera sia il breadcrumb desktop che il menu mobile hamburger
// Non modifica la logica di minimal-breadcrumb-clean.js

const NAV_ITEMS = [
  { label: 'HOME', href: 'index.html#hero', section: 'hero' },
  { label: 'ABOUT', href: 'index.html#about', section: 'about' },
  { label: 'PROJECTS', href: 'index.html#projects', section: 'projects', subs: [
    { label: 'Audio Rituals', href: 'index.html#projects', subsection: 'audio-rituals' },
    { label: 'Nursery Rhymes', href: 'index.html#projects', subsection: 'nursery-rhymes' },
    { label: 'Specialized Channels', href: 'index.html#projects', subsection: 'specialized-channels' },
    { label: 'Birth Prep', href: 'index.html#projects', subsection: 'birth-prep' },
    { label: 'Family Finance', href: 'index.html#projects', subsection: 'family-finance' },
    { label: 'Parent 360', href: 'index.html#projects', subsection: 'parent-360' }
  ] },
  { label: 'TEAM', href: 'index.html#team', section: 'team' },
  { label: 'ETHICS', href: 'index.html#ethics', section: 'ethics' },
  { label: 'BLOG', href: 'pages/blog.html', section: 'blog' }
];

function generateMobileMenuHTML() {
  return `
    <button class="hamburger-menu-btn" aria-label="Apri menu di navigazione" tabindex="0" id="openHamburgerMenuHybrid">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
    <nav class="hamburger-slider-menu" aria-label="Menu mobile" id="hamburgerSliderMenuHybrid">
      <div class="hamburger-logo-container">
        <img src="images/logo/logo-01.svg" alt="AIceberg Mind Logo" class="hamburger-logo" />
      </div>
      <button class="hamburger-menu-close" aria-label="Chiudi menu" id="closeHamburgerMenuHybrid">&#10005;</button>
      <ul class="hamburger-menu-list">
        ${NAV_ITEMS.map(item => {
          if (item.label === 'PROJECTS') {
            return `
              <li class="has-accordion" id="projects-accordion-item">
                <a href="${item.href}" class="hamburger-menu-link projects-link" id="projectsAccordionBtn">
                  ${item.label}
                  <span class="accordion-arrow" id="projectsAccordionArrow">
                    <svg class="arrow-svg minimal-arrow" width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                      <polyline points="14,4 18,8 14,12" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                </a>
                <ul class="hamburger-submenu" id="projectsAccordionSubmenu" style="display: none;">
                  ${item.subs.map(sub => `<li><a href="${sub.href}" data-subsection="${sub.subsection}" class="hamburger-submenu-link">${sub.label}</a></li>`).join('')}
                </ul>
              </li>
            `;
          } else {
            return `
              <li>
                <a href="${item.href}" class="hamburger-menu-link">${item.label}</a>
                ${item.subs ? `<ul class="hamburger-submenu">
                  ${item.subs.map(sub => `<li><a href="${sub.href}" data-subsection="${sub.subsection}" class="hamburger-submenu-link">${sub.label}</a></li>`).join('')}
                </ul>` : ''}
              </li>
            `;
          }
        }).join('')}
      </ul>
      <div class="hamburger-follow-us-container">
        <button class="hamburger-follow-us-btn" id="hamburgerFollowUsBtn">
          FOLLOW US <span class="accordion-arrow follow-arrow">
            <svg class="arrow-svg minimal-arrow" width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
              <polyline points="14,4 18,8 14,12" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
        <div class="hamburger-social-icons" id="hamburgerSocialIcons" style="display: none;">
          <a href="https://youtube.com/@aicebergmind" class="social-icon" target="_blank" rel="noopener" title="YouTube">
            <svg class="social-icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </a>
          <a href="https://instagram.com/aicebergmind" class="social-icon" target="_blank" rel="noopener" title="Instagram">
            <svg class="social-icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://x.com/aicebergmind" class="social-icon" target="_blank" rel="noopener" title="X">
            <svg class="social-icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
          <a href="https://linkedin.com/company/aicebergmind" class="social-icon" target="_blank" rel="noopener" title="LinkedIn">
            <svg class="social-icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://facebook.com/aicebergmind" class="social-icon" target="_blank" rel="noopener" title="Facebook">
            <svg class="social-icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>
      </div>
    </nav>
  `;
}



function renderHybridMobileMenu() {
    // FOLLOW US button logic
    setTimeout(() => {
      const followBtn = document.getElementById('hamburgerFollowUsBtn');
      const socialIcons = document.getElementById('hamburgerSocialIcons');
      const arrow = followBtn ? followBtn.querySelector('.follow-arrow .arrow-svg') : null;
      let open = false;
      if (followBtn && socialIcons && arrow) {
        followBtn.addEventListener('click', function(e) {
          e.preventDefault();
          open = !open;
          socialIcons.style.display = open ? 'flex' : 'none';
          arrow.style.transform = open ? 'rotate(90deg)' : 'rotate(0deg)';
        });
        // Ensure initial state
        arrow.style.transform = 'rotate(0deg)';
      }
    }, 0);
    // Close menu and navigate on link click
    function closeMenuAndNavigate(e) {
      const sliderMenu = document.getElementById('hamburgerSliderMenuHybrid');
      const href = this.getAttribute('href');
      e.preventDefault();
      if (sliderMenu) sliderMenu.classList.remove('open');
      setTimeout(() => {
        if (href.startsWith('#')) {
          window.location.hash = href;
        } else if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          window.location.href = href;
        } else {
          window.location.assign(href);
        }
      }, 220);
    }

    // Dopo aver generato il menu, collega i listener ai link
    setTimeout(() => {
      const allLinks = document.querySelectorAll('.hamburger-menu-link, .hamburger-submenu-link');
      allLinks.forEach(link => {
        if (link.id !== 'projectsAccordionBtn') {
          link.removeEventListener('click', closeMenuAndNavigate);
          link.addEventListener('click', closeMenuAndNavigate);
        }
      });
    }, 0);
  const placeholder = document.getElementById('hamburger-menu-placeholder');
  if (!placeholder) {
    console.log('[HybridMenu] Placeholder non trovato');
    return;
  }
  if (window.innerWidth <= 768) {
    placeholder.innerHTML = generateMobileMenuHTML();
    console.log('[HybridMenu] Menu mobile generato');
    // Logica apertura/chiusura
    const openBtn = document.getElementById('openHamburgerMenuHybrid');
    const closeBtn = document.getElementById('closeHamburgerMenuHybrid');
    const sliderMenu = document.getElementById('hamburgerSliderMenuHybrid');
    if (sliderMenu) sliderMenu.classList.remove('open'); // Assicura che sia chiuso al load
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

    // Accordion logic for PROJECTS
    const projectsAccordionBtn = document.getElementById('projectsAccordionBtn');
    const projectsAccordionSubmenu = document.getElementById('projectsAccordionSubmenu');
    const projectsAccordionArrow = document.getElementById('projectsAccordionArrow');
    let projectsAccordionOpen = false;
    if (projectsAccordionBtn && projectsAccordionSubmenu && projectsAccordionArrow) {
      projectsAccordionBtn.addEventListener('click', function(e) {
        e.preventDefault();
        projectsAccordionOpen = !projectsAccordionOpen;
        if (projectsAccordionOpen) {
          projectsAccordionSubmenu.style.display = 'block';
          projectsAccordionArrow.querySelector('svg').style.transform = 'rotate(90deg)';
        } else {
          projectsAccordionSubmenu.style.display = 'none';
          projectsAccordionArrow.querySelector('svg').style.transform = 'rotate(0deg)';
        }
      });
    }
    // FOLLOW US button logic (SVG arrow rotation)
    setTimeout(() => {
      const followBtn = document.getElementById('hamburgerFollowUsBtn');
      const socialIcons = document.getElementById('hamburgerSocialIcons');
      const arrow = followBtn ? followBtn.querySelector('.follow-arrow svg') : null;
      let open = false;
      if (arrow) {
        arrow.style.transition = 'transform 0.2s';
        arrow.style.stroke = '#fff';
      }
      if (followBtn && socialIcons) {
        followBtn.addEventListener('click', function(e) {
          e.preventDefault();
          open = !open;
          if (open) {
            socialIcons.style.display = 'flex';
            if (arrow) arrow.style.transform = 'rotate(90deg)';
          } else {
            socialIcons.style.display = 'none';
            if (arrow) arrow.style.transform = 'rotate(0deg)';
          }
        });
      }
    }, 0);
  } else {
    placeholder.innerHTML = '';
    console.log('[HybridMenu] Menu mobile rimosso (desktop)');
  }
}

document.addEventListener('DOMContentLoaded', renderHybridMobileMenu);
window.addEventListener('resize', renderHybridMobileMenu);
