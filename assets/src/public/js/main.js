$(document).ready(function() {
    $('.banner_main').owlCarousel({
        items: 1,
        loop: true,
        height: 405,
        dots: false,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 500,
        autoplayHoverPause: true
    });
    $('.list_product--hot').owlCarousel({
        items: 5,
        responsive: {
            1320: {
                items: 5
            },
            960: {
                items: 4
            },
            720: {
                items: 2
            },
            540: {
                items: 1
            }
        },
        loop: true,
        height: 405,
        dots: false,
        margin: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 500,
        autoplayHoverPause: true
    });
});