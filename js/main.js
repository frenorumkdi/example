// Lightning effect controller
(function() {
  const lightningBolt = document.getElementById('lightning-bolt');
  const flashOverlay = document.getElementById('flash-overlay');
  
  // Function to trigger lightning strike
  function triggerLightning() {
    // Flash effect on background
    flashOverlay.style.opacity = '0.7';
    lightningBolt.style.opacity = '1';
    
    // Fade out after a short duration
    setTimeout(() => {
      flashOverlay.style.opacity = '0';
      lightningBolt.style.opacity = '0';
    }, 100);
    
    // Second flash for double strike effect
    setTimeout(() => {
      flashOverlay.style.opacity = '0.5';
      lightningBolt.style.opacity = '0.8';
      
      setTimeout(() => {
        flashOverlay.style.opacity = '0';
        lightningBolt.style.opacity = '0';
      }, 80);
    }, 150);
  }
  
  // Random lightning scheduler
  function scheduleRandomLightning() {
    // Random delay between 3-8 seconds
    const delay = Math.random() * 5000 + 3000;
    
    setTimeout(() => {
      triggerLightning();
      scheduleRandomLightning();
    }, delay);
  }
  
  // Start lightning on load
  scheduleRandomLightning();
})();