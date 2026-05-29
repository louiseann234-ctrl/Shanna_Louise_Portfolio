/* ==========================================================================
   SHANNA PORTFOLIO - CORE INTERACTION ACTIONS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // ----------------------------------------------------------------------
    // 1. DYNAMIC NAVIGATION BAR SCROLL EFFECTS
    // ----------------------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            navbar.style.background = 'rgba(247, 249, 246, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(247, 249, 246, 0.8)';
        }
    });

    // ----------------------------------------------------------------------
    // 2. PROJECT PHOTO OVERLAY LIGHTBOX MODAL
    // ----------------------------------------------------------------------
    const overlay = document.getElementById("photo-overlay");
    const overlayImg = document.getElementById("overlay-img");
    const closeBtn = document.querySelector(".overlay-close");
    const projectCards = document.querySelectorAll(".card");

    // Check if overlay components exist on the current page before running logic
    if (overlay && overlayImg && projectCards.length > 0) {
        
        projectCards.forEach(card => {
            const cardImg = card.querySelector(".card-img");
            
            if (cardImg) {
                // Update mouse cursor to indicate the container can be expanded
                cardImg.style.cursor = "zoom-in";

                cardImg.addEventListener("click", () => {
                    // Pull the modern background-image property path safely from the CSS styles
                    const computedStyle = window.getComputedStyle(cardImg);
                    const bgImage = computedStyle.backgroundImage;
                    
                    // Format and extract the clean URL file path string
                    const imageUrl = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                    
                    // Activate overlay modal view seamlessly
                    overlayImg.src = imageUrl;
                    overlay.classList.add("active");
                    document.body.style.overflow = "hidden"; // Blocks main background window scrolling
                });
            }
        });

        // Click handler to exit the preview via the 'X' button close trigger
        if (closeBtn) {
            closeBtn.addEventListener("click", closeOverlay);
        }
        
        // Click handler to exit the preview if the empty dark backdrop space is clicked
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeOverlay();
            }
        });

        // Accessibility escape keyboard key option to close window
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && overlay.classList.contains("active")) {
                closeOverlay();
            }
        });
    }

    // Helper utility function to reset browser parameters when overlay shuts down
    function closeOverlay() {
        overlay.classList.remove("active");
        document.body.style.overflow = ""; // Restores default body viewport scrolling behaviors
    }
});