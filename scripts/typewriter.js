/* Custom typewriter JavaScript library */

/* Copyright Mark Ng 2020 */

/*  
    You are free to distribute, use and modify this code given that all copies of this code
    and derivative works only if they are distributed under this license, and all previous
    contributors including the original copyright holder are be listed in the soruce files. 
    The copyright holder and contributors shall, in no circumstance, not be held liable for 
    any damages or losses that incur from the usage of this code or its derivative works.
*/

let items = document.getElementsByClassName("typewriter");

for (var i = 0; i < items.length; i++) {

    let item = items[i];

    if (item.getAttribute("data-typewriter-head") != "false") {
        typeWriter(0, item)
    }
}

function typeWriter(index, element) {

    let text = element.getAttribute("data-typewriter-text");

    // base case
    if (index >= text.length) {

        // get next element
        let nextElementId = element.getAttribute("data-typewriter-next-element");

        // check if exists
        if (nextElementId) {
            let nextElement = document.getElementById(nextElementId);
            typeWriter(0, nextElement);
        }
        return;

    }

    let time = parseInt(element.getAttribute("data-typewriter-rate"));

    element.innerHTML += text.charAt(index);

    setTimeout(() => typeWriter(index + 1, element), time);
}