import {
    Carousel,
    Fancybox,
    Panzoom
} from '../../vendors/js/fancybox.esm.js';

$(document).ready(function() {
    let windowWidth = document.documentElement.clientWidth;
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
$.fn.toggleText = function(text1, text2) {
    if (this.text() == text1)
        this.text(text2);
    else this.text(text1);
    return;
}
$('.toggle_expander').click(function(e) {
    let currentToggle = $(e.target);
    currentToggle.toggleText('+', '-');
    currentToggle.parent().next().toggleClass('active');
});
$('.filter_icon').click(function(e) {
    $('.products_opts').addClass('active');
});
$('.close_filter').click(function(e) {
    $('.products_opts').removeClass('active');
});
let mainCarouselContainer = document.querySelector("#mainCarousel");
if (mainCarouselContainer) {

    const mainCarousel = new Carousel(mainCarouselContainer, {
        Dots: false,
        slidesPerPage: 1,
        on: {
            createSlide: (carousel, slide) => {
                slide.Panzoom = new Panzoom(slide.$el.querySelector(".panzoom"), {
                    panOnlyZoomed: true,
                    resizeParent: true,
                });
            },
            deleteSlide: (carousel, slide) => {
                if (slide.Panzoom) {
                    slide.Panzoom.destroy();
                    slide.Panzoom = null;
                }
            },
        },
    });

    const thumbCarousel = new Carousel(document.querySelector("#thumbCarousel"), {
        Sync: {
            target: mainCarousel,
        },
        Dots: false,
        click: true,
        center: false,
        infinite: false,
        slidesPerPage: 1,
    });
}