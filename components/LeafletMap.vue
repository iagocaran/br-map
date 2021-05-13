<template>
  <div id="mapid"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import { Component } from "vue-property-decorator";

interface Person {
  name: string;
  phone: string;
  position: { lat: number, long: number }
}

@Component
export default class LeafletMap extends Vue {
  mounted () {
    const L = require('leaflet');
    let mymap = L.map('mapid').setView([48.85658, 2.35183], 10);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: process.env.NUXT_ENV_MAPBOX_API_KEY
    }).addTo(mymap);

    console.log(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + '/api')
    this.$axios.get(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + '/api')
      .then((res) => {
        console.log('Found ' + res.data.length + ' people')
        res.data.forEach((person: Person) => {
          L.marker([person.position.lat, person.position.long]).addTo(mymap)
            .bindPopup("<b>" + person.name + "</b><br />" + person.phone)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
};
</script>

<style scoped>
#mapid {
  height: 100%;
}
</style>
