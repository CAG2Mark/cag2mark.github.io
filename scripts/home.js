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

// mobile horizontal scrolling of language container
let langWrap = document.getElementById("languages-wrapper");
let langContainer = document.getElementById("languages-container");
langWrap.addEventListener('scroll', languageScroll);

// focus into selected
let focusElem = document.getElementById("language-mobile-focus");
if (focusElem) {
    let rect = focusElem.getBoundingClientRect();
    langWrap.scrollLeft = (rect.left + rect.right - langWrap.offsetWidth) / 2 ;
}
function languageScroll() {
    let children = langContainer.getElementsByTagName("div");
    for (let i = 0; i < children.length; ++i) {
        let child = children[i];
        let rect = child.getBoundingClientRect();
        let pos = (rect.left + rect.right - window.innerWidth ) / 2;
        if (Math.abs(pos) < 45) child.classList.add("force-hover");
        else child.classList.remove("force-hover");
    }
}

// Hey, if you're looking at this, then you are a cheater and you don't deserve my secrets.
function spillMySecret() {
    document.getElementById("languages-title").innerHTML = "Languages (secret edition)"
    var secret = document.getElementById("invis-thing-hehe");
    secret.style.display = "inline-block";
    secret.style.width = "130px";
    secret.style.opacity = "1";
    console.log("Congratulations! You found an easter egg! Keep looking for more!");
}

// Email

// Done this way to prevent spambots
let username = "markng989";
let domain = "gmail.com";

let email = username + "@" + domain;

let lnk = document.getElementById("email-text");
lnk.setAttribute("href", "mailto:" + email);
lnk.innerHTML = email;

let closed = false;
// domain moved
if (window.location.href.includes("markng.me/")) {

    document.body.classList.add("modal-show");
    let dialog = document.getElementById("modal-moved");
    let background = document.getElementsByClassName("modal-background")[0];
    setTimeout(() => {

        dialog.classList.remove("modal-start");
        background.classList.remove("modal-start"); 
    }, 1);

    document.getElementById("domain-redirect-button").addEventListener(
        "click", (o, e) => 
            window.location.href=window.location.href.replace(".me", ".com"));

    document.getElementById("domain-close-button").addEventListener(
        "click", 
        (o, e) => {
            if (closed) return;
            closed = true;

            let title = document.getElementById("modal-domain-title");
            title.style.opacity = "0"
            setTimeout(() => {
                title.innerHTML = "<span class=\"red\">:(</span>"
                title.style.opacity = "1"

                setTimeout(() => {
                    dialog.classList.add("modal-start");
                    background.classList.add("modal-start"); 
                    setTimeout(() => {
                        document.body.classList.remove("modal-show");
                    }, 200);
                }, 1000);
            }, 100);
    });

}