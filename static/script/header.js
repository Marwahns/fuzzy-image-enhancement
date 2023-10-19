let navScroll = window.pageYOffset;
const menuToggle = document.querySelector('.menu-toggle input');

/* animation for header */
window.onscroll = () => {
    const currentNavScroll = window.pageYOffset;

    if (currentNavScroll === 0) {
        document.querySelector('.header').style.backgroundColor = 'transparent';
        document.querySelector('.header').style.backdropFilter = 'none';
        document.querySelector('.header').style.boxShadow = 'none';
        document.querySelector('.logo').style.color = 'rgb(59 130 246)';
    } else if (navScroll > currentNavScroll) {
        document.querySelector('.header').style.top = '0';
        document.querySelector('.header').style.backgroundColor = 'rgba(252, 245, 235, 0.4)';
        document.querySelector('.header').style.backdropFilter = 'blur(8px)';
        document.querySelector('.header').style.boxShadow = '0px 5px 5px rgba(0, 0, 0, 0.3)';
        document.querySelector('.logo').style.color = 'black';
        document.querySelector('.logo').style.textShadow = 'none';
    } else {
        document.querySelector('.header').style.top = '-260px';
        document.querySelector('.header').style.backgroundColor = 'transparent';
    }
    navScroll = currentNavScroll;
}

/* navbar toggle */
menuToggle.addEventListener('click', () => {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('slide');
});
