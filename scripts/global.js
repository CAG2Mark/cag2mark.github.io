/* jshint esversion:6 */

/* navbar open close - get all navbar items */

var navItems = [];
globalNavInit();

function globalNavInit() {

    let navList = document.getElementById("navigation-list");
    let children = navList.getElementsByTagName("li");

    for (var i = 0; i < children.length; i++) {
        let child = children[i];
        // assume the one and only child of this is an anchor
        let anchor = child.getElementsByTagName("a")[0];
        navItems.push(anchor);

        anchor.addEventListener('click', hamburgerClose);
    }
}


/* mobile navbar */

let hWrapper = document.getElementById("hamburger-wrapper");
let hTop = document.getElementById("hamburger-line-top");
let hBottom = document.getElementById("hamburger-line-bottom");

var hamburgerOpen = false;

hWrapper.addEventListener('click', hamburgerClicked);

var lock = false;

function hamburgerClicked() {
    hamburgerOpen = !hamburgerOpen;
    handleHamburgerChange();
}

function hamburgerClose() {
    if (!hamburgerOpen) return;
    hamburgerOpen = false;
    handleHamburgerChange();
}

function handleHamburgerChange() {

    if (hamburgerOpen) {
        hTop.classList.add("hamburger-line-top-active");
        hTop.classList.remove("hamburger-line-top-inactive");
        hBottom.classList.add("hamburger-line-bottom-active");
        hBottom.classList.remove("hamburger-line-bottom-inactive");
    } else {
        hTop.classList.remove("hamburger-line-top-active");
        hTop.classList.add("hamburger-line-top-inactive");
        hBottom.classList.remove("hamburger-line-bottom-active");
        hBottom.classList.add("hamburger-line-bottom-inactive");
    }

    if (hamburgerOpen) {
        document.getElementById("navbar").classList.add("navigation-open");
    } else {
        document.getElementById("navbar").classList.remove("navigation-open");
    }

    for (var i = 0; i < navItems.length; i++) {
        let item = navItems[i];
        if (hamburgerOpen) {
            item.classList.add("navigation-item-peek");
        } else {
            setTimeout(() => {
                item.classList.remove("navigation-item-peek");
            }, 80);
        }
    }
}