function drawDrawer2Rocket() {
    let drawer2 = document.querySelector('.rectangular-drawer');
    if (drawer2.style.top === "150%") {
        drawer2.style.top = "0%";
    } else {
        drawer2.style.top = "150%";
    }
}