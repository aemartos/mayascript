// Variables
var isFirstTime;
var mayanWords = [];
var spanish_to_mayan = true;

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
    if(spanish_to_mayan) {
      if (searching_string == mayanWords[i].spanish) {
        output_word.text(mayanWords[i].mayan);
      }
    } else {
      if (searching_string == mayanWords[i].mayan) {
        console.log(mayanWords[i].mayan);
        output_word.text(mayanWords[i].spanish);
      }
    }
  }
});

// Function: On click language button
var exchange_button = $('.exchange');
var language_from_label = $('.language_from_label');
var language_to_label = $('.language_to_label');
exchange_button.on('click', function(ev) {
  var from_value = language_from_label.text();
  var to_value = language_to_label.text();
  var resultado_value = output_word.text();
  language_from_label.text(to_value);
  language_to_label.text(from_value);
  input_word.val(resultado_value);
  output_word.text('');
  spanish_to_mayan = !spanish_to_mayan;
  input_word.keyup();
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
