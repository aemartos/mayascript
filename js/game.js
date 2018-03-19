
// Function: Show/hide the game sidebar onclick
var side = $(".side");
var sidebar2 = $(".glyphs_column");
var arrow = $(".arroww");
var inst = $('[data-remodal-id=modal]').remodal();

side.on('click', function(ev) {
  sidebar2.toggleClass('invisible');
  arrow.toggleClass('with');
})

let symbol;
let SYL_NUMBER = data_syl_game.length;
let NUM_NUMBER = data_num_game.length;
let N = SYL_NUMBER + NUM_NUMBER;
let currentAnswer = new Array(N);
// Function: Drag & Drop jQuery
$( function() {
    $( ".draggable" ).draggable({ helper: "clone",  
      start: function() {
        // Hide menu when start dragging
        sidebar2.toggleClass('invisible');
        arrow.toggleClass('with');
      }
    });
    $(".droppable").droppable({
      drop: function( event, ui ) {
        // sidebar2.toggleClass('invisible');
        // arrow.toggleClass('with');
        let dataInd = $( this ).attr('data-index');
        let target = event.toElement;
        let classes = target.classList;
        let syl = classes.item(2); 
        let isCorrect = false;
        let correctSym = symbol[isNumber ? "numbers":"syllables"][dataInd];
           isCorrect = correctSym === syl;
           if (isCorrect) {
            let content = '<div class="'+syl+'">'+data_syl[syl]+'</div>';
            $( this ).addClass( "green" );
            $(this).html(content);
            currentAnswer[currentNumber][dataInd] = true;
            if (currentAnswer[currentNumber].indexOf(false) === -1) {
               // WIN
              let won = checkAll();
              console.log(won)
              if (!won) {
                $('#modalContent').html(symbol.modalInfo);
              } else {
                $('#modalContent').html("Has acabado todo!");
                $('.modalHeader').html("Has acabado todo!")
              }
              setTimeout(function(){
                inst.open();
                randomGenerator();
              }, 750);
              
            }
          } else {
            $( this ).addClass( "red" );
            setTimeout(function() {
              $( this ).removeClass( "red" );
            }.bind(this), 1000);
            return;
          }

      }
    });
  });

// Generar slide
let isNumber = false;
let currentNumber = -1;

let arr = Array.apply(null, {length: N}).map(Function.call, Number);
// [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleArray(arr);


function randomGenerator(backwards){
  if (backwards) {
    currentNumber--;
    if (currentNumber === -1) {
      currentNumber = N-1;
    }
  } else {
    currentNumber++;
    if (currentNumber === N) {
      currentNumber = 0;
    }
  }

  let ran = arr[currentNumber];
  isNumber = ran > (SYL_NUMBER - 1);


  $( '.droppable' ).removeClass( "green" );
  $( '.droppable' ).removeClass( "red" );
  $( '.droppable' ).html( "" );
  $('.droppable').removeClass('completed')
  let allCorrect = true;

  if (isNumber) {

    symbol = data_num_game[ran - SYL_NUMBER];

    $('.glyph_box').css('display','none');
    $('.number_box').css('display','grid');
    $('.game_main_box').css('display','none');
    $('.game_number_box').css('display','grid');
    if (!currentAnswer[currentNumber]) {
      currentAnswer[currentNumber]=[false,false,false,false];
    } 
    
    for (let i = 0; i< symbol.numbers.length; i++) {
      $('.n_box0'+(i+1)).html('<div class="'+symbol.numbers[i]+'">'+data_syl[symbol.numbers[i]]+'</div>');
      if (currentAnswer[currentNumber][i]) {
        $('.number_box0'+(i+1)).html('<div class="'+symbol.numbers[i]+'">'+data_syl[symbol.numbers[i]]+'</div>');
      }
      if (symbol.numbers[i]=== "") {
        currentAnswer[currentNumber][i] = true;
      }
      if (!currentAnswer[currentNumber][i]){
        allCorrect = false;
      }
    }

  } else {
    symbol = data_syl_game[ran];
    $('.glyph_box').css('display','grid');
    $('.number_box').css('display','none');
    $('.game_main_box').css('display','grid');
    $('.game_number_box').css('display','none');
    let boxes = [2, 4, 5, 6, 8];
    if (!currentAnswer[currentNumber]) {
      currentAnswer[currentNumber]=[false,false,false,false,false];
    }
    
    
    for (let i = 0; i< symbol.syllables.length; i++) {
      $('.glyph_box0'+(boxes[i])).html('<div class="'+symbol.syllables[i]+'">'+data_syl[symbol.syllables[i]]+'</div>');
      if (currentAnswer[currentNumber][i]) {
        $('.box0'+(boxes[i])).html('<div class="'+symbol.syllables[i]+'">'+data_syl[symbol.syllables[i]]+'</div>');
      }
      if (symbol.syllables[i]=== "") {
        currentAnswer[currentNumber][i] = true;
      }
      if (!currentAnswer[currentNumber][i]){
        allCorrect = false;
      }
    }
    
  }
  if (allCorrect) {
      $('.droppable').addClass('completed')
  }

  $( '.glyph_title').html(symbol.spanish || "");
  $( '.glyph_mayan').html(symbol.mayan ||  "");
  $( '.glyph_trans_num').html(isNumber ? symbol.num : symbol.transcription);
  $( '.glyph_description').html(symbol.description || "");

}
randomGenerator();

$('#arrow_left').click(function(e){
    randomGenerator(true);
});

$('#arrow_right').click(function(e){
    randomGenerator();
});

function checkAll() {
  console.log(currentAnswer)
  for (let i = 0; i< currentAnswer.length; i++) {
    console.log(currentAnswer[i])
    if (currentAnswer[i]) {
      for (let j = 0; j < currentAnswer[i].length; j++) {
          if (!currentAnswer[i][j]) {
            return false;
          }
      }
    } else {
      return false;
    }
  }
  return true;
}
