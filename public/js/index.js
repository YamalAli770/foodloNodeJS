// Owl Carousel

    $('.owl-carousel').owlCarousel({
loop:true,
margin:10,
nav:true,
navSize:50,
dots:false,
autoplay:true,
autoplayTimeout:3000,
responsive:{
    0:{
        items:1
    },
    600:{
        items:3
    },
    1000:{
        items:4
    }
}
})


// Add Map to webpage
mapboxgl.accessToken = 'pk.eyJ1IjoiYmVzaWRhczc0MyIsImEiOiJjbDQxZGNyMmkwbm8zM2JwNnNya3hqOWhzIn0.C2IvyjYkg9V4zyOq2XmL8Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [67.0971, 24.9180], 
    zoom: 12
});

// Add controls to map 
map.addControl(new mapboxgl.NavigationControl());

// Add marker to map
const marker1 = new mapboxgl.Marker({color:'black'})
    .setLngLat([67.0971, 24.9180])
    .addTo(map);

// back To top Button
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top")

const scrollContainer = () => {
    return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
    if (scrollContainer().scrollTop > showOnPx) {
        backToTopButton.classList.remove("hidden")
    } else {
        backToTopButton.classList.add("hidden")
    }
})

const goToTop = () => {
    document.body.scrollIntoView({behavior:"smooth"});
};

backToTopButton.addEventListener("click", goToTop);

// Hamburger JS

const openBtn = document.querySelector('.open-btn');
const sidebar = document.querySelector('.sidebar');

openBtn.addEventListener('click', () => {
    sidebar.classList.add("show-sidebar");
})

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove("show-sidebar");
})