$(document).ready(function(){var e=moment.utc().startOf("day").toISOString(),t=contentful.createClient({space:"c4pc44y0tzlj",accessToken:"rX-3UlhYdX5aTCXlWpOnNqJ1btlTX9gnAfJPkqlAxBQ"});(1<$(".bg-carousel").length&&setInterval(function(){var e=$(".bg-carousel.m-visible"),t=e.is(".bg-carousel:last")?$(".bg-carousel").eq(0):e.next();e.removeClass("m-visible"),t.addClass("m-visible")},6500),$(".header .fa-bars").click(function(){$("#overlay").addClass("m-active"),$(".header nav ul").addClass("active")}),$("#overlay").click(function(){$(this).removeClass("m-active"),$(".header nav ul").removeClass("active")}),$(".tour-dates").length)&&t.getEntries({content_type:"tour",order:"fields.datetime","fields.datetime[gte]":e,limit:50}).then(function(e){e.items.forEach(function(e){var t=e.fields,a=$("<tr/>"),n=$("<a/>").attr("target","_blank");t.link&&(-1<t.link.indexOf("//")?n.attr("href",t.link):n.attr("href","//"+t.link)),n.append("BUY"),a.append($("<td/>").addClass("date").text(moment.utc(t.datetime).format("MM/DD/YYYY"))),a.append($("<td/>").addClass("time").text(moment.utc(t.datetime).format("h:mm A"))),a.append($("<td/>").addClass("tour").text(t.tour)),a.append($("<td/>").addClass("venue").text(t.venue)),a.append($("<td/>").addClass("location").text(t.location)),a.append($("<td/>").addClass("link").append(n)),$(".tour-dates tbody").append(a)})});$(".b-upcoming-show").length&&t.getEntries({content_type:"tour",order:"fields.datetime","fields.datetime[gte]":e,limit:100}).then(function(e){var n=[];e.items.forEach(function(e){var t=e.fields,a="";a+=moment.utc(t.datetime).format("MMM Do")+" ",a+=moment.utc(t.datetime).format("h:mm A")+" | ",a+=t.venue+" - ",a+=t.location,n.push({link:t.link,txt:a})}),$a=$(".b-upcoming-show a");var a=n.length,d=-1;!function e(){if(0!=a){++d>=a&&(d=0);var t=n[d];t.link&&(-1<t.link.indexOf("//")?$a.attr("href",t.link):$a.attr("href","//"+t.link)),$a.html((0===d?"next show: ":"upcoming show: ")+t.txt),$a.removeClass("fade"),setTimeout(function(){$a.addClass("fade"),setTimeout(e,330)},4850)}}()});$(".press").length&&t.getEntries({content_type:"press",order:"-fields.date",limit:50}).then(function(e){e.items.forEach(function(e){var t=e.fields,a=$("<li/>").addClass("press-item"),n=$("<div/>").addClass("press-media m-text"),d=$("<div/>").addClass("press-content"),s=$("<div/>").addClass("press-meta"),i=$("<a/>").attr("target","_blank");t.link&&(-1<t.link.indexOf("//")?i.attr("href",t.link):i.attr("href","//"+t.link)),s.append($("<span/>").addClass("press-publisher").text(t.publisher)),s.append($("<span/>").addClass("press-date").text(moment.utc(t.date).format("MM/DD/YYYY"))),d.append($("<div>").addClass("press-title").text(t.title)),d.append(s),"article"==t.type?n.append($("<i/>").addClass("fa fa-file-text-o")):"video"==t.type?n.append($("<i/>").addClass("fa fa-video-camera")):"audio"==t.type&&n.append($("<i/>").addClass("fa fa-volume-up")),$(".press").append(a.append(i.append(n).append(d)))})})});