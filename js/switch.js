const root = document.documentElement;
const ico = document.querySelector(".ico");
const base = document.querySelector(".base");
let darkModeSelected = true; // Default to dark mode

function toggleSwitch() {
    const colour1 = getComputedStyle(root).getPropertyValue('--colour1').trim();
    const colour2 = getComputedStyle(root).getPropertyValue('--colour2').trim();
    
    // Swap the colors
    root.style.setProperty('--colour1', colour2);
    root.style.setProperty('--colour2', colour1);
    
    if (ico.style.right === "10px" || ico.style.right === "") {
        ico.style.right = "calc(100% - 50px)";
        ico.style.backgroundColor = colour2;
        ico.style.boxShadow = "none";
        darkModeSelected = false;
    } else {
        ico.style.right = "10px";
        ico.style.backgroundColor = colour1;
        ico.style.boxShadow = `inset 12px -12px 0 0 ${colour2}`;
        darkModeSelected = true;
    }

    // Save the dark mode state in localStorage
    localStorage.setItem('darkModeSelected', darkModeSelected);
}

// Load the dark mode state from localStorage
function loadDarkMode() {
    const savedDarkMode = localStorage.getItem('darkModeSelected');
    if (savedDarkMode !== null) {
        darkModeSelected = savedDarkMode === 'true'; // Convert string to boolean

        if (!darkModeSelected) {
            // Apply light mode if dark mode is not selected
            toggleSwitch(); // Call the function to set it to light mode
        }
    }
}

// Call this function on page load to load the dark mode state
window.addEventListener('load', loadDarkMode);
