var lng, lat;

$(document).ready(function () {
    navigator.geolocation.getCurrentPosition(function (pos) {
        lng = pos.coords.longitude;
        lat = pos.coords.latitude;

        getCurrentTemp();
    });
})


function getCurrentTemp() {
    if (!(lng && lat))
        return;

    var url = '/' + lng + '/' + lat;
    var req = $.get(url, function (data) {
        $('.tempcel').html(Math.ceil(data.temperature));
        $('.timezone').html(data.timezone);
        console.log(data);
    }, 'json');
};

$('.tempCheck').on('click', function (e) {
    e.preventDefault();
    getCurrentTemp();

});