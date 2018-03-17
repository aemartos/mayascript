
// Function: Show/hide the game sidebar onclick
var side = $(".side");
var sidebar2 = $(".glyphs_column");
var arrow = $(".arrow")
side.on('click', function(ev) {
  sidebar2.toggleClass('invisible');
  arrow.toggleClass('with');
})



// Function: Drag & Drop jQuery
$( function() {
    $( ".draggable" ).draggable();
    $( ".droppable" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  } );
