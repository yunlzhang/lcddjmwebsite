'use strict';
!function($) {
  /**
   * @param {?} n
   * @return {undefined}
   */
  $.fn.lbyl = function(n) {
    var options = $.extend({
      content : "",
      speed : 10,
      type : "fade",
      fadeSpeed : 500,
      finished : function() {
      },
      hovertreeColors : ["deeppink", "red", "green"]
    }, n);
    var $target = $(this);
    /** @type {!Array} */
    var s = [];
    var m = options.content;
    $(this).length;
    $target.empty();
    $target.attr("data-time", m.length * options.speed);
    var caveWidth = options.hovertreeColors.length;
    /** @type {number} */
    var ii = 0;
    for (; ii < m.length; ii++) {
      s.push(m[ii]);
    }
    $.each(s, function(index, n) {
      $target.append('<span style="display: none;color:' + options.hovertreeColors[Math.floor(Math.random() * caveWidth)] + '">' + n + "</span>");
      setTimeout(function() {
        if ("show" == options.type) {
          $target.find("span:eq(" + index + ")").show();
        } else {
          if ("fade" == options.type) {
            $target.find("span:eq(" + index + ")").fadeIn(options.fadeSpeed);
          }
        }
      }, index * options.speed);
    });
    setTimeout(function() {
      options.finished();
    }, m.length * options.speed);
  };
}(jQuery);
