function drawDrawer() {
    if (window.innerWidth >= 1500) {
        let drawer = document.querySelector('.circular-drawer');
        if (drawer.style.transform === "translate(40%, -50%)") {
            drawer.style.transform = "translate(91%, -50%)";
        } else {
            drawer.style.transform = "translate(40%, -50%)";
        }
    }
    else {
        let drawer = document.querySelector('.circular-drawer');
        if (drawer.style.top === "-40%") {
            drawer.style.top= "0%";
        } else {
            drawer.style.top = "-40%";
        }
    }
}