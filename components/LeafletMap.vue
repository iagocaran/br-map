<template>
  <v-container>
    <div id="mapid"></div>
    <p>Hello darkness my old friend</p>
  </v-container>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css';

export default {
  name: 'LeafletMap',
  methods: {
  },
  mounted() {
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

    this.$axios.get('/api')
      .then((res) => {
        res.data.forEach((person) => {
          let marker = L.marker([person.position.lat, person.position.long]).addTo(mymap);
          marker.bindPopup("<b>" + person.name + "</b><br />" + person.phone)
        })
      })
  }
};
</script>

<style scoped>
#mapid {
  height: 500px;
}
</style>
