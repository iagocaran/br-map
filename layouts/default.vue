<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <LeafletMap></LeafletMap>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import LeafletMap from '~/components/LeafletMap.vue'

export default {
  components: {
    LeafletMap
  },
  data () {
    return {
      title: 'Mapa dos BR'
    }
  }
}
</script>
