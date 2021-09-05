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
            0: {
                items: 1
            }
        },
        loop: true,
        dots: false,
        margin: 1,
        autoplay: true,
        autoplayTimeout: 3500,
        smartSpeed: 500,
        autoplayHoverPause: true
    });
    $('.news_container').owlCarousel({
        items: 4,
        responsive: {
            1320: {
                items: 4
            },
            960: {
                items: 3
            },
            720: {
                items: 2
            },
            0: {
                items: 1
            }
        },
        loop: true,
        dots: false,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 3800,
        smartSpeed: 500,
        autoplayHoverPause: true
    });
    $('.partners_slide').owlCarousel({
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
            0: {
                items: 1
            }
        },
        loop: true,
        dots: false,
        margin: 50,
        autoplay: true,
        autoplayTimeout: 3200,
        smartSpeed: 500,
        autoplayHoverPause: true
    });
});