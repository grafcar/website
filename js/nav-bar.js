// nav-bar.js (updated)
document.addEventListener('DOMContentLoaded', function() {
    // Use relative path instead of absolute
    fetch('/components/nav-bar.html')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(html => {
        document.getElementById('nav-bar').innerHTML = html;
        // Dispatch event when navbar loads
        document.dispatchEvent(new Event('navbar-loaded'));
      })
      .catch(error => console.error("Error loading nav bar:", error));
  });

  document.addEventListener('navbar-loaded', function() {
    console.log("Navbar has loaded!");

    const lightTheme = document.querySelector('.theme--light');
    const darkTheme = document.querySelector('.theme--dark');
    const navbar__hamburger = document.querySelector('.navbar__hamburger');
    const navbar__hamburger_submenu = document.querySelector('.navbar__hamburger-submenu');
    const navbar__hamburger_close = document.querySelector('.navbar__hamburger-close');
    console.log(navbar__hamburger_close);

    if (!lightTheme || !darkTheme) {
        console.error("Theme elements not found!");
        return;
    }

    function toggleTheme() {
        console.log('toggleTheme');
        document.body.classList.toggle('dark');
        lightTheme.classList.toggle("hidden");
        darkTheme.classList.toggle("hidden");
    }

    function closeNavBar(){
      console.log('closeNavBar');
      navbar__hamburger_submenu.classList.add('hidden');
    }
    function openNavBar(event){
      console.log('openNavBar');
      if(!event.target.closest('.navbar__hamburger-submenu')){
        console.log('openNavBar');
        navbar__hamburger_submenu.classList.remove('hidden');
      }
    }

    navbar__hamburger_close.addEventListener('click', function(event){
      event.stopPropagation();
      closeNavBar();
    });
    
    navbar__hamburger.addEventListener('click', openNavBar);
    lightTheme.addEventListener('click', toggleTheme);
    darkTheme.addEventListener('click', toggleTheme);

});

