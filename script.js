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
        document.getElementById('home-box').style.animation = "home-box 3.6s";
        localStorage.noFirstVisit = "1";
    }
})

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
    document.querySelector("link[rel='icon']").href = "images/favicon/pixil-frame-0.png";
} else {
    document.querySelector("link[rel='icon']").href = "images/favicon/pixil-frame-1.png";
}


// document.addEventListener('DOMContentLoaded', () => {
//     const storedAvatar = localStorage.getItem('avatar');
//     if (storedAvatar) {
//         document.getElementById('avatar').style = "display: none";
//     };
//     localStorage.setItem('avatar')
// })