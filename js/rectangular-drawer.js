function drawDrawer2() {
    if (window.innerWidth >= 1500) {
        let drawer2 = document.querySelector('.rectangular-drawer');
        if (drawer2.style.left === "0px") {
            drawer2.style.left = "-415px";
        } else {
            drawer2.style.left = "0px";
        }
    } else {
        let drawer2 = document.querySelector('.rectangular-drawer');
        if (drawer2.style.top === "0%") {
            drawer2.style.top = "150%";
        } else {
            drawer2.style.top = "0%";
        }
        }
    }