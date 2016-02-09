
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

    // setTimeout(1000,function() {
    //     var myLatLng = new google.maps.LatLng( 50, 50 ),
    //         myOptions = {
    //             streetViewControl: false,
    //             zoomControl: false,
    //             scaleControl: false,
    //             mapTypeControl: false,
    //             zoom: 4,
    //             center: myLatLng,
    //             mapTypeId: google.maps.MapTypeId.ROADMAP
    //             },
    //         map = new google.maps.Map( $('#travelmap')[0], myOptions ),
    //         marker = new google.maps.Marker( {position: myLatLng, map: map} );
        
    //     marker.setMap( map );        
    // });
});

$(function() {
    if ($('body[data-type=countries]').size()) {
        region_values = {};
        country_list = country_list.split(',')
        for (r  in country_list) {
            if (!!country_list[r]) {
                region_values[ country_list[r] ] = '#D5E4CA';
            }
        }

        $('#world-map-markers').vectorMap({
            zoomMax: 22,
            zoomMin: 1,
            //panOnDrag: false,
            //zoomOnScroll: false,
            //panOnDrag: false,
            zoomButtons: false,

            onRegionLabelShow: function(e, el, code) {
                e.preventDefault();
            },
            onRegionTipShow: function(e, el, code) {
                if ($('#main_container .tile a[data-country='+code+']').size() == 0) {
                    e.preventDefault();
                }
            },
            onMarkerTipShow: function(e, label, code) {
                e.preventDefault();
            },
            map: 'world_mill_en',
            scaleColors: ['#C8EEFF', '#0071A4'],
            normalizeFunction: 'polynomial',
            hoverOpacity: 0.7,
            hoverColor: false,
            markerStyle: {
                initial: {
                    fill: '#f4a460',
                    stroke: '#383f47',
                    "fill-opacity": 1,
                    "stroke-width": 1,
                    "stroke-opacity": 1,
                    r: 5
                }
            },
            regionStyle: {
                initial: {
                    fill: '#8E9688'
                },
                selected: {
                    fill: '#8E9688'
                },
                hover: {
                    "fill-opacity": 1
                }
            },
            // focusOn: {
            //     lat: markers_values[0].latLng[0],
            //     lng: markers_values[0].latLng[1],
            //     scale: 12
            // },


            series: {
                regions: [{
                    values: region_values,
                    attribute: 'fill'
                }]
            },
            backgroundColor: '#383f47',
            //markers: markers_values
        });




    }

    if ($('body#t_album[data-type=""]').size()) {

        var country = $('#world-map-markers').data('country');
        var region_values = {}, markers_values = [];
        if (!!$('#world-map-markers').data('coords')) {
            var coords = $('#world-map-markers').data('coords').split(';')
            for (latLng in coords) {
                if (!coords[latLng]) continue; 
                latLng = coords[latLng].split(',');
                markers_values.push({
                    latLng: [latLng[0], latLng[1]]
                });
            }
        } else {
            markers_values.push({
                latLng: [$('#world-map-markers').data('lat'), $('#world-map-markers').data('lng')]
            });
        }
        region_values[country] = '#D5E4CA';
        $('#world-map-markers').vectorMap({
            zoomMax: 22,
            zoomMin: 5,
            panOnDrag: false,
            //zoomOnScroll: false,
            //panOnDrag: false,
            zoomButtons: false,

            onRegionLabelShow: function(e, el, code) {
                e.preventDefault();
            },
            onRegionTipShow: function(e, el, code) {
                e.preventDefault();
            },
            onMarkerTipShow: function(e, label, code) {
                e.preventDefault();
            },
            map: 'world_mill_en',
            scaleColors: ['#C8EEFF', '#0071A4'],
            normalizeFunction: 'polynomial',
            hoverOpacity: 0.7,
            hoverColor: false,
            markerStyle: {
                initial: {
                    fill: '#f4a460',
                    stroke: '#383f47',
                    "fill-opacity": 1,
                    "stroke-width": 1,
                    "stroke-opacity": 1,
                    r: 5
                }
            },
            regionStyle: {
                initial: {
                    fill: '#A0AB98'
                },
                selected: {
                    fill: '#A0AB98'
                },
                hover: {
                    "fill-opacity": 1
                }
            },
            focusOn: {
                lat: markers_values[0].latLng[0],
                lng: markers_values[0].latLng[1],
                scale: 12
            },


            series: {
                regions: [{
                    values: region_values,
                    attribute: 'fill'
                }]
            },
            backgroundColor: '#383f47',
            markers: markers_values
        });

        var initPhotoSwipeFromDOM = function(gallerySelector) {

            // parse slide data (url, title, size ...) from DOM elements 
            // (children of gallerySelector)
            var parseThumbnailElements = function(el) {
                var thumbElements = el.childNodes,
                    numNodes = thumbElements.length,
                    items = [],
                    figureEl,
                    linkEl,
                    size,
                    item;

                for(var i = 0; i < numNodes; i++) {

                    figureEl = thumbElements[i]; // <figure> element

                    // include only element nodes 
                    if(figureEl.nodeType !== 1) {
                        continue;
                    }

                    linkEl = figureEl.children[0]; // <a> element

                    size = linkEl.getAttribute('data-size').split('x');

                    // create slide object
                    item = {
                        src: linkEl.getAttribute('href'),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };



                    if(figureEl.children.length > 1) {
                        // <figcaption> content
                        item.title = figureEl.children[1].innerHTML; 
                    }

                    if(linkEl.children.length > 0) {
                        // <img> thumbnail element, retrieving thumbnail url
                        item.msrc = linkEl.children[0].getAttribute('src');
                    } 

                    item.el = figureEl; // save link to element for getThumbBoundsFn
                    items.push(item);
                }

                return items;
            };

            // find nearest parent element
            var closest = function closest(el, fn) {
                return el && ( fn(el) ? el : closest(el.parentNode, fn) );
            };

            // triggers when user clicks on thumbnail
            var onThumbnailsClick = function(e) {
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;

                var eTarget = e.target || e.srcElement;

                // find root element of slide
                var clickedListItem = closest(eTarget, function(el) {
                    return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
                });

                if(!clickedListItem) {
                    return;
                }

                // find index of clicked item by looping through all child nodes
                // alternatively, you may define index via data- attribute
                var clickedGallery = clickedListItem.parentNode,
                    childNodes = clickedListItem.parentNode.childNodes,
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index;

                for (var i = 0; i < numChildNodes; i++) {
                    if(childNodes[i].nodeType !== 1) { 
                        continue; 
                    }

                    if(childNodes[i] === clickedListItem) {
                        index = nodeIndex;
                        break;
                    }
                    nodeIndex++;
                }



                if(index >= 0) {
                    // open PhotoSwipe if valid index found
                    openPhotoSwipe( index, clickedGallery );
                }
                return false;
            };

            // parse picture index and gallery index from URL (#&pid=1&gid=2)
            var photoswipeParseHash = function() {
                var hash = window.location.hash.substring(1),
                params = {};

                if(hash.length < 5) {
                    return params;
                }

                var vars = hash.split('&');
                for (var i = 0; i < vars.length; i++) {
                    if(!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split('=');  
                    if(pair.length < 2) {
                        continue;
                    }           
                    params[pair[0]] = pair[1];
                }

                if(params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }

                return params;
            };

            var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
                var pswpElement = document.querySelectorAll('.pswp')[0],
                    gallery,
                    options,
                    items;

                items = parseThumbnailElements(galleryElement);

                // define options (if needed)
                options = {
                    history: true,
                    // define gallery index (for URL)
                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                    getThumbBoundsFn: function(index) {
                        // See Options -> getThumbBoundsFn section of documentation for more info
                        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect(); 

                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    }

                };

                // PhotoSwipe opened from URL
                if(fromURL) {
                    if(options.galleryPIDs) {
                        // parse real index when custom PIDs are used 
                        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                        for(var j = 0; j < items.length; j++) {
                            if(items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        // in URL indexes start from 1
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }

                // exit if index not found
                if( isNaN(options.index) ) {
                    return;
                }

                if(disableAnimation) {
                    options.showAnimationDuration = 0;
                }

                // Pass data to PhotoSwipe and initialize it
                gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.currentTitle = document.getElementsByTagName('title')[0].innerHTML;
                gallery.init();
                gallery.listen('afterChange', function() {
                    var photoNumber = this.getCurrentIndex() + 1;
                    document.getElementsByTagName('title')[0].innerHTML = photoNumber + ' - ' + this.currentTitle;
                    if (!!ga) {
                        ga('send', 'pageview', location.pathname + '/slide-' + photoNumber);
                    }
                });
                gallery.listen('close', function() {
                    document.getElementsByTagName('title')[0].innerHTML = this.currentTitle;
                });
                gallery.shout('afterChange');
            };

            // loop through all gallery elements and bind events
            var galleryElements = document.querySelectorAll( gallerySelector );

            for(var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i+1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

            // Parse URL and open gallery if it contains #&pid=3&gid=1
            var hashData = photoswipeParseHash();
            if(hashData.pid && hashData.gid) {
                openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
            }
        };

        // execute above function
        initPhotoSwipeFromDOM('.my-gallery');






    }
});