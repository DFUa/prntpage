$(document).ready(function() {

  $(document).on('click', function(e) {
    let container = $('.small-profile'),
      element = $('.close-outside');
    if (!container.is(e.target) && container.has(e.target).length === 0 && element.hasClass('animated')) {
      element
        .addClass('zoomOut')
        .one('animationend', function() {
          // console.log('finish')
          $(this).removeClass('animated zoomOut').hide()
        })
    }
  });

  $('.small-profile').on('click', function() {
    $(this).find('.small-profile-dropdown').removeClass('zoomOut').addClass('animated zoomIn').show()
  });

  // this function check when element is in view and add animation class name,
  // should be removed before/after using some framework
  // Animation should have only one class of animation

  function checkIfInView() {
    let windowBottomPosition = ($(window).scrollTop() + $(window).height());

    $.each($('[class*="animated-"]'), function() {
      let elementTopPosition = $(this).offset().top,
        animationName = $(this).attr('class').match(/(\banimated-\S+\b)/ig)[0].split('-')[1],
        elementBottomPosition = (elementTopPosition + $(this).outerHeight());

      if ((elementBottomPosition >= $(window).scrollTop()) && (elementTopPosition <= windowBottomPosition)) {
        $(this).addClass('animated ' + animationName);
      }
    });
  }

  $(window).on('scroll resize', checkIfInView);
  $(window).trigger('scroll');

  // this script just 4 showing anim. Can be remove before/after using some framework
  $('.header-nav li a, .page-tab-list li a, .message-tab-content li a, .vertical-tab li a').on('click', function(e) {
    if ($(this).attr('href') == '#') {
      e.preventDefault()
    }

    $(this).parents('ul').find('li').removeClass('active');
    $(this).parent('li').addClass('active')
  });

  $('.header-nav li').each(function(index, el) {
    $(el).css('animation-delay', '.' + index + 's')
  });

  $('.page-tab-list li').each(function(index, el) {
    $(el).css('animation-delay', '.' + index + 's')
  });

  $('.page-tab-list').addClass('animEnd');

  //custom scroll and tabs
  if($('.horizontal-tab-wrap').length){
    var customScroll = new SimpleBar(document.querySelector('.horizontal-tab-wrap'))
  }

  $('ul.tab li a').on('click', function(e) {
    e.preventDefault();
    let tabId = $(this).attr('data-tab');

    $(this).parent('li').siblings().removeClass('active');
    $('#' + tabId).siblings('.tab-content').removeClass('active animated fadeIn');

    $(this).parent('li').addClass('active');
    $('#' + tabId).addClass('active animated fadeIn');
    customScroll.recalculate()
  });
});
