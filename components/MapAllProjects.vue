<template>
  <div id="map" ref="imediMapContainer">
    <no-ssr>
      <gmap-map ref="imediMap" v-bind="mapCenter" v-bind:options="mapStyle">
        <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen = false"
        >
          <div class="map-tooltip">
            <div class="cover lazyImg">
              <nuxt-link :to="'/projects/' + infoContent.url">
                <img v-lazy="infoContent.cover" class="" alt="" />
              </nuxt-link>
            </div>
            <div class="text">
              <div class="title">
                {{ infoContent.title }}
              </div>
              <div class="subtitle">
                {{ infoContent.subtitle }}
              </div>
              <div class="metro">
                {{ infoContent.metro }}
              </div>
              <div class="address">
                {{ infoContent.address }}
              </div>
              <div class="free-spaces">
                <span
                  v-for="(item, index) in infoContent.freeSpaces"
                  :key="index"
                >
                  {{ item.type }}: {{ item.data }}
                  <span v-if="index + 1 < infoContent.freeSpaces.length"
                    >/</span
                  >
                </span>
              </div>
            </div>
          </div>
        </gmap-info-window>

        <gmap-marker
          :key="i"
          v-for="(m, i) in projectsData"
          :position="m.position"
          :icon="m.icon"
          :clickable="true"
          @click="clickInfoWindow(m)"
          @mouseover="hoverInfoWindow(m, i, $event)"
          @mouseout="leaveInfoWindow()"
        />
      </gmap-map>
    </no-ssr>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import projectIcon from "~/assets/img/pin-default.svg";
// import projectIconBerej from '~/uploads/pin-berej.png';
// import projectIconSmoln from '~/assets/img/pin-smoln.svg';
// import projectIconDonsk from '~/assets/img/pin-donsk.svg';
// import projectIconRoshin from '~/assets/img/pin-roshin.svg';
// import projectIconAmursk from '~/assets/img/pin-amursk.svg';
// import projectIconKavkaz from '~/assets/img/pin-kavkaz.svg';
// import projectIconMologvard from '~/assets/img/pin-mologvard.svg';
// import projectIconFregat from '~/assets/img/pin-fregat.svg';
// import projectIconBegovaya from '~/assets/img/pin-begovaya.svg';

export default {
  props: ["city", "projects"],
  name: "GoogleMap",
  data() {
    return {
      mapContainerSize: {
        h: null,
        w: null,
      },
      // projectIcons: {
      //     'berej': '/uploads/pin-berej.png',
      //     'smoln': projectIconSmoln,
      //     'donsk': projectIconDonsk,
      //     'roshin': projectIconRoshin,
      //     'amursk': projectIconAmursk,
      //     'kavkaz': projectIconKavkaz,
      //     'molodogvard': projectIconMologvard,
      //     'fregat': projectIconFregat,
      //     'begovaya': projectIconBegovaya
      // },
    //   projectsData: [],
      cityOptions: {
        moscow: {
          zoom: 11,
          center: {
            lat: 55.758578,
            lng: 37.611285,
          },
        },
        lipetsk: {
          zoom: 12,
          center: {
            lat: 52.5912267,
            lng: 39.6003996,
          },
        },
      },
      infoContent: {},
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        disableAutoPan: true,
        pixelOffset: {
          width: 0,
          height: -35,
        },
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
        mapTypeId: "roadmap",
        styles: [
          {
            featureType: "landscape",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 60,
              },
            ],
          },
          {
            featureType: "road.local",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 40,
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "transit",
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "administrative.province",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "water",
            stylers: [
              {
                visibility: "on",
              },
              {
                lightness: 30,
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ef8c25",
              },
              {
                lightness: 40,
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#b6c54c",
              },
              {
                lightness: 40,
              },
              {
                saturation: -40,
              },
            ],
          },
          {},
        ],
      },
      markersMenu: [],
      activeMenu: 0,
    };
  },
  methods: {
    getLabel(title) {
      return {
        color: "$mainColor",
        fontWeight: "bold",
        fontSize: "14px",
        marginTop: "-14px",
        text: title,
      };
    },
    async hoverInfoWindow (marker, idx, event) {
      console.log("hoverInfoWindow ", marker.position);
      await this.toggleInfoWindow(marker, idx);
      var pos = marker.position;
      this.infoWindowPos = {
        lat: marker.position.lat + 0.0125,
        lng: marker.position.lng,
      };
      this.$refs.imediMap.$mapPromise.then((map) => {
        var latNorth = map.getBounds().getNorthEast().lat();
        var lng0 = map.getBounds().getNorthEast().lng();
        var latSouth = map.getBounds().getSouthWest().lat();
        var lng1 = map.getBounds().getSouthWest().lng();
        // console.log('getBounds ', latNorth, latSouth)
        // console.log('marker ', marker.position.lat)

        var mapThirdPoint1 = latNorth - (latNorth - latSouth) / 3;
        var mapThirdPoint2 = latSouth + (latNorth - latSouth) / 3;

        var difTop = latNorth - marker.position.lat;
        var difBottom = marker.position.lat - latSouth;

        if (
          latNorth > marker.position.lat &&
          mapThirdPoint1 < marker.position.lat
        ) {
          console.log("верхняя часть ");
          this.infoOptions.pixelOffset = {
            width: 175,
            height: 275,
          };
        } else if (
          mapThirdPoint1 > marker.position.lat &&
          mapThirdPoint2 < marker.position.lat
        ) {
          console.log("средняя часть ");
          this.infoOptions.pixelOffset = {
            width: 175,
            height: 150,
          };
        } else if (
          mapThirdPoint2 > marker.position.lat &&
          latSouth < marker.position.lat
        ) {
          console.log("нижняя часть ");
          this.infoOptions.pixelOffset = {
            width: 175,
            height: 50,
          };
        }
        // console.log('difTop ', difTop)
        // console.log('difBottom ', difBottom)
      });
    },
    leaveInfoWindow: function (marker, idx) {
      console.log("leaveInfoWindow ");
      this.infoWindowPos = null;
      this.infoContent = {};
    },
    toggleInfoWindow: function (marker, idx) {

        return new Promise(resolve => {
            this.infoContent = marker
            this.infoWinOpen = true;
            this.currentMidx = idx;
            setTimeout(() => {
                resolve(true);
            }, 200);
        })
    },
    clickInfoWindow: function (marker) {
      console.log("clickInfoWindow ", marker);
      this.$router.push({
        path: "/projects/" + marker.url,
      });
    },
    panTo(map, dest, delay) {
      var GOOGLE_PAN_DELAY = 30,
        /* the native Google Maps milliseconds */
        cycles = delay / GOOGLE_PAN_DELAY,
        interval = delay / cycles,
        origin = map.getCenter(),
        waypoints = [],
        temp,
        lat,
        lng;

      // compute the change in lat/long, and divide across N cycles
      lat = (dest.lat() - origin.lat()) / cycles;
      lng = (dest.lng() - origin.lng()) / cycles;

      // starting at origin, add N-1 intermediate waypoints that are equidistance apart
      temp = origin;
      for (var i = 0; i < cycles - 1; i++) {
        temp = new google.maps.LatLng(temp.lat() + lat, temp.lng() + lng);
        waypoints.push(temp);
      }
      // make sure the last waypoint is the actual dest
      waypoints.push(dest);

      function pan() {
        var waypoint;
        if (waypoints.length === 0) return;
        waypoint = waypoints.shift();
        map.panTo(waypoint);
        window.setTimeout(pan, interval);
      }

      pan();
    },
    getMapSize() {
      this.mapSize = new google.maps.Size(0, -10);
      console.log("mapSize ", this.mapSize);
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(
          navigator.userAgent
        ) ||
        window.matchMedia("only screen and (max-width: 760px)").matches ||
        typeof window.orientation !== "undefined"
      ) {
        console.log("isMobile");
        // this.$store.dispatch('mobileMode', true);
        return true;
      } else {
        console.log("noMobile");
        // this.$store.dispatch('mobileMode', false);
        return false;
      }
    },
    isSmallScreen() {
      if (process.client) {
        if (window.outerWidth < 400) {
          return true;
        } else {
          return false;
        }
      }
    },
    setMapContainerSize() {
      this.mapContainerSize = {
        h: this.$refs.imediMapContainer.offsetHeight,
        w: this.$refs.imediMapContainer.offsetWidth,
      };
    },
  },
  mounted: function () {
    this.setMapContainerSize();
    window.addEventListener("resize", this.setMapContainerSize);
  },
  computed: {
    google: gmapApi,
    mapCenter() {
      if (this.mapContainerSize.h <= 400) {
        return {
          zoom: this.cityOptions[this.city].zoom - 2,
          center: this.cityOptions[this.city].center,
        };
      } else if (
        this.mapContainerSize.h > 400 &&
        this.mapContainerSize.h <= 700
      ) {
        return {
          zoom: this.cityOptions[this.city].zoom - 1,
          center: this.cityOptions[this.city].center,
        };
      } else {
        return {
          zoom: this.cityOptions[this.city].zoom,
          center: this.cityOptions[this.city].center,
        };
      }
    },
    projectsData() {
      let projectsData = []  
      this.projects.map((project) => {
        const icon = (project.pin != "" || project.pin != undefined) ? "/uploads/projects/" + project.id + "/" + project.pin : "/uploads/pins/pin-default.svg"

        if (this.city === "moscow") {
          projectsData.push({
            url: project.url,
            cover: "/uploads/projects/" + project.id + "/" + project.preview,
            title: project.title,
            subtitle: project.type,
            metro: 'м. "' + project.metro + '" ',
            address: project.address,
            position: project.mapCoords,
            //icon: _this.projectIcons[project.url],
            icon: icon,
            freeSpaces: project.freeSpaces,
          });
        } else {
          projectsData.push({
            url: project.url,
            cover: "/uploads/projects/" + project.id + "/" + project.preview,
            title: project.title,
            subtitle: project.type,
            address: project.address,
            position: project.mapCoords,
            //icon: _this.projectIcons[project.url],
            icon: icon,
            freeSpaces: project.freeSpaces,
          });
        }
      });

      return projectsData
    },
  },
  watch: {
    // city: function (val, oldVal) {
    //   if (val) {
    //     this.getProjectsData();
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.gm-style div div div div div div div {
  // display:none;
}

.gm-style-iw {
  display: none;
}

#map {
  height: 100%;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  text-transform: uppercase;

  .labels {
    color: white;
    background-color: red;
    font-family: "Lucida Grande", "Arial", sans-serif;
    font-size: 10px;
    text-align: center;
    width: 10px;
    white-space: nowrap;
  }
}

.vue-map-container {
  height: 100%;
}

.map-menu {
  position: absolute;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  top: 0px;
  left: 0px;
  width: 15vw;
  height: calc(100vh - 0px);
  min-width: 200px;
  z-index: 9;
  // transform: translateX(-50%);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18824);

  @include for-phone-only {
    width: 200px;
    min-width: 200px;
    height: 200px;
    top: auto;
    bottom: 0px;
  }

  @include for-tablet-portrait-up {
    width: 200px;
    min-width: 200px;
  }

  @include for-tablet-landscape-up {
    position: absolute;
    background: rgba(255, 255, 255, 0.85);
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    top: 0px;
    left: 0px;
    width: 10vw;
    height: calc(100vh - 0px);
    min-width: 200px;
    z-index: 9;
    // transform: translateX(-50%);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18824);
  }
}

.map-tooltip {
  width: 260px;
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
    flex-direction: column;
    font-family: $font-text;
    padding: 9px 0;
    letter-spacing: 0px;

    .title {
      font-size: 1.15rem;
      text-transform: uppercase;
      font-weight: 500;
      margin-bottom: 0.15rem;
    }
    .subtitle {
      font-size: 0.9rem;
      text-transform: none;
      margin-bottom: 0.75rem;
      color: #999;
    }

    .metro {
      font-size: 0.9rem;
      font-weight: 500;
      text-transform: none;
      color: #111;
    }
    .address {
      font-size: 0.9rem;
      font-weight: 500;
      text-transform: none;
      color: #111;
      margin-bottom: 0.75rem;
    }
    .free-spaces {
      font-size: 0.9rem;
      text-transform: none;
      color: #999;
    }
  }
}
</style>
