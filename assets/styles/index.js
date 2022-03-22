//fancy scrolling code
let numberOfScans = 1

const isVisible = (element) => {
    const elementBox = element.getBoundingClientRect()
    const distanceFromTop = -100

    if (elementBox.top - window.innerHeight < distanceFromTop) {
        return true
    }
    return false
}

const scanDocument = () => {
    const sectionList = $qsa('.hidden')
    sectionList.forEach((section) => {
        if (isVisible(section)) {
            section.classList.remove('hidden')
            section.classList.add('text-fade')
        }
    })

    numberOfScans++
}

document.addEventListener('scroll', _.throttle(scanDocument, 250))


// featured games slides code
let shouldAutoSwitch = true
let slideIndex = 1
const switchSlide = (n) => {
    const slides = $c('featuredSlide')
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
    }
    slides[slideIndex - 1].style.display = ''
}
const plusSlides = (n) => {
    shouldAutoSwitch = false
    switchSlide((slideIndex += n))
}
const autoPlusSlides = (n) => {
    switchSlide((slideIndex += n))
}
const autoSwitch = () => {
    if (shouldAutoSwitch) {
        setTimeout(() => {
            if (shouldAutoSwitch) {
                autoPlusSlides(1)
                autoSwitch()
            }
        }, 2500)
    }
}

switchSlide(slideIndex)
autoSwitch()

//visits counter code
var getUrl = window.location;
var baseUrl = getUrl.host;

if (baseUrl.includes('github') || baseUrl.includes('localhost')) {
    baseUrl = 'totallyscience.co'
}

const addSuffix = (num) => {
    if (num.endsWith('1')) {
        return num + 'st'
    } else if (num.endsWith('2')) {
        return num + 'nd'
    } else if (num.endsWith('3')) {
        return num + 'rd'
    }
    return num + 'th'
}

fetch(`https://${baseUrl}/assets/php/counter.php`).then((response) => response.text()).then((visits) => {
    const display = document.getElementById('visits-count');

    display.innerText = addSuffix(visits);
});
