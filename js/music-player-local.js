const audio = document.getElementById('audio');
const bars = document.querySelectorAll('.bar');
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const seekSlider = document.querySelector('.seek-slider');
const playtime = document.querySelector('.playtime');

// Set up audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Connect audio source to the analyser node
const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Flag to control rendering
let isRendering = false;

function initializeBars() {
    bars.forEach(bar => {
        bar.style.height = '20px';
    });
}

function renderFrame() {
    if (!isRendering) return; // Stop rendering if not active

    requestAnimationFrame(renderFrame);
    
    // Get frequency data
    analyser.getByteFrequencyData(dataArray);
    
    // Scale the height of the bars based on frequency data
    bars.forEach((bar, index) => {
        const maxBarHeight = 70; // Set max height to 70px
        const barHeight = (dataArray[index] / 255) * maxBarHeight; // Normalize height based on max value of 255
        bar.style.height = `${barHeight}px`;
    });
}

// Play music function
function playMusic() {
    audioContext.resume();
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    isRendering = true; // Start rendering
    renderFrame();
}

// Pause music function
function pauseMusic() {
    audio.pause();
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
    isRendering = false; // Stop rendering
    // Reset bar heights
    initializeBars();
}

// Time update for slider and display
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    seekSlider.value = (currentTime / duration) * 100;
    
    // Update playtime
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
    playtime.textContent = `${minutes}:${seconds}`;
});

// Seek slider control
seekSlider.addEventListener('input', () => {
    const duration = audio.duration;
    audio.currentTime = (seekSlider.value / 100) * duration;
});
