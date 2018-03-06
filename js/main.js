// Variables
var isFirstTime;
var mayanWords = [];

isFirstTime = localStorage.getItem('is_first_time');
// Function: Get data from localstorage
(function getDataLocalStorage() {
  if (isFirstTime === null) {
    localStorage.setItem('json_data', JSON.stringify(data));
    isFirstTime = false;
    localStorage.setItem('is_first_time', JSON.stringify(isFirstTime));
    mayanWords = data;
  } else {
    mayanWords = JSON.parse(localStorage.getItem('json_data'));
  }
})();

// Function: Traductor
var input_word = $('.castellano');
var output_word = $('.resultado');
var searching_string = '';
// Function: To fire the function while the user is writting
input_word.on('keyup', function (ev) {
  searching_string = $(this).val();
  if(searching_string == '') { output_word.text(''); }
  output_word.text('');
  for (var i = 0; i < mayanWords.length; i++) {
    if (searching_string == mayanWords[i].spanish) {
      output_word.text(mayanWords[i].mayan);
    }
  }
});

// Function: Drag & Drop jQuery
$( function() {
    $( "#draggable" ).draggable();
    $( "#droppable" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  } );
