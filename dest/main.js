//lang option

let langCurrent = document.querySelector(".lang__current");
let langOpt = document.querySelector(".lang__option");
let langItem = document.querySelectorAll(".lang__option-item");
let langspan = document.querySelector(".lang__current span")
langCurrent.addEventListener("click", function (e) {
    e.stopPropagation();
    langOpt.classList.toggle("active");
    // console.log(langOpt)
});
langItem.forEach(function (item) {
    item.addEventListener("click", function () {
        langspan.innerHTML = this.textContent;
        this.textContent = langspan.textContent;
        // langOpt.classList.remove("active");
    });
});


// let langCurrent = $('".lang__current"');
// let langOpt = $(".lang__option");
// let langItem = $(".lang__option-item");
// let langspan = $(".lang__current span");
// langCurrent.on('click', function (e) {
//     e.stopPropagation();
//     langOpt.toggle('active');
// });



langOpt.addEventListener('clck', function (e) {
    e.stopPropagation();
})
document.addEventListener('click', function () {
    langOpt.classList.remove('active');
})


let menus = document.querySelectorAll("header .menu li a ");
let heightHeader = document.querySelector('header').offsetHeight;
let sections = [];
function removeActive() {
    menus.forEach(function (item_elenment, item_index) {
        item_elenment.classList.remove('active');
    });
}
menus.forEach(function (item, index) {
    let classname = item.getAttribute('href').replace('#', '');
    let section = document.querySelector("." + classname);
    sections.push(section);
    item.addEventListener("click", function (e) {
        e.preventDefault();
        removeActive();
        item.classList.add('active');
        window.scrollTo({
            top: section.offsetTop - heightHeader + 1,
            behavior: "smooth",
        })

    });
});

window.addEventListener('scroll', function (e) {
    let positionScroll = window.pageYOffset;
    sections.forEach(function (section, index) {
        if (positionScroll > section.offsetTop - heightHeader && positionScroll < section.offsetTop + section.offsetHeight) {
            removeActive();
            menus[index].classList.add('active');
        }
        else {
            menus[index].classList.remove('active');
        }
    });
});

//slider
// let listItemSlider = document.querySelectorAll('.slider__item');
// let currentSlider = 0;
// let number = document.querySelector('.paging .number');
// let dot_li = document.querySelectorAll('.paging .dotnet li');

// function showNumber(index) {
//     number.innerHTML = (index).toString().padStart(2, '0');
// }
// showNumber(currentSlider + 1);
// dot_li[currentSlider].classList.add('is-selected');



// listItemSlider.forEach(function (itemSlider, index) {
//     if (itemSlider.classList.contains('active')) {
//         currentSlider = index;

//     }
// });

let $carousel = $('.slider__item-wrap');
$carousel.flickity({
    //option
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    on: {
        ready: function (index) {
            let dot = $('.flickity-page-dots li');
            let paging = $(' .slider__bottom .dotted');
            dot.appendTo(paging);
        },
        change: function (index) {
            let number = $('.slider__bottom .number');
            let indexPage = index + 1;
            number.text(indexPage.toString().padStart(2, 0))

        }
    }
});


$('.slider__bottom-control .prev').on('click', function () {
    $carousel.flickity('previous');
});
console.log($('.slider__bottom-control .prev'));
$('.slider__bottom-control .next').on('click', function () {
    $carousel.flickity('next');
});
// document.querySelector('.btn.next').addEventListener('click', function () {
//     if (currentSlider < listItemSlider.length - 1) {
//         goTo(currentSlider + 1);
//     }
//     else {
//         goTo(0);
//     }
// });
// document.querySelector('.btn.prev').addEventListener('click', function () {
//     if (currentSlider > 0) {
//         goTo(currentSlider - 1);
//     }
//     else {
//         goTo(listItemSlider.length - 1);
//     }
// });

// dot_li.forEach(function (li, index) {
//     li.addEventListener('click', function () {
//         goTo(index);
//     })
// });

//back to top

let backtotop = document.querySelector('.back-to-top');
backtotop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let positionSectionProduct = document.querySelector('.products').offsetTop;
window.addEventListener('scroll', function () {
    let position = window.pageYOffset
    if (position > positionSectionProduct) {
        backtotop.style.display = 'block';

    } else {
        backtotop.style.display = 'none';
    }
});

//popup-video
let playButton = document.querySelectorAll('.play_button');
let playVideo = document.querySelectorAll('.video__item-img');

let popupVideo = document.querySelector('.popup-video');
let closebutton = document.querySelector('.popup-video .close');
let iframe = document.querySelector('.popup-video iframe')

playVideo.forEach(function (button) {
    button.addEventListener('click', function () {
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + button.getAttribute('data-video-id') + "?autoplay=1");
        popupVideo.style.display = 'flex';
    });
});

closebutton.addEventListener('click', function () {
    popupVideo.style.display = 'none';
    iframe.setAttribute('src', '');
})

document.querySelector('.popup-video').addEventListener('click', function (e) {
    popupVideo.style.display = 'none';
    iframe.setAttribute('src', '');
})


function goTo(index) {
    listItemSlider[currentSlider].classList.remove('active');
    listItemSlider[index].classList.add('active');
    dot_li[currentSlider].classList.remove('is-selected');
    dot_li[index].classList.add('is-selected');
    currentSlider = index
    showNumber(currentSlider + 1);
}
gallery
var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for (var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if (figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if (figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function (el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if (!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }
            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if (index >= 0) {
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};
        if (hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function (index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            },
            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };
        if (fromURL) {
            if (options.galleryPIDs) {
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if (isNaN(options.index)) {
            return;
        }
        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

window.addEventListener('load', function (event) {
    initPhotoSwipeFromDOM('.carousel-img');
})
// $(window).load(function () {
//     initPhotoSwipeFromDOM('.carousel-img');
// });

//new

let tagText = document.querySelectorAll('.new__tags-text .tag');
let tagList = document.querySelectorAll('.new__list');

console.log(tagText);
tagText.forEach(function (items, index) {
    items.addEventListener('click', function () {
        let tagID = index + 1;
        console.log(tagID);
        tagText.forEach(function (tag) {
            tag.classList.remove('active');
        });
        tagList.forEach(function (tags) {
            tags.classList.remove('active');
        });
        this.classList.add('active');
        document.querySelector('.new__list' + tagID).classList.add('active');
    });
});

// faq
// let acc = document.querySelectorAll(".accordion");
// let i;

// for (i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function () {
//         let parent = this.classList.toggle("active");
//         let panel = this.nextElementSibling;
//         if (panel.style.maxHeight) {
//             panel.style.maxHeight = null;
//         } else {
//             panel.style.maxHeight = panel.scrollHeight + "px";
//         }

//     });
// }
var action = "click";
var speed = "500";

$(document).ready(function () {
    // Question handler
    $('li.q').on(action, function () {
        // Get next element
        $(this).next()
            .slideToggle(speed)
            // Select all other answers
            .siblings('li.a')
            .slideUp();
    });
});
// $(document).ready(function () {
//     $(document).on('click', '.question__list .accordion', function () {
//         $('.question__list .accordion').not($(this).parent()).remove('active');
//         $('.question__list .accordion .panel').not($(this).next()).slideUp();
//         $(this).next().slideToggle();
//         $(this).parent().toggleClass('active');
//     })
// })

// // //bai 1
// // let a = 4;
// // let b = 12;
// // console.log(a + b);

// // console.log(b % a);

// // console.log(b / a);

// // //bai 2
// // let ho = "nguyen";
// // let ten = "cuong";
// // console.log(ho + ' ' + ten);

// // //bai 3
// // let string = "Happy news year";
// // console.log(string.length);
// // console.log(string.indexOf('y'));
// // console.log(string.lastIndexOf('y'));
// // console.log(string.replace('Happy', 'Hello'));

// // //bai 4
// // let c = 10;
// // if (c % 2 == 0) {
// //     c = true;
// //     console.log(c);
// // }
// // else {
// //     c = false;
// //     console.log(c);
// // }

// // //bai 5

// // let i;
// // let total = 0;
// // for (i = 0; i < 10; i++) {

// //     total += i;
// //     console.log(total);
// // }

// // let bai = "bai 6";
// // console.log(bai);


// // //bai 6
// // let n = 0;
// // while (n <= 20) {
// //     n++;
// //     if (n % 2 == 0) {
// //         console.log(n);
// //     }
// // }

// //bai 7

// // //bai 8
// // let animal = ["ga", "cho", "heo", "bo", "de"];
// // animal.splice(3);
// // console.log(animal);

// // //bai 9
// // function printTime() {
// //     let d = new Date();
// //     let hours = d.getHours();
// //     let mins = d.getMinutes();
// //     let secs = d.getSeconds();
// //     document.body.innerHTML = hours + ":" + mins + ":" + secs;
// // }
// // setInterval(printTime, 1000)

// // bai 10
// // let bai10 = document.querySelector('.baitap a')

// // bai10.addEventListener('click', function (e) {
// //     let gethref = bai10.getAttribute('href');
// //     e.preventDefault();
// //     console.log(gethref);
// // }

// //bai11