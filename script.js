function home() {
    pageId = "home";
    document.getElementById('main').style.animation = "shrink 0.5s";
    document.getElementById('home-sidebar').style.display = "block";
    document.getElementById('keyboard-sidebar').style.display = "none";
    document.getElementById('main-type').style.animation = "disappear 0.3s";
    document.getElementById('main-type').style.animationFillMode = "forwards"; document.getElementById('main-type').style.mozAnimationFillMode = "forwards", msAnimationFillMode = "forwards", oAnimationFillMode = "forwards";
    setTimeout(() => {
        document.getElementById('main-home').style.display = "block";
        document.getElementById('main-type').style.display = "none";
        document.getElementById('main-home').style.display = "block";
        document.getElementById('main-home').style.animation = "appear 0.3s";
    }, 600)
}


function keyboard() {
    pageId = "main-type";
    load();
    document.getElementById('main-type').style.display = "block";
    document.getElementById('main-type').style.animation = "appear 0.3s";
    document.getElementById('keyboard-sidebar').style.display = "block";
    document.title = "Keyboard"
    document.getElementById('main').style.animation = "expand 0.7s";
    document.getElementById('main').style.animationFillMode = "forwards"; document.getElementById(pageId).style.mozAnimationFillMode = "forwards", msAnimationFillMode = "forwards", oAnimationFillMode = "forwards";
}

function load() {
    document.getElementById('main-home').style.display = "none";
    document.getElementById('home-sidebar').style.display = "none";
}

function unload() {
    document.getElementById('main-home').style.display = "block";
    document.getElementById('home-sidebar').style.display = "block";
}

// this one is jut to wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    const themeStylesheet = document.getElementById('theme');
    //    const faviconTheme = document.getElementById('favicon');
    const storedTheme = localStorage.getItem('theme');
    //    const storedFavicon = localStorage.getItem('favicon');
    if (storedTheme) {
        themeStylesheet.href = storedTheme;
    }
    //    if(storedFavicon){
    //       faviconTheme.href = storedFavicon;
    //    }
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        if (themeStylesheet.href.includes('light')) {
            themeStylesheet.href = 'dark.css';
            //            faviconTheme.href = 'favicon/dark.svg';
        }
        else {
            themeStylesheet.href = 'light.css';
            //            faviconTheme.href = 'favicon/light.svg';
        }
        localStorage.setItem('theme', themeStylesheet.href)
        //        localStorage.setItem('favicon',faviconTheme.href)
    })
})

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.noFirstVisit) {
        document.getElementById('logo').style.display = "block";
        document.getElementById('home-box').style.animation = "home-box 4s";
        localStorage.noFirstVisit = "1";
    }
})

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
    document.querySelector("link[rel='icon']").href = "images/favicon/pixil-frame-0.png";
} else {
    document.querySelector("link[rel='icon']").href = "images/favicon/pixil-frame-1.png";
}