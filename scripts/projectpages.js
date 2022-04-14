let from = (new URLSearchParams(window.location.search)).get("from");
console.log(from);
if (from == 'home') {
    let backBtn = document.getElementsByClassName("back-link")[0];
    backBtn.innerHTML = backBtn.innerHTML.replace("Projects", "Home");
    backBtn.href = "index.html";
}