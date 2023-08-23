// page loads

function keyboard() {
    largePage();
    document.title = "picturamundi | keyboard"
    document.getElementById('sidebar').className = '';
    document.getElementById('home').className = 'hidden';
    document.getElementById('home-nav').className = 'hidden';
    document.getElementById('keyboard').className = 'visible';
    document.getElementById('keyboard-nav').className = 'visible';
}

function home() {
    smallPage();
    document.title = "picturamundi"
    document.getElementById('sidebar').className = 'home';
    document.getElementById('home-nav').className = 'visible';
    document.getElementById('keyboard-nav').className = 'hidden';
    setTimeout(() => {
        document.getElementById('home').className = 'visible';
        document.getElementById('keyboard').className = 'hidden';
    }, 500);
}

function smallPage() {
    document.getElementById('main-col').className = "shrink";
    document.getElementById('content').className = "shrink";
    document.getElementById('banner-right').className = "shrink";
    document.getElementById('banner-left').className = "shrink";
}

function largePage() {
    document.getElementById('main-col').className = "expand";
    document.getElementById('content').className = "expand";
    document.getElementById('banner-right').className = "expand";
    document.getElementById('banner-left').className = "expand";
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