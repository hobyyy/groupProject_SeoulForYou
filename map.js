var map = new naver.maps.Map('map', {
  center: new naver.maps.LatLng(37.5112, 127.0981), // 잠실 롯데월드를 중심으로 하는 지도
  zoom: 15
});

// var map = new naver.maps.Map(document.getElementById('map'), {
//     center: new naver.maps.LatLng(37.5112, 127.0981), // 잠실 롯데월드를 중심으로 하는 지도
//     zoom: 15
// });

var map = new naver.maps.Map('map');

var marker = new naver.maps.Marker({
  position: new naver.maps.LatLng(37.5112, 127.0981),
  map: map
});