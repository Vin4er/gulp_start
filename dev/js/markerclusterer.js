;(function( $, window, undefined ) {

$.fn.googleMap = function (options) {

    var el = this,
        x = $(el).data('x'),
        y = $(el).data('y'),
        zoom = $(el).data('zoom'),
        places = $(el).data('places'),
        markers = [],
        o = $.extend({

          mapOptions: {
            scrollwheel: false,
            draggable:true
          },

          markerOptions: {}

        }, options);

    this.init = function () {

      if( !el[0] ) return;

      var map = new google.maps.Map(el.get(0), $.extend({
        zoom: zoom,
        center: new google.maps.LatLng(x, y)
      }, o.mapOptions));

      var styledMap = new google.maps.StyledMapType(
        [
          {
            "featureType": "landscape",
            "stylers": [
              { "gamma": 0.58 },
              { "hue": "#0091ff" },
              { "saturation": 54 },
              { "lightness": -16 }
            ]
          },{
            "featureType": "water",
            "stylers": [
              { "hue": "#0077ff" },
              { "saturation": -9 },
              { "gamma": 1.08 },
              { "lightness": -61 }
            ]
          },{
            "featureType": "administrative",
            "stylers": [
              { "hue": "#00eeff" },
              { "lightness": 100 },
              { "saturation": 100 },
              { "gamma": 0.01 },
              { "visibility": "simplified" }
            ]
          },{
            "featureType": "road",
            "stylers": [
              { "hue": "#006eff" },
              { "visibility": "on" },
              { "saturation": 46 },
              { "gamma": 0.64 },
              { "lightness": -24 }
            ]
          },{
            "featureType": "poi",
            "stylers": [
              { "hue": "#007fff" },
              { "gamma": 0.58 },
              { "saturation": 51 },
              { "visibility": "on" },
              { "lightness": 13 }
            ]
          },{
            "featureType": "transit",
            "stylers": [
              { "saturation": 92 },
              { "gamma": 1.15 },
              { "visibility": "on" },
              { "hue": "#0088ff" },
              { "lightness": -9 }
            ]
          }
        ]
        ,{name:'Styled'});

      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

      this.addMarkers(map, places);

      el.data('map', map);
      el.data('markers',markers)
      return el;

    };

    this.addMarkers = function(_map, _places){
      var latlngbounds = new google.maps.LatLngBounds();

      var image =
        new google.maps.MarkerImage('/assets/img/map-marker.png',
        new google.maps.Size(24, 33), //width, height
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 33)); //distance to center point of marker

      var infoWindow = new google.maps.InfoWindow();

      for (var i = 0; i < data.places.length; i++) {
          //var myLatLng = new google.maps.LatLng(_places[i][0], _places[i][1]);
          var myLatLng = new google.maps.LatLng(data.places[i].latitude, data.places[i].longitude);
          latlngbounds.extend(myLatLng);
          var marker = new google.maps.Marker($.extend({
            position: myLatLng,
            map: _map,
            icon: image,
            title:data.places[i].title,
            address:data.places[i].address,
            phone:data.places[i].phone,
          }, o.markerOptions));
          markers.push(marker);
      }

      var markerCluster = new MarkerClusterer(_map, markers, {
        maxZoom: 12,
        gridSize: 40,
        styles: [{
          url: '/assets/img/map-cluster.png',
          height: 39,
          width:  39,
          anchor: [0, 0],
          textColor: '#0077c8',
          textSize: 18
        }]
      });

      for(var i = 0; i < markers.length; i++)(function(n){
        google.maps.event.addListener(markers[n], 'click', function() {
          infoWindow.setContent("<div class='map-popup-content'> <h5>"+this.title+"</h5> <div class='map-popup-address'><i class='icon-home'></i>"+this.address+"</div> <div class='map-popup-phone'><i class='icon-phone'></i>"+this.phone+"</div> </div>");
          infoWindow.open(_map, this);
          if (infoWindow.content ){
            $('.gm-style-iw').parent().addClass('map-popup');
          }
          // _map.panTo(new google.maps.LatLng( this.getPosition().lat(), this.getPosition().lng() ));
        });
      })(i);

      google.maps.event.addListener(_map, 'click', function(){
        infoWindow.close();
        infoWindow.content = undefined;
      });

    };


    this.moveMap = function(_map,lat,lng,zoom){
    if(lat)
        _map.panTo(new google.maps.LatLng(lat,lng));
      _map.setZoom(zoom);
    }

    return this;

};

})(jQuery, window);



//Geo Map
(function(){

  $('#map').googleMap({
    mapOptions: {
      scrollwheel: false,
    }
  }).init();

  var goo = new $.fn.googleMap,
      map = $('#map').data('map'),
      markers = $('#map').data('markers'),
      field = 0;

  $(".btn-blue").unbind(".A").bind('click.A', function(e){
    e.preventDefault();
  })
     $("body").on('chango', '.select-wrap', function(){

        if( $(this).is("#geo-dropdown-field") ) {
          var da = $(this).filter("#geo-dropdown-field").find('select [selected]')
        $('#geo-dropdown-city  .js-select-drop  li').show()

          var filed = da.data('field')
        $('#geo-dropdown-city select [data-field='+filed+']').hide();
        $('#geo-dropdown-city .js-select-drop li [data-field='+filed+']input ').parents('li').hide();

        $(".btn-blue").unbind(".cc").bind('click.cc', function(e){
          e.preventDefault();
           goo.moveMap(map, da.data('lat'), da.data('lng'), da.data('zoom'));
        })
      }
        if( $(this).is("#geo-dropdown-city") ) {

          var da = $(this).filter("#geo-dropdown-city").find('select [selected]')
          $(".btn-blue").unbind(".cc").bind('click.cc', function(e){
          e.preventDefault();
           goo.moveMap(map, da.data('lat'), da.data('lng'), da.data('zoom'));
        })
        }

        

     })



})();








