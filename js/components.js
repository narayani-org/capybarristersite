// Function to load HTML components
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
    return false;
  }
}

// Load components when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load components in sequence
    const navbarLoaded = await loadComponent('navbar-container', 'components/navbar.html');
    const menuLoaded = await loadComponent('slide-menu-container', 'components/slidemenu.html');
    await loadComponent('footer-container', 'components/footer.html');

    // Dispatch custom event when both navbar and slide menu are loaded
    if (navbarLoaded && menuLoaded) {
      // Small delay to ensure DOM is fully updated
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('navAndMenuLoaded'));
      }, 100);
    } else {
      console.error('Failed to load required components:', {
        navbar: navbarLoaded,
        menu: menuLoaded
      });
    }
  } catch (error) {
    console.error('Error loading components:', error);
  }
}); 