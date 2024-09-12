function expandSelector() {
    const themerBaseElement = document.querySelector('.optbase');
    const optionsElement = document.querySelector('.options');
    const themerContainer = document.querySelector('.themer-container');
    const currentHeight = window.getComputedStyle(themerBaseElement).height;
    
    if (currentHeight === '200px') {
        themerContainer.style.top = '50%';
        themerContainer.style.height = '70px';
        themerBaseElement.style.height = '60px';
        optionsElement.style.display = 'none';
    } else {
        themerContainer.style.top = 'calc(50% + 70px)';
        themerContainer.style.height = '210px';
        themerBaseElement.style.height = '200px';
        
        // Add a delay of 500 milliseconds (0.5 seconds) before changing the display
        setTimeout(() => {
            optionsElement.style.display = 'flex';
        }, 180);  // Adjust the delay time as needed (500 ms in this case)
    }    
}
