$(document).ready(function() {
    $(".set > a").on("click", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this)
          .siblings(".content")
          .slideUp(200);
        $(".set > a i")
          .removeClass("fa-minus-circle")
          .addClass("fa-plus-circle");
      } else {
        $(".set > a i")
          .removeClass("fa-minus-circle")
          .addClass("fa-plus-circle");
        $(this)
          .find("i")
          .removeClass("fa-plus-circle")
          .addClass("fa-minus-circle");
        $(".set > a").removeClass("active");
        $(this).addClass("active");
        $(".content").slideUp(200);
        $(this)
          .siblings(".content")
          .slideDown(200);
      }
    });
  });
  