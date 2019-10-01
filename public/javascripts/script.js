$('a.modal-signup').click(function(e) {
  $('.modal.ulogin').addClass('hide');
  $('.modal.uregister').removeClass('hide');
});

$('a.modal-login').click(function(e) {
  $('.modal.uregister').addClass('hide', 'animated', 'fadeOutDown');
  $('.modal.ulogin').removeClass('hide').addClass('animated', 'fadeInTop');
  e.preventDefault();
});

$('.close').click(function (e) {
  $(this).parents('.modal').addClass('hide');
  e.preventDefault();
});

$(window).on('load', function(){
  Sortable.init();
  $(".datePicker").datepicker();

  if ($(".the-estate").length > 0) {
    $('#header').css({
      ' background-image': 'url(/image/kalpaca-estates-page-banner-0012.jpg)'
    });
  }
});

$(window).bind('scroll', function () {
  let windowMenuHeight = window.innerHeight - $('.navigation').height();

  if ($(window).scrollTop() > windowMenuHeight) {
    $('.menu').addClass('fixed');
  } else {
    $('.menu').removeClass('fixed');
  }
});