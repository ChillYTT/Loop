const $ = (id) => {
    return document.getElementById(id)
}

const $c = (className) => {
    return document.getElementsByClassName(className)
}

const $qsa = (query) => {
    return document.querySelectorAll(query)
}

const $n = (name) => {
    return document.getElementsByName(name)
}

const mk = (type) => {
    return document.createElement(type)
}

const mkHtml = (code) => { // Unsafe, only use with trusted input.
    document.body.innerHTML += code
}

var getUrl = window.location;
var baseUrl = getUrl.host;
if (baseUrl.includes("github")) {
    document.getElementById('login').style = "display: none;"
} else if (baseUrl.includes('localhost')) {
    baseUrl = 'loop-beta.vercel.app'
}


window.addEventListener(
    'keydown',
    function(e) {
        if (e.key == '`') {
            window.open(
                this.localStorage.getItem("website"),
                '_blank',
            )
        }
    },
    false
)



if (scrollButton) {
    // When the user scrolls down 20px from the top of the document, show the button
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
            scrollButton.style.display = 'block'
        } else {
            scrollButton.style.display = 'none'
        }
    })
}

if (localStorage.getItem("website") == null) {
    localStorage.setItem("website", "https://classroom.google.com/")
}

if (localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", "light")
}

if (localStorage.getItem("disguise") == null) {
    localStorage.setItem("disguise", "none")
} else {
    const favicon = document.querySelector('[rel=icon]')
    const title = document.querySelector('title')
    if (localStorage.getItem("disguise") == "gc") {
        title.innerHTML = "Google Classroom"
        favicon.href = "./assets/images/disguises/gcicon.png"
    } else if (localStorage.getItem("disguise") == "gd") {
        title.innerHTML = "Google Docs"
        favicon.href = "./assets/images/disguises/gdicon.png"
    } else if (localStorage.getItem("disguise") == "canvas") {
        title.innerHTML = "Dashboard"
        favicon.href = "./assets/images/disguises/canvasicon.jpg"
    }
}

document.body.setAttribute("theme", localStorage.getItem("theme"))
document.getElementById('settings').children[0].src = `/assets/images/settings-${localStorage.getItem("theme")}.svg`




var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
if (typeof screen.orientation !== 'undefined' || isMac) {
    //not mobile
} else {
    //mobile
    window.open("/mobile/index.html", "_self")
}

function uid() {
    return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
};

function updateLiveViews() {
    if (localStorage.getItem('liveUID') == null) {
        localStorage.setItem('liveUID', uid());
    }
    fetch(`./assets/php/liveviews.php?uid=${localStorage.getItem('liveUID')}&leave=0`);

    let second = 1000
    let minute = 60 * second
        //setTimeout(updateLiveViews, minute);
}

function userExitLiveViews() {
    if (localStorage.getItem('liveUID') == null) {
        return;
    }
    fetch(`./assets/php/liveviews.php?uid=${localStorage.getItem('liveUID')}&leave=1`);

    let second = 1000
    let minute = 60 * second
        //setTimeout(updateLiveViews, minute);
}


window.addEventListener("beforeunload", function(event) {
    //userExitLiveViews();
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = '';
});

updateLiveViews();

// register service worker
window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js");
    }
});
