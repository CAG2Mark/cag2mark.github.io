/* Custom animate-in in JavaScript library */

/* Copyright Mark Ng 2020 */

/*  
    You are free to distribute, use and modify this code given that all copies of this code
    and derivative works only if they are distributed under this license, and all previous
    contributors including the original copyright holder are be listed in the soruce files. 
    The copyright holder and contributors shall, in no circumstance, not be held liable for 
    any damages or losses that incur from the usage of this code or its derivative works.
*/

/* Variables:

    All:
    - data-animation-head
    - data-animation-playonscroll
    - data-animation-scroll-leeway
    - data-animation-tyoe
    - data-animation-nextelement

    Typewriter:
    - data-typewriter-text
    - data-typewriter-rate

*/

/* Animation types:

    - typewriter
    - fade
*/

let items = document.getElementsByClassName("animation");

var elementsOnScroll = new Array();

for (var i = 0; i < items.length; i++) {

    let item = items[i];


    if (item.getAttribute("data-animation-head") != "false") {

        // if the element is not a head:
        // 1) if it is meant to play when scrolled into view then add it to
        // the list of items to check
        // 2) otherwise just animate it
        if (item.getAttribute("data-animation-playonscroll") == "true") {
            elementsOnScroll.push(item);
        } else {
            animate(item);
        }
    }
}

// #region animations

function animate(element) {

    let animType = element.getAttribute("data-animation-type");

    if (animType == "typewriter") {
        typeWriter(0, element);
    }
    else if (animType == "fade") {
        fade(element);
    }
}

function animateNext(element) {
    let nextElementId = element.getAttribute("data-animation-next-element");

    // check if exists
    if (nextElementId) {
        let nextElement = document.getElementById(nextElementId);
        animate(nextElement);
    }
}

function typeWriter(index, element) {

    let text = element.getAttribute("data-typewriter-text");

    // base case
    if (index >= text.length) {
        animateNext(element);
        return;
    }

    let time = parseInt(element.getAttribute("data-typewriter-rate"));

    element.innerHTML += text.charAt(index);

    setTimeout(() => typeWriter(index + 1, element), time);
}

function fade(element) {

    let time = parseInt(element.getAttribute("data-fade-time"));
    let xoffset = parseInt(element.getAttribute("data-fade-xoffset"));
    let yoffset = parseInt(element.getAttribute("data-fade-yoffset"));

    element.style.marginLeft = -xoffset + "px";
    element.style.marginTop = -yoffset + "px";
    element.style.opacity = 0;

    element.classList.remove("fade-initial");

    element.style.transition = `margin-left ${time}ms ease, margin-top ${time}ms ease, opacity ${time}ms ease`;

    setTimeout(() => {
        //element.style.marginLeft = 0;
        //element.style.marginTop = 0;
        element.style.opacity = 1;
    }, 1);

    animateNext(element);


}

// #endregion

window.addEventListener('scroll', onScroll);

// animate in elements already visible on load

onScroll();

// animates in items that only are visible when scrolling in
function onScroll() {

    for (var i = 0; i < elementsOnScroll.length; i++) {

        let item = elementsOnScroll[i];

        // check if item has been removed
        if (!item) continue;

        // get optional variables
        let leeway = 0;
        let leewayAttr = item.getAttribute("data-animation-scroll-leeway");
        if (leewayAttr) {
            leeway = parseInt(leewayAttr);
        }

        let threshold = window.pageYOffset + item.getBoundingClientRect().top -
            window.innerHeight + parseInt(leeway);

        if (threshold <= window.pageYOffset) {
            animate(item);
            // remove item
            elementsOnScroll[i] = null;
        }
    }
}