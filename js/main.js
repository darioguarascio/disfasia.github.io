
$('time').prettyDate();
$(document).ready(function() {

    $("img").unveil();

    /*
    $('.multiselect').multiselect({
        buttonClass: 'btn btn-default',
        onChange: function(element, checked){

            if (checked) {
                $(sel).fadeIn();
            } else {
                $(sel).fadeOut();
            }
        }
    });
    */

    setTimeout(1000,function() {
        var myLatLng = new google.maps.LatLng( 50, 50 ),
            myOptions = {
                streetViewControl: false,
                zoomControl: false,
                scaleControl: false,
                mapTypeControl: false,
                zoom: 4,
                center: myLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
                },
            map = new google.maps.Map( $('#travelmap')[0], myOptions ),
            marker = new google.maps.Marker( {position: myLatLng, map: map} );
        
        marker.setMap( map );        
    });





});

jQuery(document).ready(function($) {
    var gallery = $('#thumbs').galleriffic({
        delay:                     3000, // in milliseconds
        numThumbs:                 20, // The number of thumbnails to show page
        preloadAhead:              40, // Set to -1 to preload all images
        enableTopPager:            false,
        enableBottomPager:         true,
        maxPagesToShow:            7,  // The maximum number of pages to display in either the top or bottom pager
        imageContainerSel:         '#slideshow', // The CSS selector for the element within which the main slideshow image should be rendered
        controlsContainerSel:      '#controls', // The CSS selector for the element within which the slideshow controls should be rendered
        captionContainerSel:       '#caption', // The CSS selector for the element within which the captions should be rendered
        loadingContainerSel:       '#loading', // The CSS selector for the element within which should be shown when an image is loading
        renderSSControls:          true, // Specifies whether the slideshow's Play and Pause links should be rendered
        renderNavControls:         true, // Specifies whether the slideshow's Next and Previous links should be rendered
        playLinkText:              'Play',
        pauseLinkText:             'Pause',
        prevLinkText:              'Previous',
        nextLinkText:              'Next',
        nextPageLinkText:          'Next &rsaquo;',
        prevPageLinkText:          '&lsaquo; Prev',
        enableHistory:             false, // Specifies whether the url's hash and the browser's history cache should update when the current slideshow image changes
        enableKeyboardNavigation:  true, // Specifies whether keyboard navigation is enabled
        autoStart:                 false, // Specifies whether the slideshow should be playing or paused when the page first loads
        syncTransitions:           false, // Specifies whether the out and in transitions occur simultaneously or distinctly
        defaultTransitionDuration: 1000, // If using the default transitions, specifies the duration of the transitions
        onSlideChange:             undefined, // accepts a delegate like such: function(prevIndex, nextIndex) { ... }
        onTransitionOut:           undefined, // accepts a delegate like such: function(slide, caption, isSync, callback) { ... }
        onTransitionIn:            undefined, // accepts a delegate like such: function(slide, caption, isSync) { ... }
        onPageTransitionOut:       undefined, // accepts a delegate like such: function(callback) { ... }
        onPageTransitionIn:        undefined, // accepts a delegate like such: function() { ... }
        onImageAdded:              undefined, // accepts a delegate like such: function(imageData, $li) { ... }
        onImageRemoved:            undefined  // accepts a delegate like such: function(imageData, $li) { ... }
    });
});

 $(function(){
        var lat = $('#world-map-markers').data('lat'), lng = $('#world-map-markers').data('lng');
        $('#world-map-markers').vectorMap({
          //zoomOnScroll: false,
          //zoomMin: 3,
          //panOnDrag: false,
          zoomButtons : false,
          onRegionTipShow: function(e, el, code){
            e.preventDefault();
          },
  onMarkerTipShow: function(e, label, code){
    e.preventDefault();
    //label.html('Anything you want');
    //or do what you want with label, it's just a jQuery object
  },          
          map: 'world_mill_en',
          scaleColors: ['#C8EEFF', '#0071A4'],
          normalizeFunction: 'polynomial',
          hoverOpacity: 0.7,
          hoverColor: false,
          markerStyle: {
            initial: {
              fill: '#F8E23B',
              stroke: '#383f47'
            }
          },
          focusOn: {
lat: lat,
lng: lng,
scale: 7
},
colors:          {
                    it:'#33250B'},

series: {
    regions: [{
        values: {
            'IT': '#3e9d01'
        },
        attribute: 'fill'
    }] },

          backgroundColor: '#383f47',
          markers: [
            {latLng: [lat, lng] },
            // {latLng: [43.73, 7.41], name: 'Monaco'},
            // {latLng: [-0.52, 166.93], name: 'Nauru'},
            // {latLng: [-8.51, 179.21], name: 'Tuvalu'},
            // {latLng: [43.93, 12.46], name: 'San Marino'},
            // {latLng: [47.14, 9.52], name: 'Liechtenstein'},
            // {latLng: [7.11, 171.06], name: 'Marshall Islands'},
            // {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
            // {latLng: [3.2, 73.22], name: 'Maldives'},
            // {latLng: [35.88, 14.5], name: 'Malta'},
            // {latLng: [12.05, -61.75], name: 'Grenada'},
            // {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
            // {latLng: [13.16, -59.55], name: 'Barbados'},
            // {latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
            // {latLng: [-4.61, 55.45], name: 'Seychelles'},
            // {latLng: [7.35, 134.46], name: 'Palau'},
            // {latLng: [42.5, 1.51], name: 'Andorra'},
            // {latLng: [14.01, -60.98], name: 'Saint Lucia'},
            // {latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
            // {latLng: [1.3, 103.8], name: 'Singapore'},
            // {latLng: [1.46, 173.03], name: 'Kiribati'},
            // {latLng: [-21.13, -175.2], name: 'Tonga'},
            // {latLng: [15.3, -61.38], name: 'Dominica'},
            // {latLng: [-20.2, 57.5], name: 'Mauritius'},
            // {latLng: [26.02, 50.55], name: 'Bahrain'},
            // {latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
          ]
        });

      })