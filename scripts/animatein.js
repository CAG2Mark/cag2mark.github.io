/* Custom animate-in in JavaScript library */

/*

MIT License

Copyright (c) 2020 Mark Ng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

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
    } else if (animType == "fade") {
        fade(element);
    } else if (animType == "scale") {
        scale(element);
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

    element.style.transform = `translate(${xoffset}px, ${yoffset}px)`;
    element.style.opacity = 0;

    element.classList.remove("fade-initial");

    setTimeout(() => {
        element.style.opacity = 1;
        element.style.transform = "translate(0px, 0px)";
        element.style.transition = `transform ${time}ms ease, opacity ${time}ms ease`;
    }, 1);

    setTimeout(() => {
        animateNext(element);
    }, time);

}

function scale(element) {

    let time = parseInt(element.getAttribute("data-scale-time"));

    element.style.transform = `scale(0, 0)`;
    element.style.opacity = 0;

    element.classList.remove("scale-initial");

    setTimeout(() => {
        element.style.opacity = 1;
        element.style.transform = "scale(1, 1)";
        element.style.transition = `transform ${time}ms ease, opacity ${time}ms ease`;
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