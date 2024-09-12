const searchInput = document.querySelector('.search-bar');
const suggestionsContainer = document.querySelector('.suggestions-container');
let selectedIndex = -1;
let suggestionTimeout;

document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar');
    const searchBarShadow = document.querySelector('.search-bar-shadow');

    searchBar.addEventListener('input', function() {
        if (this.validity.valid && this.value.trim() !== '') {
            searchBarShadow.style.height = '50%';
            searchBarShadow.style.top = 'calc(50% + 20px)';
        } else {
                        if (window.innerWidth > 1500) {
                searchBarShadow.style.height = '15%';
            }
            else {
                searchBarShadow.style.height = '10%';
            }
            searchBarShadow.style.top = 'calc(30% + 20px)';
        }
    });
    document.addEventListener('click', function(event) {
        if (!searchBar.contains(event.target)) {
                        if (window.innerWidth > 1500) {
                searchBarShadow.style.height = '15%';
            }
            else {
                searchBarShadow.style.height = '10%';
            }
            searchBarShadow.style.top = 'calc(30% + 20px)';
        }
    });
});

function fetchSuggestions(query) {
    clearTimeout(suggestionTimeout);
    suggestionTimeout = setTimeout(() => {
        if (query.trim() === '') {
            hideSuggestions();
            return;
        }
        const script = document.createElement('script');
        script.src = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}&callback=handleSuggestions`;
        document.body.appendChild(script);
        document.body.removeChild(script);
    }, 100);
}

function handleSuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';
    selectedIndex = -1;
    if (suggestions[1].length > 0 && searchInput.value.trim() !== '') {
        suggestions[1].forEach((suggestion, index) => {
            const div = document.createElement('div');
            div.textContent = suggestion;
            div.className = 'suggestion';
            div.addEventListener('click', () => {
                searchInput.value = suggestion;
                performSearch();
            });
            suggestionsContainer.appendChild(div);
        });
        showSuggestions();
    } else {
        hideSuggestions();
    }
}

function showSuggestions() {
    suggestionsContainer.style.display = 'block';
    requestAnimationFrame(() => {
        suggestionsContainer.classList.add('active');
    });
}

function hideSuggestions() {
    suggestionsContainer.classList.remove('active');
    setTimeout(() => {
        suggestionsContainer.style.display = 'none';
    }, 100);
    selectedIndex = -1;
}

function isUrlOrWebsite(input) {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const commonTLDs = [
        "com", "org", "net", "info", "biz", "xyz", "online", "site", "tech",
        "design", "me", "in", "us", "uk", "ca", "au", "de", "fr", "jp", "cn",
        "ru", "it", "edu", "gov", "mil", "int", "aero", "coop", "museum", "app",
        "blog", "shop", "social", "cloud", "bank", "health", "ai"
    ];

    return urlPattern.test(input) || commonTLDs.some(tld => input.endsWith(`.${tld}`));
}

function performSearch() {
    const query = searchInput.value.trim();

    if (isUrlOrWebsite(query)) {
        let url = query;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        console.log(`Opening URL: ${url}`);
        window.location.href = url; // Directly navigate to the URL
    } else {
        console.log(`Searching for: ${query}`);
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`; // Perform a Google search
    }

    searchInput.value = '';
    hideSuggestions();
}

searchInput.addEventListener('input', function () {
    const query = this.value.trim();
    if (query.length > 0) {
        fetchSuggestions(query);
    } else {
        hideSuggestions();
    }
});

searchInput.addEventListener('keydown', (e) => {
    const suggestions = suggestionsContainer.children;
    if (e.key === 'ArrowDown') {
        selectedIndex = (selectedIndex + 1) % suggestions.length;
        updateSelection();
    } else if (e.key === 'ArrowUp') {
        selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
        updateSelection();
    } else if (e.key === 'Enter') {
        if (selectedIndex >= 0) {
            searchInput.value = suggestions[selectedIndex].textContent;
            hideSuggestions();
        }
        performSearch();
        e.preventDefault();
    }
});

function updateSelection() {
    const suggestions = suggestionsContainer.children;
    for (let i = 0; i < suggestions.length; i++) {
        suggestions[i].classList.toggle('selected', i === selectedIndex);
    }
    if (selectedIndex >= 0) {
        suggestions[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
}

document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        hideSuggestions();
    }
});