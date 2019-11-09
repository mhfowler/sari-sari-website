
var today = new Date(); //today date
var calendar = 'nowherekitchen@gmail.com'
var apiKey = 'AIzaSyB8QPPR3rH-xXQVDC-JLb7WtMl8QyHXId8'
var calendarURL = `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events`
console.log(calendarURL);

$(document).ready(function() {
    alert('test');
    $.ajax({
      dataType: 'json',
      url: calendarURL,
      data: {
            timeMin: today.toISOString(),
            key: apiKey,
            singleEvents: true,
            orderBy: 'startTime',
            maxResults: 25,
            // sharedExtendedProperty: 'title=Decolonized Yoga'
      },
      success: function(data) {
        console.log('succccess');
        console.log(data);
        var eventWrapper = $("#content")
        var items = data['items'];
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          var title = item['summary']
          var startTimeString = item['start']['dateTime']
          if (!startTimeString) {
            startTimeString = item['start']['date']
          }
          // var startDate = new Date(startTimeString)
          // var startDay = startDate.getDate();
          // var startMonth = startDate.getMonth();
          // var startHour = startDate.getHours();
          // var startMinute = startDate.getMinutes();
          var mDate = moment(startTimeString);
          var printTimeString = mDate.format('dddd DD MMM @H:mm');
          var description = item['description']
          var regex = /public/;
          var result = regex.test(description);
          if (result) {
            console.log(item['id'])
            // var html = `<div>${title} , ${startDay}.${startMonth} ${startHour}:${startMinute} </div>`
            var html = `<div><span>${title}, </span> <span>${printTimeString}</span></div>`
            eventWrapper.append(html);
          }
        }
      }
    });
});