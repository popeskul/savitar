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

$(".search-promo__input").each(function() {
  $(this).data("placeholder", $(this).attr("placeholder"));
});

function changePlaceholder() {
  if ($(window).width() > 990) {
    $(".search-promo__input").attr(
      "placeholder",
      "Введите страну для поиска информации о помощи"
    );
  } else {
    $(".search-promo__input").each(function() {
      $(this).attr("placeholder", "Введите страну для поиска");
    });
  }
}

$(window)
  .resize(changePlaceholder)
  .trigger("resize");

$(function() {
  $("#datetimepicker1").datetimepicker({
    format: "DD-MM-YYYY"
  });

  $("#datetimepicker2").datetimepicker({
    format: "DD-MM-YYYY"
  });

  $("#datetimepicker3").datetimepicker({
    format: "DD-MM-YYYY"
  });

  $("#datetimepicker-birth").datetimepicker({
    format: "DD-MM-YYYY"
  });

  $("#datetimepicker-insurance-case").datetimepicker({
    format: "DD-MM-YYYY"
  });
});
