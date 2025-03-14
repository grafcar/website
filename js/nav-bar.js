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

  function toggleTheme() {
    var body = document.querySelector('body');
    body.classList.toggle('dark')
    const lightTheme = document.querySelector('.light_mode');
    const darkTheme = document.querySelector('.dark_mode');
    lightTheme.classList.toggle("hidden");
    darkTheme.classList.toggle("hidden");
}

// Attach event listeners
document.querySelector('.light_mode').addEventListener('click', toggleTheme);
document.querySelector('.dark_mode').addEventListener('click', toggleTheme);  