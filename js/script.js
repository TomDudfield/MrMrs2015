$('#nav').affix({
      offset: {
        top: $('header').height()-$('#nav').height()
      }
});	

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});

$('body').scrollspy({ target: '#nav' })

var autocomplete;

function initialize() {
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), { language: 'en-GB', location: '50.719164,-1.880769', radius: '200', componentRestrictions: { country: "gb" } });
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        fillInAddress();
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = new google.maps.LatLng(
                position.coords.latitude, position.coords.longitude);
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}

function fillInAddress() {
    var place = autocomplete.getPlace();
    console.log(place);
    document.getElementById('saddr').value = place.formatted_address;
}

google.maps.event.addDomListener(window, 'load', initialize);