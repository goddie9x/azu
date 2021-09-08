$(document).ready(function() {
    windowWidth = document.documentElement.clientWidth;
    if (windowWidth > 992) {
        fixedHeader('.header_bottom', 200);
    } else {
        fixedHeader('.header_middle', 200);
    }
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

function fixedHeader(elements, breakpoint, classAdd = "fixed-top", elementDepend) {
    //mdByHT
    if (elements) {
        let breakPoint;
        let ElementDepend;
        if (breakpoint) {
            if (typeof(breakpoint) == "number") {
                breakPoint = breakpoint;
            }
            if (typeof(breakpoint) == "string") {
                breakPoint = $(breakpoint).height();
            }
            if (typeof(elementDepend) == "string") {
                ElementDepend = $(elementDepend).height();
            }
        } else {
            breakPoint = $(elements).height();
        }
        $(document).ready(function() {
            if (typeof(elements) == 'array') {
                elements.forEach(function(element) {
                    $(window).scroll(function() {
                        let scroll = $(window).scrollTop();
                        if (scroll > breakPoint) {
                            $(element).addClass(classAdd);
                        } else {
                            $(element).removeClass(classAdd);
                        }
                    });
                });
            } else {
                $(window).scroll(function() {
                    let scroll = $(window).scrollTop();

                    if (scroll > breakPoint) {
                        $(elements).addClass(classAdd);
                    } else {
                        $(elements).removeClass(classAdd);
                    }
                });
            }
        });
    } else {
        console.error('first argument must be exiting');
    }
}
new WOW().init();