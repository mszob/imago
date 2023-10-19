// initial load

window.addEventListener('DOMContentLoaded', function () {
    globalThis.page = 'home';
    adaptLayout();
});

// continual resize

addEventListener('resize', (event) => {
    adaptLayout();
});

addEventListener("deviceorientation", (event) => {
    adaptLayout();
});

function adaptLayout() {
    globalThis.mobile = window.matchMedia('(max-width: 540px)');
    var wrapper = document.getElementById('content-wrapper');
    var content = document.getElementById('content');
    var mainCol = document.getElementById('main-col');
    var sidebar = document.getElementById('sidebar');

    sidebar.style.position = 'fixed';

    if (page == 'home') {
        mainCol.style.position = 'fixed';
    } else {
        mainCol.style.position = 'relative';
    }

    if (mobile.matches) {
        document.getElementById('home-main').style.textAlign = 'center';

        if (page == 'home') {
            sidebar.style.display = 'block';
            sidebar.style.marginTop = mainCol.offsetHeight + 'px';
            content.style.height = sidebar.offsetHeight + mainCol.offsetHeight + 'px';
        } else {
            sidebar.style.display = 'none';
            mainCol.style.textAlign = 'left';
            content.style.height = mainCol.offsetHeight + 'px';
        }

        if (page == 'home' || page == 'dvorak' || page == 'script') {
            wrapper.style.alignItems = 'flex-start';
            content.style.marginTop = '17vh';
        } else {
            wrapper.style.alignItems = 'center';
            content.style.marginTop = '';
        }

    } else {
        document.getElementById('home-main').style.textAlign = 'left';
        wrapper.style.alignItems = 'center';
        content.style.marginTop = '';
        sidebar.style.display = 'block';
        sidebar.style.marginTop = '0px';
        mainCol.style.textAlign = 'left';
        content.style.minHeight = sidebar.offsetHeight + 'px';
        content.style.height = mainCol.offsetHeight + 'px';
    }
}

// punctual page load

function hidePages() {
    document.getElementById(page + '-main').style.display = 'none';
    document.getElementById(page + '-nav').style.display = 'none';
}


function showPage() {
    document.getElementById(page + '-main').style.display = 'block';
    document.getElementById(page + '-nav').style.display = 'block';
    adaptLayout();
}

function smallPage() {
    document.getElementById('content').style.width = 'var(--content-width-sm)';
    content.style.transition = 'width 0s 0s, height 0s 0s'
    document.getElementById('main-col').style.paddingBottom = "0rem"
    if (mobile.matches) {
        content.style.transition = 'height 0s 0s, width 0s 0s'
    } else {
        content.style.transition = 'height 0.1s 0.2s, width 0.2s 0s'
    }
}

function mediumPage() {
    document.getElementById('content').style.width = 'var(--content-width-md)';
    document.getElementById('main-col').style.paddingBottom = "0rem"
    transition();
}

function largePage() {
    var content = document.getElementById('content');
    content.style.width = 'var(--content-width-lg)';
    document.getElementById('main-col').style.paddingBottom = "4rem"
    transition();
}

function transition() {
    if (mobile.matches) {
        content.style.transition = 'height 0s 0s, width 0s 0s'
    } else {
        content.style.transition = 'height 0.4s 0.2s, width 0.2s 0s'
    }
}


// individual pages

function home() { //initial load to home is not controlled by this function, see CSS
    hidePages();
    globalThis.page = 'home';
    smallPage();
    showPage();
}

function dvorak() {
    hidePages();
    globalThis.page = 'dvorak';
    mediumPage();
    showPage();
}

function script() {
    hidePages();
    mediumPage();
    globalThis.page = 'script';
    showPage();
}

function keyboard() {
    hidePages();
    globalThis.page = 'keyboard';
    largePage();
    showPage();
}


// toggle theme button

function themeToggle() {
    if (body.className.includes('light-theme')) {
        body.className = "dark-theme";
        // document.getElementById('legend').className = "dark-img";
    }
    else {
        body.className = "light-theme";
        // document.getElementById('legend').className = "light-img";
    }
    localStorage.setItem('theme', body.className)
}

// show logo on first visit

// document.addEventListener('DOMContentLoaded', () => {
//     if (localStorage.noFirstVisit != "1") {
//         document.getElementById('logo').style.display = "block";
//         document.getElementById('home-box').style.animation = "home-box 4.5s";
//         localStorage.noFirstVisit = "1";
//     }
// })

// forget first visit and reload button

function showLogo() {
    localStorage.noFirstVisit = null;
    location.reload();
}

// theme and favicon adapts to browser theme on load

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body')
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        document.getElementById('body').className = localStorage.getItem('theme');
    }
    else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector("body").className = "dark-theme";
            document.querySelector("link[rel='icon']").href = "assets/favicon/dark.png";
            // document.getElementById('legend').className = "dark-img";
        } else {
            document.querySelector("body").className = "light-theme";
            document.querySelector("link[rel='icon']").href = "assets/favicon/light.png";
            document.getElementById('legend').className = "light-img";
        }
    }
})

// theme and favicon adapts to browser theme on change

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches }) => {
        if (matches) {
            document.querySelector("body").className = "dark-theme";
            document.querySelector("link[rel='icon']").href = "assets/favicon/dark.png";
            document.getElementById('legend').className = "dark-img";
        } else {
            document.querySelector("body").className = "light-theme";
            document.querySelector("link[rel='icon']").href = "assets/favicon/light.png";
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