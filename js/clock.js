function updateClock() {
    const now = new Date();
    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hourHand = document.querySelector('.hour-hand');

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;

    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
    const hourDegrees = ((hours + minutes / 60) / 12) * 360;

    secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to avoid delay

function updateMinuteHand() {
    if(darkModeSelected) {
        document.querySelector('.minute-hand').style.backgroundColor = 'var(--colour1)';
    }
    else {
        document.querySelector('.minute-hand').style.backgroundColor = 'var(--colour2)';
    }
}

setInterval(updateMinuteHand, 10)