
//FullScreen

window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


function toggleFullScreen() {

  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
          (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
  } else {
      if (document.cancelFullScreen) {
          document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
      }
  }
}

if (mobileAndTabletcheck()){
  $('.fullscreen_button').hide();

} else {

  $('#fullscreen_button').click(toggleFullScreen);

  if (document.addEventListener) {
      document.addEventListener('webkitfullscreenchange', exitHandler, false);
      document.addEventListener('mozfullscreenchange', exitHandler, false);
      document.addEventListener('fullscreenchange', exitHandler, false);
      document.addEventListener('MSFullscreenChange', exitHandler, false);
  }

  function exitHandler() {
    if (!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement)) {   
      $('#fullscreen_button').show();
    } else {
      $('#fullscreen_button').hide();
    }
  }
}


//Reload

var userInteract = false;

document.addEventListener('mousemove', function(e){
  userInteract = true;
});

document.addEventListener('keydown', function(e){
  userInteract = true;
});

setInterval(function() {
  let loc = (window.location.href.split('/'));
  loc = loc[loc.length -1];
  if (!userInteract && loc !== 'landing.html') {
    refresh();
  }
  userInteract = false;

}, 5 * 60000);

function refresh() {
  window.location.reload(true);
  window.location.href = "landing.html";
}


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
var menu_logo_text = $("<p><span class='logo_icon'>d</span><span class='logo_text'>Maya_Script</span></p>");
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
menu_logo.append(menu_logo_text);
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
var copyright_text = $("<p><span>MayaScript© 2018 •</span><span class='copy_text'>GitHub</span><a href='https://github.com/aemartos/mayascript' target='_blank'><span class='fa fa-github'></span></a></p>");
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
  $('.owl-carousel').trigger('refresh.owl.carousel');
});
