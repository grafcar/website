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