new Swiper('.swiper', {
  slidesPerView: 1,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: '.album__right',
    prevEl: '.album__left',
  },
  pagination: {
    el: '.swiper-pagination',
  },


});
