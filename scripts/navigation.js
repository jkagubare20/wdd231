const navbutton = document.getElementById('ham-btn');
const navbar = document.getElementById('nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navbar.classList.toggle('show');
});