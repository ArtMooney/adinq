$(document).ready(function () {
  drawMap();

  $("#letaefterort").click(function () {
    window.enteredName = document.getElementById("enteredFormName").value;
    drawMap();
  });

  $("#nollakarta").click(function () {
    window.enteredName = "";
    drawMap();
  });
});

function drawMap() {
  if (window.enteredName == null) {
    window.enteredName = "";
  }

  var script = document.createElement("script");
  script.onload = function () {};
  script.src =
    "https://data.adinq.se/external/mp-data" + "?prjname=" + window.enteredName;
  document.head.appendChild(script);

  setTimeout(function () {
    var mapOptions = {
      //   center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
      center: new google.maps.LatLng(61.8044451, 15.2087888),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      //   gestureHandling: "greedy",
    };
    var infoWindow = new google.maps.InfoWindow();
    var latlngbounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(
      document.getElementById("marknadsplatskarta"),
      mapOptions
    );
    var i = 0;
    var interval = setInterval(function () {
      var data = markers[i];
      var myLatlng = new google.maps.LatLng(data.lat, data.lng);
      var icon = "";
      switch (data.type) {
        case "willys":
          icon = "willys";
          break;
        case "hemkop":
          icon = "hemkop";
          break;
        case "coop":
          icon = "coop";
          break;
        case "ica":
          icon = "ica";
          break;
        case "storbild":
          icon = "storbild";
          break;
        default:
          icon = "green";
          break;
      }
      icon = "https://www.adinq.se/@pins/" + icon + ".png";
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: data.title,
        animation: google.maps.Animation.DROP,
        icon: new google.maps.MarkerImage(icon),
      });
      (function (marker, data) {
        google.maps.event.addListener(marker, "click", function (e) {
          infoWindow.setContent(data.description);
          infoWindow.open(map, marker);
        });
      })(marker, data);
      latlngbounds.extend(marker.position);
      i++;

      if (i == markers.length) {
        clearInterval(interval);
        var bounds = new google.maps.LatLngBounds();
        if (window.enteredName != "") {
          map.setCenter(latlngbounds.getCenter());
          map.fitBounds(latlngbounds);
        }
      }
    }, 0);
  }, 1000);
}
