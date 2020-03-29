$(document).ready(function() {
  $(".bootstrap-select").selectpicker();
});

$(".slider-cards").slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  // centerMode: true,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

$(".slider-partners").slick({
  dots: true,
  infinite: false,
  arrows: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: true
});

// $(document).ready(function() {
//   $('#dropdown-service').on('click', function(e) {
//     $('#navbarSupportedContent').removeClass('collapse show');
//     $('#navbarSupportedContent').addClass('collapse');
//     document
//       .querySelector('#menu-mobile')
//       .setAttribute('aria-expanded', 'false');
//   });
// });
