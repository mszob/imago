// #content size and #main-col size: fit to content (banner + main)

window.addEventListener('DOMContentLoaded', function () {
    contentWidth();
    contentHeight();
    mainColHeight();
});

function contentWidth() {
    var content = document.getElementById('content');
    var mainCol = document.getElementById('main-col');
    content.style.width = mainCol.offsetWidth + 'px';
}

function contentHeight() {
    var content = document.getElementById('content');
    var mainCol = document.getElementById('main-col');
    content.style.height = mainCol.offsetHeight + 'px';
}

function mainColHeight() {
    document.getElementById('main-col').style.height = document.getElementById(page).offsetHeight + 'px';
}


// page load "blocks"

function smallPage() {
    document.getElementById('main-col').className = "shrink";
    document.getElementById('content').className = "shrink";
    document.getElementById('banner-right').className = "shrink";
    document.getElementById('banner-left').className = "shrink";
    contentHeight();
}

function midPage() {
    document.getElementById('main-col').className = "shrink-2";
    document.getElementById('content').className = "shrink";
    document.getElementById('banner-right').className = "shrink";
    document.getElementById('banner-left').className = "shrink";
    contentHeight();
}

function largePage() {
    document.getElementById('main-col').className = "expand";
    document.getElementById('content').className = "expand";
    document.getElementById('banner-right').className = "expand";
    document.getElementById('banner-left').className = "expand";
    document.getElementById('content').style.height = "90vh";
}

function hideAll() {
    document.getElementById('sidebar').className = '';
    document.getElementById('home').className = 'hidden';
    document.getElementById('home-nav').className = 'hidden';
    document.getElementById('keyboard').className = 'hidden';
    document.getElementById('keyboard-nav').className = 'hidden';
    document.getElementById('dvorak').className = 'hidden';
    document.getElementById('dvorak-nav').className = 'hidden';
}

function switchPage() {
    hideAll();
    showPage();
}

function showPage() {
    var mainCol = document.getElementById('main-col');
    document.getElementById(page).className = 'visible';
    document.getElementById(page + '-nav').className = 'visible';
    contentWidth();
}

// page loads

function home() {
    globalThis.page = 'home';
    smallPage();
    switchPage();
    document.title = "picturamundi"
    document.getElementById('sidebar').className = 'home';
}

function dvorak() {
    globalThis.page = 'dvorak';
    midPage();
    switchPage();
    document.title = "picturamundi | dvorak"
}

function keyboard() {
    globalThis.page = 'keyboard';
    largePage();
    switchPage();
    document.title = "picturamundi | keyboard"
}

// function dvorak() {
//     const windowSize = window.matchMedia('(max-width: 475px)')
//     smallPage();
//     document.title = "picturamundi";
//     if (windowSize.matches) {
//         dvorakMobile();
//     } else {
//         setTimeout(() => {
//             dvorakMobile(); // home desktop is same as home mobile with some delays
//         }, 0);
//     }
// }

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