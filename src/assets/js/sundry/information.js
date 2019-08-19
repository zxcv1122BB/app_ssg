/**
 * Created by ASUS on 2017/8/30.
 */
(function (root, factory, plug) {
  return factory(root.jQuery, plug)
})(window, function ($, plug) {
  var _init_ = {
    init: function () {
      var $openBox = $('.open-box');
      var $window = $(window);
      var offset = $openBox.offset();
      var headH = $('header').height();
      return {
        $openBox: $openBox,
        $window: $window,
        offset: offset,
        headH: headH
      }
    }
  };
  var aisle = _init_.init()
  var __DEFAULTS__ = {
    eventTrigger: 'click'
  };
  $.fn[plug] = function () {
    var $this = this;
    $.extend($this, __DEFAULTS__, _init_, aisle);
    $this.on($this.eventTrigger, function () {
      if (aisle.$openBox.is(':hidden')) {
        aisle.$openBox.height($('body').height() - aisle.headH).css('top', aisle.headH).slideToggle(500)
      } else {
        aisle.$openBox.stop().slideUp(500);
      }
    });

    $(window).scroll(function () {
      if (aisle.$window.scrollTop() > aisle.offset.top) {
        aisle.$openBox.css({
          'position': 'fixed',
          'top': 0
        })
      } else {
        aisle.$openBox.css({
          'position': 'absolute',
          'top': 5.1 + 'rem'
        })
      }
    });
  }
}, "BBflexBox")
// $(function(){
//   $("#container").css({
//     marginTop:"0"
//   })
// })
