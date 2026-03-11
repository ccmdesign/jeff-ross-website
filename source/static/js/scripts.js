$(document).ready(function() {
  var today = moment.utc().startOf('day').toISOString();

  // 
  // Contentful connection.
  // The secrets gives read-only access.
  //
  var contentfulClient = contentful.createClient({
    space: "c4pc44y0tzlj",
    accessToken: "rX-3UlhYdX5aTCXlWpOnNqJ1btlTX9gnAfJPkqlAxBQ",
  });

  // Others.
  if ($('.bg-carousel').length > 1) {
    setInterval(function() {
      var curr = $('.bg-carousel.m-visible'),
        next = curr.is('.bg-carousel:last') ? $('.bg-carousel').eq(0) : curr.next();

      curr.removeClass('m-visible');
      next.addClass('m-visible');
    }, 6500);
  }

  //
  // Pages.
  //

  $('.header .fa-bars').click(function() {
    $('#overlay').addClass('m-active');

    $('.header nav ul').addClass('active');
  });

  $('#overlay').click(function() {
    $(this).removeClass('m-active');
    $('.header nav ul').removeClass('active');
  });

  // Page - Tour Dates
  if ($('.tour-dates').length) {
    var toursPromise = contentfulClient.getEntries({
      content_type: 'tour',
      // order: 'fields.datetime',
      // 'fields.datetime[gte]': today,
      limit: 50,
    });
    
    toursPromise.then(function (results) {
      results.items.forEach(function (data) {
        var obj = data.fields,
          $tr = $('<tr/>'),
          $a = $('<a/>').attr('target', '_blank');

        if (obj.link) {
          if (obj.link.indexOf('//') > -1) {
            $a.attr('href', obj.link);

          } else {
            $a.attr('href', '//' + obj.link);
          }
        }

        $a.append('BUY');
        $tr.append($('<td/>').addClass('date').text(moment.utc(obj.datetime).format('MM/DD/YYYY')));
        $tr.append($('<td/>').addClass('time').text(moment.utc(obj.datetime).format('h:mm A')));
        $tr.append($('<td/>').addClass('tour').text(obj.tour));
        $tr.append($('<td/>').addClass('venue').text(obj.venue));
        $tr.append($('<td/>').addClass('location').text(obj.location));
        $tr.append($('<td/>').addClass('link').append($a));

        $('.tour-dates tbody').append($tr);
      });
    });
  }

  // Page - Index
  if ($('.b-upcoming-show').length) {
    var toursPromise = contentfulClient.getEntries({
      content_type: 'tour',
      order: 'fields.datetime',
      'fields.datetime[gte]': today,
      limit: 100,
    });
    
    toursPromise.then(function (results) {
      var tours = [];
      results.items.forEach(function (data) {
        var obj = data.fields,
          txt = '';

        txt += moment.utc(obj.datetime).format('MMM Do') + ' ';
        txt += moment.utc(obj.datetime).format('h:mm A') + ' | ';
        txt += obj.venue + ' - ';
        txt += obj.location;
        tours.push({ link: obj.link, txt: txt });
      });
      $a = $('.b-upcoming-show a');
      var toursAmount = tours.length
      var currentTour = -1
      function rotateTour () {
        if (toursAmount == 0) {
          return;
        } else if (++currentTour >= toursAmount) {
          currentTour = 0
        }
        var obj = tours[currentTour]
        if (obj.link) {
          if (obj.link.indexOf('//') > -1) {
            $a.attr('href', obj.link);
          } else {
            $a.attr('href', '//' + obj.link);
          }
        }
        $a.html((currentTour === 0 ? 'next show: ' : 'upcoming show: ') + obj.txt);
        $a.removeClass('fade');
        setTimeout(function () {
          $a.addClass('fade')
          setTimeout(rotateTour, 330)
        }, 4850)
      }
      rotateTour();
    });
  }

  // Page - Base
  if ($('.press').length) {
    var pressPromise = contentfulClient.getEntries({
      content_type: 'press',
      order: '-fields.date',
      limit: 50,
    });

    pressPromise.then(function (results) {
      results.items.forEach(function (data) {
        var obj = data.fields,
          $li = $('<li/>').addClass('press-item'),
          $d1 = $('<div/>').addClass('press-media m-text'),
          $d2 = $('<div/>').addClass('press-content'),
          $d3 = $('<div/>').addClass('press-meta'),
          $a = $('<a/>').attr('target', '_blank');

        if (obj.link) {
          if (obj.link.indexOf('//') > -1) {
            $a.attr('href', obj.link);

          } else {
            $a.attr('href', '//' + obj.link);
          }
        }

        $d3.append($('<span/>').addClass('press-publisher').text(obj.publisher));
        $d3.append($('<span/>').addClass('press-date').text(moment.utc(obj.date).format('MM/DD/YYYY')));
        $d2.append($('<div>').addClass('press-title').text(obj.title));
        $d2.append($d3);

        if (obj.type == 'article') {
          $d1.append($('<i/>').addClass('fa fa-file-text-o'));

        } else if (obj.type == 'video') {
          $d1.append($('<i/>').addClass('fa fa-video-camera'));

        } else if (obj.type == 'audio') {
          $d1.append($('<i/>').addClass('fa fa-volume-up'));
        }

        $('.press').append($li.append($a.append($d1).append($d2)));
      });
    });
  }

    // Banner
  if ($('#banner').length) {
    var bannerPromise = contentfulClient.getEntries({
      content_type: 'banner',
      order: '-sys.updatedAt',
      limit: 1,
    });
    
    $banner = $('#banner')
    bannerPromise.then(function (results) {
      if (results.items.length > 0) {
        var banner = {
          title: results.items[0].fields.title,
          bannerColor: results.items[0].fields.bannerColor.toLowerCase(),
        }

        $banner.attr('data-bg-color', banner.bannerColor)
        $banner.text(banner.title)
      }
      else {
        $banner.hide()
      }
    });
  }
});