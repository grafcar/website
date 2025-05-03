// Name changing on scroll
const navName = document.getElementById("nav-name");
window.addEventListener("scroll", () => { if (window.scrollY > 100) { navName.textContent = "Home"; } else { navName.textContent = "Bryan De Los Santos"; } });
