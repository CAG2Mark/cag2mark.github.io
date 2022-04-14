/* jshint esversion:6 */

// lock height

document.getElementById("projects").style.minHeight = document.getElementById("projects").getBoundingClientRect().height;
// pair nav pairs

window.addEventListener('scroll', handleScroll);

// index all navigation items and the paired sections

let navList = document.getElementById("navigation-list");
let children = navList.getElementsByTagName("li");

var pairs = new Array(children.length);

for (var i = 0; i < children.length; i++) {
    let child = children[i];

    // initialize array for storage
    let array = new Array(2);

    // assume the one and only child of this is an anchor
    let anchor = child.getElementsByTagName("a")[0];
    let pairedSection = document.getElementById(anchor.getAttribute("data-section-pair"));

    array[0] = anchor;
    array[1] = pairedSection;

    pairs[i] = array;
}

// handle initially
handleScroll();

// changes selected navbar item based on the scroll position
function handleScroll() {
    document.documentElement.dataset.scroll = Math.max(30, window.scrollY); 

    for (var i = 0; i < pairs.length; i++) {
        let pair = pairs[i];

        // add some leeway
        let leeway = 200;

        let lower = window.pageYOffset + pair[1].getBoundingClientRect().top - leeway;
        let upper = window.pageYOffset + pair[1].getBoundingClientRect().top + pair[1].getBoundingClientRect().height - leeway;

        let atBottomofPage = (window.innerHeight + window.scrollY) + 5 >= document.body.offsetHeight;
        let isBottom = pair[0].getAttribute("data-section-bottom") == "true";

        if (atBottomofPage) {
            if (isBottom) {
                pair[0].classList.add("navigation-selected");
            } else {
                pair[0].classList.remove("navigation-selected");
            }
        }
        else if ((lower <= window.scrollY && window.scrollY < upper)) {
            pair[0].classList.add("navigation-selected");
        } else {
            pair[0].classList.remove("navigation-selected");
        }
    }
}

// Email

// Done this way to prevent spambots
let username = "markng989";
let domain = "gmail.com";

let email = username + "@" + domain;

let lnk = document.getElementById("email-text");
lnk.setAttribute("href", "mailto:" + email);
lnk.innerHTML = email;