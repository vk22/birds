<template>	
	<div class="map-container">
         <div class="map-directions">
            <b-container>
              <b-row>
                <b-col>
                  <div class="map-directions__panel block-sh" :class="{'show':directionsShow}">
                    <div class="map-directions__panel-header" @click="directionsTogglePanel">
                        <div class="map-directions__panel-title">Построить маршрут</div> 
                        <svg class="map-directions__panel-header_arrow" viewBox="0 0 7 11">
                            <path d="M6.4,5.5l-4.1,5.1C2,11,1.3,11.1,1,10.8c-0.4-0.3-0.5-0.9-0.2-1.3l3.3-4l-3.2-4c-0.3-0.4-0.3-1,0.2-1.3
                            c0.4-0.3,1-0.3,1.3,0.2L6.4,5.5z"></path>
                        </svg>
                    </div>


                     <div class="map-directions__panel-content">
                        <input class="map-directions__panel-input input" type="text" v-model="direction.startAddress" placeholder="Введите адрес" value="">
                        <button class="map-directions__panel-btn btn" @click="getCoordsByAddress">Построить</button>
                        <div class="direction-error" v-if="directionError">{{ directionErrorMessage }}</div>  
                     </div>

                  </div> 
                
                </b-col>
              </b-row>
            </b-container>
        </div>
        <client-only>
		<gmap-map ref="map" v-bind="options" v-bind:options="mapStyle">

                <gmap-info-window 
                    :options="infoOptions" 
                    :position="infoWindowPos" 
                    :opened="infoWinOpen" 
                    @closeclick="infoWinOpen=false">

                    <div class="map-tooltip">
                        <!-- <div class="cover">
                            <img v-lazy="infoContent.cover" class="" alt="">
                        </div> -->
                        <div class="text">
                            <div class="title">
                                {{infoContent.title}}
                            </div>
                            <div class="distance">
                                {{infoContent.distance}}
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </gmap-info-window>

                <gmap-marker 
                    :position="projectMarker.position"
                    :icon="projectMarker.icon"
                    :clickable="false" />
            
                <!-- <gmap-marker 
                    :key="i" 
                    v-for="(m,i) in markersActive" 
                    :position="m.position"
                    :icon="m.icon"
                    :clickable="true"
                    @click="toggleInfoWindow(m,i)" /> -->
                
	    </gmap-map>
        </client-only>
	</div>	
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
import projectIcon from '~/assets/img/pin.svg';

export default {
    props: ['coords'],
    name: "GoogleMap",
    data() {
        return {
        options: {
            zoom: 14,
            center: {}  
        },
        infoContent: {},
        infoWindowPos: null,
        infoWinOpen: false,
        currentMidx: null,
        infoOptions: {
            pixelOffset: {
            width: 0,
            height: -35
            }
        },
        mapStyle: {
            //gestureHandling: 'cooperative',
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: true,
            zoomControl: true,  
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            mapTypeId: 'roadmap',
            styles: [
                {
                    "featureType": "landscape",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 60
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 40
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": 30
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ef8c25"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#b6c54c"
                        },
                        {
                            "lightness": 40
                        },
                        {
                            "saturation": -40
                        }
                    ]
                },
                {}
            ]
        },
        projectMarker: {
                    // label: {
                    //     text: 'Villa Thalassa',
                    //     color: 'black',
                    //     fontWeight: 'bold',
                    //     fontSize: '20px'
                    // },
                    position: {},
                    title: "Название проекта",
                    distance: "5 km",
                    icon: projectIcon
        },
        markersActive: [],
        direction: {
            startAddress: ''
        }, 
        directionsShow: false,
        destination: {
            // lat: 55.7074998,
            // lng: 37.5964597
        },
        directionError: false,
        directionErrorMessage: ''
        
    };
  },
  computed: {
    //google: gmapApi
  },
  methods: {
        toggleInfoWindow: function(marker, idx) {
            this.infoWindowPos = marker.position;
            this.infoContent.title = marker.title;
            this.infoContent.distance = marker.distance;
            this.infoContent.cover = marker.cover;
            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx === idx) {
                this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
                this.infoWinOpen = true;
                this.currentMidx = idx;
            }
        },
        getWindowSize(){
            console.log('google ', this.google)
            if (window.innerHeight>window.innerWidth) {
                console.log('Vert')
                this.options = {
                        zoom: 14,
                        center: this.coords
                    },
                this.projectMarker.position = this.coords 

            } else {
                console.log('this.coords ', this.coords)
                this.options = {
                        zoom: 14,
                        center: this.coords
                },
                this.projectMarker.position = this.coords    
            }

        },
        directionsTogglePanel() {
            this.directionsShow = !this.directionsShow
        },
        getCoordsByAddress() {
            var geocoder = new google.maps.Geocoder();
            var _this = this;
            _this.directionError = false
            _this.directionErrorMessage = ''

            geocoder.geocode({'address': this.direction.startAddress}, function(results, status) {
            if (status === 'OK') {
                console.log('results ', results)
                _this.destination = results[0].geometry.location
                _this.getDirection()
            } else {
                _this.directionError = true
                _this.directionErrorMessage = 'Введите Ваш точный адрес'
                console.log('Введите Ваш точный адрес');
            }
            });

        },
        getDirection: function() {

            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
            // if (directionsDisplay != null) {
            //     directionsDisplay.setMap(null);
            //     directionsDisplay = null;
            // }
            directionsDisplay.setMap(this.$refs.map.$mapObject);

            //google maps API's direction service
            function calculateAndDisplayRoute(directionsService, directionsDisplay, start, destination) {
                directionsService.route({
                origin: start,
                destination: destination,
                travelMode: 'DRIVING'
                }, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
                });
            }

            // console.log(this.coords);
            // console.log(this.destination);
            // console.log('hmmm yha');
            calculateAndDisplayRoute(directionsService, directionsDisplay, this.coords, this.destination);
        }
  },
    mounted: function () {

        var _this = this;
        window.addEventListener("resize", function(){
            setTimeout(() => {
                // console.log('resize')
                // console.log('coords ', this.coords)
                _this.getWindowSize();
            }, 200);
        });
        
        this.getWindowSize(); 
        //this.getMarkersTitles()
        //this.setMarkersGroup(0);
        //this.showAllMakers()
    },
};
</script>

<style lang="scss" scoped>

    

    .map-container {
        height: 100%;
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
    }

    .vue-map-container {
        height: 100%;
    }

  .map-directions {
    position: absolute;
    z-index: 2;
    width: auto;
    right: 0;
    top: 2rem;

    &__panel {
        position: absolute;
        z-index: 2;
        right: 20px;
        top: 0rem;
        width: 310px;
        background: #fff;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
      
        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0rem;
            cursor: pointer;
        }
        &-title {
            font-weight: 500;
            font-size: 1.1rem;
        }

        &-header_arrow {
            width: 10px;
            margin-right: 3px;
            transform: rotate(90deg);
            transition: transform .5s ease,
        }

        &-content {
            padding-top: 0rem;
            opacity: 0;
            visibility: hidden;
            max-height: 0;
            transform: translateY(0px);
            //transition: opacity .5s ease .25s, visibility .5s ease .25s, max-height .25s ease, padding-top .25s ease;
        }

        &-input {
            appearance: none;
            color: #111;
            background-color: transparent;
            border: 1px solid #ACACAC;
            box-shadow: none;
            padding: 0.75rem .5rem;
            width: 100%;
            margin-bottom: .5rem;
        }

        &-btn {
            width: 100%;
        }

        &.show {
                    
            .map-directions__panel-header_arrow {
                transform: rotate(-90deg);
            }
            .map-directions__panel-content {
                animation: showDir .75s ease-in-out;
                animation-fill-mode: forwards;
                // opacity: 1;
                // visibility: visible;
                // max-height: 500px;
                // padding-top: 1rem;
            }
        }

        @keyframes showDir {
            0%   {opacity: 0; visibility: hidden; max-height: 0; padding-top: 0rem;  transform: translateY(0px);}
            // 25%  {background: yellow; left: 200px; top: 0px;}
            50%  {opacity: 0; visibility: hidden; max-height: 500px; padding-top: 1rem;  transform: translateY(0px); }
            // 75%  {background: green; left: 0px; top: 200px;}
            100% {opacity: 1; visibility: visible; max-height: 500px; padding-top: 1rem; transform: translateY(5px);}
        }    

        .direction-error {
            color: red;
            font-size: .85rem;
            padding: .75rem 0 0;
        }
    }
  }

    .map-tooltip {
        width: 250px;
        padding: 0px;
        display: flex;
        flex-direction: column;

        .cover {
            position: relative;
            img {
                width: 100%;
                max-width: 100%;
            }
        }

        .text {
            display: flex;
            justify-content: space-between;
            font-family: $font-text; 
            font-size: 14px;
            text-transform: uppercase;
            padding: 9px 0;
            letter-spacing: .5px;

            .title {
                font-weight: 600;
                width: 70%;
            }
            .distance {
                text-align: right;
                width: 30%;
            }
        }
    }

</style>
