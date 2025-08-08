# Breadcrumb Component

## Overview
Reusable JavaScript component for AIceberg Mind s## Debug
Component includes automatic logging:
- 🍞 Breadcrumb component loading
- 📱 Follow Us component loading
- 📍 Current path detected  
- 🏠 Page type (index/subpage)
- 📂 Base path generated
- ✅ Insertion status

## Implemented pagesrumb navigation.
**Automatically handles redirects between index and subpages.**

## Files
- `js/components/breadcrumb-component.js` - Main component
- `js/minimal-breadcrumb-clean.js` - Navigation logic
- `js/components/follow-us-sticky.js` - "FOLLOW US" sticky component

## Smart Features

### 🎯 **Auto-Detection**
- **Index page**: Breadcrumb with local navigation (internal scroll)
- **Subpages**: Breadcrumb with direct links to index (#section)

### 🔄 **Path Management**
- Automatically detects if you're on a subpage
- Generates correct paths (`../` for subpages, `/` for index)
- Handles active section highlighting

### 📱 **Follow Us Sticky**
- **Desktop**: Sticky button top-right with text "FOLLOW US 📱"
- **Mobile**: Floating Action Button (FAB) bottom-right, icon only
- **Functionality**: Direct link to #channels section (as before)

## Usage

### Method 1: Automatic (Recommended)
Component auto-installs when page loads. No action required.

### Method 2: With Placeholder
Add this HTML where you want the breadcrumb:
```html
<div id="breadcrumb-placeholder"></div>
```

### Method 3: Manual
```javascript
// Insert breadcrumb in specific element
BreadcrumbComponent.insert('#my-container');

// Get breadcrumb HTML only
const html = BreadcrumbComponent.createHTML();
```

## Setup for new pages

1. **Include scripts:**
```html
<script src="../js/minimal-breadcrumb-clean.js" defer></script> <!-- Breadcrumb Logic -->
<script src="../js/components/breadcrumb-component.js" defer></script> <!-- Breadcrumb HTML -->
<script src="../js/components/follow-us-sticky.js" defer></script> <!-- Follow Us Sticky -->
```

2. **Add placeholder (optional):**
```html
<div id="breadcrumb-placeholder"></div>
```

3. **Component loads automatically!**

## Breadcrumb modifications

To modify breadcrumb on all pages, edit only:
`js/components/breadcrumb-component.js`

All pages using the component will update automatically.

## Smart Behavior

### On Index (/)
```html
<!-- Local navigation with scroll -->
<div class="breadcrumb-item" data-section="about">ABOUT</div>
```

### On Subpages (/pages/*)
```html
<!-- Direct link to index -->
<a href="../index.html#about" class="breadcrumb-item">ABOUT</a>
```

### Follow Us Button
**Desktop**: Always visible top-right
**Mobile**: FAB bottom-right

## Debug
Il componente include logging automatico:
- 🍞 Caricamento componente breadcrumb
- � Caricamento componente Follow Us
- �📍 Path corrente rilevato  
- 🏠 Tipo pagina (index/subpage)
- 📂 Base path generato
- ✅ Stato inserimento

## Pagine implementate
- ✅ index.html
- ✅ pages/blog.html
- ✅ pages/contact.html  
- ✅ pages/credits.html
- ✅ pages/legal-notices.html
- ✅ pages/blog-article.html
- ✅ pages/blog-article-prompts.html

## Technical notes
- Compatible with all modern browsers
- No external dependencies required
- Asynchronous loading with `defer`
- Automatically checks if breadcrumb already exists
- **Automatic relative path handling**
- **JavaScript click error prevention**
- **Follow Us sticky responsive with mobile FAB**
- **CSS in sticky-elements.css for consistent styling**
