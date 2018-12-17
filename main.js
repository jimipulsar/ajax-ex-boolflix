$(document).ready(function() {
  var date = moment('2018-01-01');
  printList(date);
  addHolidays(date);

  $('#next').click(function() {
    date = date.add(1, 'months');
    printList(date);
    addHolidays(date);
  });

  $('#prev').click(function() {
    date = date.subtract(1, 'months');
    printList(date);
    addHolidays(date);

});

function printList(date) {

  $('.wrapper h1').text(date.format('MMMM YYYY'));
  var daysInMonth = date.daysInMonth();
// resettiamo il contenuto dell'ul
  $('.wrapper ul').html('');

  for (var i = 1; i < daysInMonth; i++) {
    var liTemplate = $('.templates li').clone();
    var liData = date.format('YYYY-MM') + i;
    liTemplate.attr('data-original-date', liData);
    liTemplate.text(i + ' ' + date.format('MMM'));
    $('.wrapper ul').append(liTemplate);
  }
}
});

function addHolidays(date) {
  $.ajax({
    url:'https://holidayapi.com/v1/holidays',
    method: 'GET',
    data: {
      key: '667b8556-ef24-4faf-afac-8fdbc9acd97c',
      country: 'IT',
      month: date.format('MM'),
      year: date.format('YYYY')
    },
    success: function(data) {
      var holidays = data.holidays;

      $('ul li').each(function () {
        var thisDate = $(this).attr('data-original-date');
        thisDate = moment(thisDate, 'YYYY-MM-D');

        for (var i = 0; i < holidays.length; i++) {
          var holiday = holidays[i];
          console.log(holiday);
           var holidayDate = moment(holiday.date);

          if(holidayDate.isSame(thisDate, 'day')) {
            $(this).addClass('active');
            $(this).append(' - ' + holiday.name);
          }
        }
      });
    },
    error: function(data){
      alert("Si è verificato un'errore");
    }
  });
}

