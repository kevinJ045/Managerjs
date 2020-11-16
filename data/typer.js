// DO NOT USE THIS JAVASCRiPT FiLE, IT IS JUST FOR THE DEMO
// DO NOT USE THIS JAVASCRiPT FiLE, IT IS JUST FOR THE DEMO
// DO NOT USE THIS JAVASCRiPT FiLE, IT IS JUST FOR THE DEMO
// DO NOT USE THIS JAVASCRiPT FiLE, IT IS JUST FOR THE DEMO
// DO NOT USE THIS JAVASCRiPT FiLE, IT IS JUST FOR THE DEMO
// DO NOT USE THIS JAVASCRiPT FiLE, IT IS JUST FOR THE DEMO

$('[data-type]').each(function(){
  var $ths = $(this),
      $txt = $ths.data('type'),i = 0;
      $ths.html('');

  function typeWriter(){
    var thatTXT = getRealText($txt.charAt(i));

    function getRealText(text){
      switch(text){
        case '^':
          return '\n';
        default:
          return text
      }
    }

    if (i < $txt.length) {
      $ths.append(thatTXT);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  typeWriter();
});