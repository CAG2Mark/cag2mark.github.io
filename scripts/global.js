/* navbar open close - get all navbar items */

var navItems = new Array();
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
        hBottom.classList.add("hamburger-line-bottom-active");
    } else {
        hTop.classList.remove("hamburger-line-top-active");
        hBottom.classList.remove("hamburger-line-bottom-active");
    }

    for (var i = 0; i < navItems.length; i++) {
        let item = navItems[i];
        if (hamburgerOpen) {
            item.classList.add("navigation-item-peek");
            document.getElementById("navbar").classList.add("navigation-open");
        } else {
            document.getElementById("navbar").classList.remove("navigation-open");

            setTimeout(() => {
                item.classList.remove("navigation-item-peek");
            }, 80);
        }
    }
}