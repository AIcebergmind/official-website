/**
 * BREADCRUMB SCHEMA MARKUP - SEO Enhancement
 * Aggiunge structured data per Google Rich Snippets
 */

function createBreadcrumbSchema() {
  const basePath = getBasePath();
  const baseUrl = window.location.origin;
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}${basePath}index.html`
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "About",
        "item": `${baseUrl}${basePath}index.html#about`
      },
      {
        "@type": "ListItem",
        "position": 3, 
        "name": "Projects",
        "item": `${baseUrl}${basePath}index.html#projects`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Team", 
        "item": `${baseUrl}${basePath}index.html#team`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Blog",
        "item": `${baseUrl}${basePath}pages/blog.html`
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Ethics",
        "item": `${baseUrl}${basePath}index.html#ethics`
      }
    ]
  };
}

function injectBreadcrumbSchema() {
  // Remove existing schema if present
  const existingSchema = document.querySelector('script[type="application/ld+json"][data-breadcrumb]');
  if (existingSchema) {
    existingSchema.remove();
  }
  
  // Create new schema
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-breadcrumb', 'true');
  script.textContent = JSON.stringify(createBreadcrumbSchema());
  
  document.head.appendChild(script);
  console.log('🔍 Breadcrumb Schema Markup injected for SEO');
}

// Auto-inject schema when breadcrumb loads
document.addEventListener('DOMContentLoaded', function() {
  // Wait for breadcrumb component to load
  setTimeout(injectBreadcrumbSchema, 100);
});
