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
  searching_string = $(this).val().toLowerCase();
  if(searching_string == '') { output_word.text(''); }
  output_word.text('');
  for (var i = 0; i < mayanWords.length; i++) {
      if (searching_string == mayanWords[i].spanish && searching_string != '') {
        if(mayanWords[i].mayan.includes(',')) {
          output_word.text(mayanWords[i].mayan.split(',')[0]);
        } else {
          output_word.text(mayanWords[i].mayan);
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

// Function: Show/hide the sidebar onclick
var dropdown = $(".dropdown");
var sidebar = $(".sidebar_content");
var span_angel_left = $("span.fa.fa-angle-left")
var main_content = $(".main_content");
dropdown.on('click', function(ev) {
  main_content.toggleClass('with_sidebar');
  sidebar.toggleClass('invisible_sidebar');
  span_angel_left.toggleClass('with_sidebar');
})

// Function: Adding code to header
var header = $("header");
var menu_logo = $("<div class='menu_logo'></div>");
//var menu_logo_text = $("<p><span class='logo_icon'>d</span><span class='logo_text'>MayaScript</span></p>");
var menu_opt1 = $("<div class='menu_opt1'></div>");
var menu_op1_text = $("<p><a href='home.html'>Descifrar</a></p>");
var menu_opt2 = $("<div class='menu_opt2'></div>");
var menu_opt2_text = $("<p><a href='game.html'>Construir</a></p>");
var menu_opt3 = $("<div class='menu_opt3'></div>");
var menu_opt3_text = $("<p><a href='translator.html'>Investigar</a></p>");
var menu_opt4 = $("<div class='menu_opt4'></div>");
var menu_opt4_text = $("<p><a href='typography.html'>Indigenizar</a></p>");
var menu_language = $("<div class='menu_language'></div>");
var menu_language_opts = $("<p>ESP <span class='fa fa-caret-down'></span> </p>");

header.append(menu_logo);
//menu_logo.append(menu_logo_text);
header.append(menu_opt1);
menu_opt1.append(menu_op1_text);
header.append(menu_opt2);
menu_opt2.append(menu_opt2_text);
header.append(menu_opt3);
menu_opt3.append(menu_opt3_text);
header.append(menu_opt4);
menu_opt4.append(menu_opt4_text);
header.append(menu_language);
menu_language.append(menu_language_opts);


// Function: Adding code to footer
var footer = $('footer');
var footer_content = $("<div class='footer_content'></div>");
var copyright = $("<div class='copyright'></div>");
var copyright_text = $("<p>Copyright</p>");
var social_media = $("<div class='social_media'></div>");
var american_museum = $("<div class='american_museum'></div>");
var logo_am = $("<a href='http://www.mecd.gob.es/museodeamerica/el-museo.html' target='_blank'><img src='img/museoamerica.png' width='128px' height='23px' alt='logo museo america'></a>");

footer.append(footer_content);
footer_content.append(copyright);
copyright.append(copyright_text);
footer_content.append(social_media);
footer_content.append(american_museum);
american_museum.append(logo_am);


var part = $('.main_content_info > div');
var img_path ,img_hover_name;
var img_detail = $('main .sidebar_content .image_detail');
var syllabic = $('main .sidebar_content .syllabic p strong');
var meaning = $('main .sidebar_content .meaning h4');
var description_codex = $('main .sidebar_content .description p');
part.hover(
  function(ev) {
    img_path = $(this).css("background-image").split('/');
    $(this).css('background-image', 'url("./img/c'+ $(img_path).last()[0]);
  },
  function(ev) {
    $(this).css('background-image', img_path.join('/'));
  }
);

// Function lo select a glif from the codice
part.on('click', function(ev) {
  img_detail.css('background-image', $(this).css('background-image'));
  var position = $(this).attr('class');
  var codex_i = position.substr(position.length - 1) - 1;
  console.log(codex[codex_i].pronunciation);
  console.log(syllabic.text());
  syllabic.text(codex[codex_i].pronunciation);
  meaning.text(codex[codex_i].meaning);
  description_codex.text(codex[codex_i].description);
  if(sidebar.hasClass('invisible_sidebar')) {
    sidebar.toggleClass('invisible_sidebar');
    main_content.toggleClass('with_sidebar');
    span_angel_left.toggleClass('with_sidebar');
  }
})


var textarea = $('.typo_textarea');
var typo_open_close = $('.typo_open_close');
var keyboard = $('.keyboard');
typo_open_close.on('click', function(ev) {
  $(this).toggleClass('invisible_keyboard');
  if(!$(this).hasClass('invisible_keyboard')) {
    keyboard.css({'transform': 'translateY(0vh)', 'visibility': 'visible', 'opacity': '100','display':'block', 'transition': 'all 0.5s ease'});
    textarea.parent().css({'height': '50%','transition': 'all 0.5s ease'});
    typo_open_close.children().toggleClass('closed');
  } else {
    textarea.parent().css({'height': '93%', 'transition': 'all 0.5s ease'});
    keyboard.css({'visibility': 'hidden', 'opacity': '0', 'display':'none', 'transition': 'all 0.5s ease'});
    typo_open_close.children().toggleClass('closed');

  }
});

$('.fa-question-circle').on('click', function(ev) {
  var $carousel = $('.owl-carousel');
  $carousel.owlCarousel({
      margin:10,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:1
          },
          1000:{
              items:1
          }
      }

  });
});

$('.remodal').change(function(ev) {
  console.log("HOLA");
  $('.owl-carousel').trigger('refresh.owl.carousel');
});
