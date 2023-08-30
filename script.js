// initial load

window.addEventListener('DOMContentLoaded', function () {
    globalThis.page = 'home';
    adaptLayout();
});

// continual resize

addEventListener("resize", (event) => {
    adaptLayout();
});

addEventListener('click', (event) => {
    adaptLayout();
});

function adaptLayout() {
    var mobile = window.matchMedia('(max-width: 500px)');
    var content = document.getElementById('content');
    var mainCol = document.getElementById('main-col');
    var sidebar = document.getElementById('sidebar');
    // document.getElementById('sidebar').style.backgroundColor = 'red';
    if (mobile.matches) {
        if (page == 'home') {
            sidebar.style.display = 'block';
            mainCol.style.textAlign = 'center';
        } else {
            sidebar.style.display = 'none';
            mainCol.style.textAlign = 'left';
        }
    } else {
        content.style.height = mainCol.offsetHeight + 'px';
        content.style.minHeight = sidebar.offsetHeight + 'px';
        sidebar.style.display = 'block';
        mainCol.style.textAlign = 'left';
        if (page == 'home') {
            mainCol.style.position = 'fixed';
        } else {
            mainCol.style.position = 'relative';
        }
    }
}

// punctual page load

function hidePages() {
    document.getElementById(page + '-main').style.display = 'none';
    document.getElementById(page + '-nav').style.display = 'none';
    document.getElementById('main-col').style.position = 'relative'; //this gets overid by home()
}

function showPage() {
    document.getElementById(page + '-main').style.display = 'block';
    document.getElementById(page + '-nav').style.display = 'block';
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