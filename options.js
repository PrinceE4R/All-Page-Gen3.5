const options = [
    { name: 'System', func: optionsCreator("system","20") },
    { name: 'Bladerunner', func: optionsCreator("bladerunner","16") },
    { name: 'Synthwave', func: optionsCreator("synthwave","18") },
    { name: 'Cyberpunk', func: optionsCreator("cyberpunk","18") },
    { name: 'Batman', func: optionsCreator("batman","20") },
    { name: 'John Wick', func: optionsCreator("johnwick","16") },
    { name: 'Death', func: optionsCreator("death","20") },
    { name: 'Matrix', func: optionsCreator("matrix","20") },
    { name: 'Pink', func: optionsCreator("pink","20") },
    { name: 'Red', func: optionsCreator("red","20") },
    { name: 'Yellow', func: optionsCreator("yellow","20") },
    { name: 'Green', func: optionsCreator("green","20") },
    { name: 'Blue', func: optionsCreator("blue","20") },
    { name: 'Cyan', func: optionsCreator("cyan","20") },
    { name: 'Purple', func: optionsCreator("purple","20") }
];

// Function to generate the options list dynamically
function generateOptions() {
    const optionsList = document.getElementById('options-list');
   
    options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option.name;
        li.addEventListener('click', () => {
            // Remove 'selected' class from all options
            optionsList.querySelectorAll('li').forEach(el => el.classList.remove('selected'));
            // Add 'selected' class to clicked option
            li.classList.add('selected');
            option.func();
            // Save the selected theme and its selected state in localStorage
            localStorage.setItem('selectedTheme', option.name);
            localStorage.setItem('selectedThemeState', 'true');
        });
        optionsList.appendChild(li);
    });
}

// Define your option creator function
function optionsCreator(name, fontsize) {
    return function() {
        const audio = document.getElementById('audio');
        const systemNameElement = document.getElementById('systemName');
        const optBase = document.querySelector('.optbase span');
        const root = document.documentElement;
        const suggestionsContainer = document.querySelector('.suggestions-container');
        
        if (darkModeSelected) {
            root.style.setProperty('--colour1', `var(--${name}-light)`);
            root.style.setProperty('--colour2', `var(--${name}-dark)`);
        } else {
            root.style.setProperty('--colour1', `var(--${name}-dark)`);
            root.style.setProperty('--colour2', `var(--${name}-light)`);
        }
        const imgPath = `./images/${name}.jpg`;
        document.body.style.backgroundImage = `url(${imgPath})`;
        suggestionsContainer.style.color = `var(--${name}-light)`;
        optBase.style.fontSize = `${fontsize}px`;
        audio.src = `./audios/${name}.m4a`;
        systemNameElement.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        toggleSwitch();
        toggleSwitch();
    }
}

// Function to load the theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    const savedThemeState = localStorage.getItem('selectedThemeState');
    if (savedTheme) {
        const themeOption = options.find(option => option.name === savedTheme);
        if (themeOption) {
            themeOption.func(); // Apply the saved theme
            // Add 'selected' class to the saved theme option if it was selected
            if (savedThemeState === 'true') {
                const optionsList = document.getElementById('options-list');
                const selectedLi = Array.from(optionsList.children).find(li => li.textContent === savedTheme);
                if (selectedLi) {
                    selectedLi.classList.add('selected');
                }
            }
        }
    }
}

window.addEventListener('load', () => {
    generateOptions();
    loadTheme(); // Load the saved theme if it exists
});
