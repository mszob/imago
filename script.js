// initial load


window.addEventListener('DOMContentLoaded', function () {
    globalThis.mobileWidth = window.matchMedia('(max-width: 650px)');
    globalThis.mobileHeight = window.matchMedia('(max-height: 600px)');
    globalThis.page = 'home';
    adaptLayout();
    route();
    document.getElementById('content').style.transition = "height 0s"; // prevent animations on load
});

// continual resize

addEventListener('resize', (event) => {
    adaptLayout();
});

addEventListener("deviceorientation", (event) => {
    adaptLayout();
});

addEventListener('click', (event) => {
    document.getElementById('content').style.transition = "height 0.3s 0s";
    adaptLayout();
});

function adaptLayout() {

    var wrapper = document.getElementById('content-wrapper');
    var content = document.getElementById('content');
    var mainCol = document.getElementById('main-col');
    var sidebar = document.getElementById('sidebar');
    var writing = document.getElementById('writing-toggle');
    var typing = document.getElementById('typing-toggle');


    sidebar.style.position = 'fixed';

    if (page == 'home') {
        mainCol.style.position = 'fixed';
        document.getElementById('link-right').style.color = 'var(--text-primary)';
        mainCol.style.width = 'var(--sidebar-width)';
    } else {
        mainCol.style.position = 'relative';
        document.getElementById('link-right').style.color = 'var(--text-light)';
        mainCol.style.width = '';
    }

    if (mobileHeight.matches || mobileWidth.matches) {
        document.getElementById('home-main').style.textAlign = 'center';
        sidebar.style.height = 'fit-content';

        if (page == 'home') {
            sidebar.style.display = 'block';
            // sidebar.style.marginTop = mainCol.offsetHeight + 'px';
            content.style.height = sidebar.offsetHeight + mainCol.offsetHeight + 'px';
            mainCol.style.position = 'relative';
            sidebar.style.position = 'relative';
        } else {
            sidebar.style.display = 'none';
            mainCol.style.textAlign = 'left';
            content.style.height = mainCol.offsetHeight + 'px';
        }

        if (page == 'home' || page == 'reflection' || page == 'script') {
            wrapper.style.alignItems = 'flex-start';
            content.style.marginTop = '15vh';
        } else {
            wrapper.style.alignItems = 'center';
            content.style.marginTop = '';
        }

    } else {
        document.getElementById('home-main').style.textAlign = 'left';
        wrapper.style.alignItems = 'center';
        content.style.marginTop = '';
        sidebar.style.height = '';
        sidebar.style.display = 'block';
        sidebar.style.marginTop = '0px';
        mainCol.style.textAlign = 'left';
        content.style.minHeight = sidebar.offsetHeight + 'px';
        // content.style.maxHeight = sidebar.offsetHeight + 'px'; // ACTIVATE THIS TO FIX BANNER
        content.style.height = mainCol.offsetHeight + 'px';
    }

    // find the original height of main-Col (no expanded sections)
    // main-Col height must be calculated after auto resizing (all the above function content) in order to preserver smooth animations
    if (page == 'home') {
        if (!mobileHeight.matches || !mobileWidth.matches) {
            if (document.getElementById('writing-toggle').classList.contains('hidden')) {
                if (document.getElementById('typing-toggle').classList.contains('hidden')) {
                    globalThis.homeHeight = mainCol.offsetHeight + 'px';
                    // ^ saves the home main-col height to a variable, which can then be used to set sidebar height even when main-col height changes
                } else {
                    globalThis.homeHeight = mainCol.offsetHeight - typing.offsetHeight - 14 + 'px';
                    // no idea why I need to manually adjust with random pixel values, but oh well
                }
            } else {
                if (document.getElementById('typing-toggle').classList.contains('hidden')) {
                    globalThis.homeHeight = mainCol.offsetHeight - writing.offsetHeight - 14 + 'px';
                } else {
                    globalThis.homeHeight = mainCol.offsetHeight - writing.offsetHeight - typing.offsetHeight - 28 + 'px';
                }
            }
        }
    }

    if (!mobileHeight.matches || !mobileWidth.matches) {
        if (page == 'home') {
            sidebar.style.height = homeHeight;
        }
    } else {
    }
}

// home toggles

function writingToggle() {
    var writing = document.getElementById('writing-toggle')
    writing.classList.toggle('hidden');
}

function typingToggle() {
    var typing = document.getElementById('typing-toggle')
    typing.classList.toggle('hidden');
}


// address-based page load

window.addEventListener("hashchange", function () {

    // back to animation
    document.getElementById('content').style.transition = "height 0.7s 0.2s, width 0.2s 0s";

    // Get the hash fragment from the URL
    route();
});

function route() {

    var hash = window.location.hash;

    // Remove the "#" symbol from the hash
    var functionName = hash.substring(1);

    // Call the corresponding function
    if (typeof window[functionName] === "function") {
        window[functionName]();
    } else {
        console.log("Function not found");
    }
}


// scroll to headings

function scrollToHeading(headingId) {
    const heading = document.getElementById(headingId);
    heading.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo(0, 0);
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
    document.getElementById('main-col').style.paddingBottom = "0rem"
}

function mediumPage() {
    document.getElementById('content').style.width = 'var(--content-width-md)';
    document.getElementById('main-col').style.paddingBottom = "0rem"
}

function largePage() {
    var content = document.getElementById('content');
    content.style.width = 'var(--content-width-lg)';
    document.getElementById('main-col').style.paddingBottom = "4rem"
}


// individual pages

function home() { //initial load to home is not controlled by this function, see CSS
    document.getElementById('content').style.transition = "height 0.4s 0.1s, width 0.2s 0s";
    hidePages();
    globalThis.page = 'home';
    smallPage();
    showPage();
}

function script() {
    hidePages();
    largePage();
    globalThis.page = 'script';
    showPage();
}

function reflection() {
    hidePages();
    globalThis.page = 'reflection';
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
            body.className = 'dark-theme';
        } else {
            body.className = 'light-theme';
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
}; history.pushState({}, '/home');


document.addEventListener("DOMContentLoaded", function () {
    var includedContent = document.querySelector("#includedContent");
    fetch("run.html")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            includedContent.innerHTML = data;
        });
});