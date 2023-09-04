import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

// const swiper = new Swiper('.swiper', {
//   // Optional parameters
//   direction: 'vertical',
//   loop: true,
//
//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   },
//
//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//
//   // And if we need scrollbar
//   scrollbar: {
//     el: '.swiper-scrollbar',
//   },
// });

console.log(123);
var swiper;
swiper = new Swiper('.mySwiper', {
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
