const hamburgericon = document.querySelector(".hamburgericon");

hamburgericon.addEventListener("click", () => {
    const menu = document.getElementById("hambmenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});
