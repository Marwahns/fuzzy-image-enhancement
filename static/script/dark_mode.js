/* colors */
const colors = {
    white: '#fff',
    black: '#000',
    lightGrayishBlue: '#e2e8f0',
    skyBlue: '#72c0e6',
    darkMidnightBlue: '#0d1021',
    steelBlue: '#7B8695'
}

/* box shadow */
const boxShadow = {
    darkToggle: 'inset 0 8px 60px rgba(0, 0, 0, .3), inset 8px 0 8px rgba(0, 0, 0, .3), inset 0 -4px 4px rgba(0, 0, 0, .3)',
    lightToggle: 'inset 0 8px 60px rgba(0, 0, 0, .1), inset 0 8px 8px rgba(0, 0, 0, .1), inset 0 -4px 4px rgba(0, 0, 0, .1)',
    darkContainerEnhancement: 'inset 0 2px 4px 0 rgb(255 255 255 / 0.05)',
    lightContainerEnhancement: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
}

/* background image */
const backgroundImage = {
    darkContainerEnhancement: 'linear-gradient(to bottom right, #141d26, #243447)',
    lightContainerEnhancement: 'linear-gradient(to bottom right, white, #F5F5F5)',
}

/* element */
const darkBtn = document.getElementById('darkbtn');
const body = document.body
const isDarkMode = localStorage.getItem('darkMode') === 'enabled'
const styleSheet = document.styleSheets[1]; /* index stylesheet */
const rules = styleSheet.cssRules || styleSheet.rules;
const mediaQuery = window.matchMedia('(max-width: 480px)')
const mediaQuery2 = window.matchMedia('(min-width: 481px)')

const slider = document.getElementById('slider')
const linkDocument = document.getElementById('link-document')
const containerEnhancement = document.getElementById('container-enhancement')
const subTitle = document.getElementById('SubTitle')

/* function for access pseudo class css */
function changeMode(urlChangeMode, valueBoxShadow) {
    for (const rule of rules) {
        if (rule.selectorText === '.slider::before') {
            rule.style.backgroundImage = urlChangeMode;
            break;
        }
        if (rule.selectorText === 'input::focus+.slider') {
            rule.style.boxShadow = valueBoxShadow;
            break;
        }
    }
}

/* Function that will be called when the query media changes */
function handleMediaQueryChange(mediaQuery, valueBackgroundColor) {
  if (mediaQuery.matches) {
    document.querySelector('nav ul').style.backgroundColor = valueBackgroundColor;
  }
}

function HandleQuerySelectorChangesMode(colorFuzzyTypes, colorFuzzyValues, colorMenuToggle, bgColor) {
    const menuToggle = document.getElementById('menu-toggle')
    const fuzzyTypes = document.querySelectorAll('.jenis-fuzzy')
    const fuzzyValues = document.querySelectorAll('.value-fuzzy')

    fuzzyTypes.forEach(item => {
        item.style.color = colorFuzzyTypes;
    });
    fuzzyValues.forEach(item => {
        item.style.color = colorFuzzyValues;
    });
    menuToggle.querySelectorAll('span').forEach(item => {
        item.style.backgroundColor = colorMenuToggle;
    });
    document.querySelector('nav ul').style.backgroundColor = bgColor;
}

/* function for dark mode */
function DarkMode() {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
    changeMode('url("../images/moon.png")', boxShadow.darkToggle);
    slider.style.boxShadow = boxShadow.darkToggle
    linkDocument.style.color = colors.white
    containerEnhancement.style.backgroundImage = backgroundImage.darkContainerEnhancement
    containerEnhancement.style.boxShadow = boxShadow.darkContainerEnhancement
    subTitle.style.color = colors.lightGrayishBlue
    HandleQuerySelectorChangesMode(colors.white, colors.skyBlue, colors.white, colors.darkMidnightBlue)
    handleMediaQueryChange(mediaQuery, colors.darkMidnightBlue);
    handleMediaQueryChange(mediaQuery2, '');
}

/* function for light mode */
function LightMode() {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
    changeMode('url("../images/sun.png")', boxShadow.lightToggle);
    slider.style.boxShadow = boxShadow.lightToggle
    linkDocument.style.color = colors.black
    containerEnhancement.style.backgroundImage = backgroundImage.lightContainerEnhancement
    containerEnhancement.style.boxShadow = boxShadow.lightContainerEnhancement
    subTitle.style.color = colors.black
    HandleQuerySelectorChangesMode(colors.black, colors.steelBlue, colors.black, colors.white)
    handleMediaQueryChange(mediaQuery, colors.white);
    handleMediaQueryChange(mediaQuery2, '');
}

if (isDarkMode) {
    darkBtn.checked = true;
    DarkMode()
}

darkBtn.addEventListener('change', () => {
    if (darkBtn.checked) {
        DarkMode()
    } else {
        LightMode()
    }
})
