// Polyfill to fix FontFaceObserver timeout issues on web
// This file should be imported early in the app lifecycle

if (typeof window !== 'undefined') {
  // Wait for FontFaceObserver to be loaded, then patch it
  const patchFontFaceObserver = () => {
    try {
      // Try to find FontFaceObserver in the global scope or require it
      let FontFaceObserver;
      
      if (typeof require !== 'undefined') {
        try {
          FontFaceObserver = require('fontfaceobserver');
        } catch (e) {
          // FontFaceObserver might not be loaded yet
        }
      }
      
      // If FontFaceObserver is available, patch the load method
      if (FontFaceObserver && FontFaceObserver.prototype) {
        const originalLoad = FontFaceObserver.prototype.load;
        
        FontFaceObserver.prototype.load = function(text, timeout = 10000) {
          // Increase default timeout to 10 seconds and add error handling
          return originalLoad.call(this, text, timeout).catch((error) => {
            // If timeout occurs, log a warning but don't throw
            if (error.message && error.message.includes('timeout exceeded')) {
              console.warn(`Font "${this.family}" loading timeout - continuing without blocking`);
              // Return resolved promise to prevent app crash
              return Promise.resolve();
            }
            // Re-throw other errors
            throw error;
          });
        };
      }
    } catch (error) {
      console.warn('Could not patch FontFaceObserver:', error);
    }
  };

  // Try to patch immediately
  patchFontFaceObserver();

  // Also try after a short delay in case FontFaceObserver loads later
  setTimeout(patchFontFaceObserver, 100);
  setTimeout(patchFontFaceObserver, 500);
}
