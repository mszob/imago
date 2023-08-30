
// initial load

window.addEventListener('DOMContentLoaded', function () {
    globalThis.page = 'home';
    globalThis.windowSize = window.matchMedia('(max-width: 475px)');
    contentAutoSize();
    //see 'initial load' for more styles
});

// page load

function hidePages() {
    document.getElementById(page + '-main').style.display = 'none';
    document.getElementById(page + '-nav').style.display = 'none';
    document.getElementById('main-col').style.position = 'relative'; //this gets overid by home()
    if (windowSize.matches) {
        document.getElementById('sidebar').style.display = 'none';
        document.getElementById('main-col').style.textAlign = 'left';
    }
}

function showPage() {
    document.getElementById(page + '-main').style.display = 'block';
    document.getElementById(page + '-nav').style.display = 'block';
    contentAutoSize();
}

function smallPage() {
    document.getElementById('content').style.width = 'var(--content-width-sm)';
    content.style.transition = 'width 0s 0s, height 0s 0s'
    document.getElementById('main-col').style.paddingBottom = "0rem"
}

function mediumPage() {
    document.getElementById('content').style.width = 'var(--content-width-md)';
    content.style.transition = 'height 0.1s 0s, width 0.1s 0.1s'
    document.getElementById('main-col').style.paddingBottom = "0rem"
}

function largePage() {
    var content = document.getElementById('content');
    content.style.width = 'var(--content-width-lg)';
    content.style.transition = 'height 0.5s 0s, width 0.2s 0.2s'
    document.getElementById('main-col').style.paddingBottom = "4rem"
}

function contentAutoSize() {
    var content = document.getElementById('content');
    var mainCol = document.getElementById('main-col');
    var sidebar = document.getElementById('sidebar');
    content.style.height = mainCol.offsetHeight + 'px';
    content.style.minHeight = sidebar.offsetHeight + 'px';
    if (windowSize.matches) {
        content.style.height = mainCol.offsetHeight + sidebar.offsetHeight + 'px';
    }
}


// individual pages

function home() { //initial load to home is not controlled by this function, see CSS
    hidePages();
    globalThis.page = 'home';
    smallPage();
    if (windowSize.matches) {
        document.getElementById('main-col').style.textAlign = 'center';
        document.getElementById('sidebar').style.display = 'block';
        document.getElementById('main-col').style.position = 'relative';
    } else {
        document.getElementById('main-col').style.position = 'fixed';
    }
    showPage();
}

function dvorak() {
    hidePages();
    globalThis.page = 'dvorak';
    mediumPage();
    showPage();
}

function obsidian() {
    hidePages();
    globalThis.page = 'obsidian';
    mediumPage();
    showPage();
}

function keyboard() {
    hidePages();
    globalThis.page = 'keyboard';
    largePage();
    showPage();
}


// mobile

const windowSize = window.matchMedia('(max-width: 475px)');
if (windowSize.matches) {

}


// toggle theme button

function themeToggle() {
    if (body.className.includes('light-theme')) {
        body.className = "dark-theme";
        document.getElementById('legend').className = "dark-img";
    }
    else {
        body.className = "light-theme";
        document.getElementById('legend').className = "light-img";
    }
    localStorage.setItem('theme', body.className)
}

// show logo on first visit

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.noFirstVisit != "1") {
        document.getElementById('logo').style.display = "block";
        document.getElementById('home-box').style.animation = "home-box 4.5s";
        localStorage.noFirstVisit = "1";
    }
})

// forget first visit and reload button

function showLogo() {
    localStorage.noFirstVisit = null;
    location.reload();
}

// theme and favicon adapts to browser theme on load

document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.querySelector("body").className = "dark-theme";
        document.querySelector("link[rel='icon']").href = "favicon/dark.png";
        document.getElementById('legend').className = "dark-img";
    } else {
        document.querySelector("body").className = "light-theme";
        document.querySelector("link[rel='icon']").href = "favicon/light.png";
        document.getElementById('legend').className = "light-img";
    }
})

// theme and favicon adapts to browser theme on change

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches }) => {
        if (matches) {
            document.querySelector("body").className = "dark-theme";
            document.querySelector("link[rel='icon']").href = "favicon/dark.png";
            document.getElementById('legend').className = "dark-img";
        } else {
            document.querySelector("body").className = "light-theme";
            document.querySelector("link[rel='icon']").href = "favicon/light.png";
            document.getElementById('legend').className = "light-img";
        }
    })

// remember theme preference

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body')
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        body.className = storedTheme;
    }
})

// custom back arrow

window.onpopstate = function () {
    home();
}; history.pushState({}, '');