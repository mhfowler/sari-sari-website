
var today = new Date(); //today date
var calendar = 'nowherekitchen@gmail.com'
var apiKey = 'AIzaSyB8QPPR3rH-xXQVDC-JLb7WtMl8QyHXId8'
var calendarURL = `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events`
console.log(calendarURL);

$(document).ready(function() {
    $.ajax({
      dataType: 'json',
      url: calendarURL,
      data: {
            timeMin: today.toISOString(),
            key: apiKey,
            singleEvents: true,
            orderBy: 'startTime',
            maxResults: 25,
      },
      success: function(data) {
        console.log('succccess');
        console.log(data);
        var eventWrapper = $(".events-wrapper")
        var items = data['items'];
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          var title = item['summary']
          var startTimeString = item['start']['dateTime']
          if (!startTimeString) {
            startTimeString = item['start']['date']
          }
          var mDate = moment(startTimeString);
          var printTimeString = mDate.format('dddd DD MMM @H:mm');
          var description = item['description']
          var regex = /public/;
          var result = regex.test(description);
          if (result) {
            console.log(item['id'])
            var linkRegex = /link:(.*)/
            var linkResult = linkRegex.test(description)
            var link = ''
            if (linkResult) {
                var match = linkRegex.exec(description)
                link = match[1]
                var hrefRegex = /<a href="(.*)".*/
                var hrefMatch = hrefRegex.exec(link)
                if (hrefMatch) {
                  link = hrefMatch[1]
                }
                var html = `<div><a class="event-link" href="${link}"><span class="event-title">${title}, </span> <span class="event-time">${printTimeString}</span></a></div>`
            }
            else {
              var html = `<div><span class="event-title">${title}, </span> <span class="event-time">${printTimeString}</span></div>`
            }
            eventWrapper.append(html);
          }
        }
      }
    });
    var randColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    $(".hero-image").css('background-color', randColor);
    setInterval(function(){
        var randColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        $(".hero-image").css('background-color', randColor);
      }, 5000);
});