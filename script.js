function keyboard() {
    pageId = "main-type";
    load();
    document.title = "Rosemary | Ellie and Matthias"
    document.getElementById('main').style.animation = "expand 0.7s";
    document.getElementById('main').style.animationFillMode = "forwards"; document.getElementById(pageId).style.mozAnimationFillMode = "forwards", msAnimationFillMode = "forwards", oAnimationFillMode = "forwards";
}

function load() {
    document.getElementById('main-home').style.display = "none";
    document.getElementById('home-sidebar').style.display = "none";
    document.getElementById('main-type').style.display = "block";
    document.getElementById('keyboard-sidebar').style.display = "block";
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