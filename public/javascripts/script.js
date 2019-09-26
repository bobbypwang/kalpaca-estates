$(".list ul li").hover(
  function () {
    $(this).addClass('hover');
  },
  function () {
    $(this).removeClass('hover');
  }
);

$( function() {
  $( ".datePicker" ).datepicker();
} );

$(document).ready(function() {
  Sortable.init();
  userList = document.querySelector('#userList');
  userList.addEventListener('Sortable.sorted'), console.log('userList was sorted!');
});