$(function(){
    var $write = $('.typo_textarea textarea'),
        shift = false,
        capslock = false;

    $('#keyboard li').click(function(){
        var $this = $(this),
            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

        // Shift keys
        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
            $('.letter').toggleClass('uppercase');
            $('.symbol span').toggle();

            shift = (shift === true) ? false : true;
            capslock = false;
            return false;
        }

        // Caps lock
        if ($this.hasClass('capslock')) {
            $('.letter').toggleClass('uppercase');
            capslock = true;
            return false;
        }

        // Delete
        if ($this.hasClass('delete')) {
            var html = $write.html();

            $write.html(html.substr(0, html.length - 1));
            return false;
        }

        // Special characters
        if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) character = "\t";
        if ($this.hasClass('return')) character = "\n";

        // Uppercase letter
        if ($this.hasClass('uppercase')) character = character.toUpperCase();

        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.symbol span').toggle();
            if (capslock === false) $('.letter').toggleClass('uppercase');

            shift = false;
        }

        // Add the character
        $write.html($write.html() + character);
    });
});

var open_close = $(".typo_open_close")
var keyboard = $(".typo_keyboard")
var textarea = $(".typo_textarea")
open_close.on('click', function(ev) {
  open_close.toggleClass("closed");
  if(open_close.hasClass("closed")) {
    keyboard.css({
      'height': '0%',
      'transition': 'all 0.25s ease',
      'visibility': 'hidden'
    });
    keyboard.children().css('height', '0%');
    textarea.css('height', '95%');
  } else {
    keyboard.css({
      'height': '45%',
      'transition': 'all 0.25s ease',
      'visibility': 'visible'
    });
    textarea.css({
      'height': '50%',
      'transition': 'all 0.45s ease',
    });
  }
});
