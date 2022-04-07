// this one is jut to wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    const themeStylesheet = document.getElementById('theme');
    const faviconTheme = document.getElementById('favicon');
    const storedTheme = localStorage.getItem('theme');
    const storedFavicon = localStorage.getItem('favicon');
    if(storedTheme){
        themeStylesheet.href = storedTheme;
    }
    if(storedFavicon){
       faviconTheme.href = storedFavicon;
  }
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        if(themeStylesheet.href.includes('light')){
            themeStylesheet.href = 'dark.css';
            faviconTheme.href = 'favicon/dark.svg';
        } else {
            themeStylesheet.href = 'light.css';
            faviconTheme.href = 'favicon/light.svg';
        }
        localStorage.setItem('theme',themeStylesheet.href)
        localStorage.setItem('favicon',faviconTheme.href)
    })
})

matcher = window.matchMedia('(prefers-color-scheme: dark)');
matcher.addListener(onUpdate);
onUpdate();