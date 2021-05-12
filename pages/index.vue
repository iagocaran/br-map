<template>
  <v-main>
    <client-only>
      <LeafletMap></LeafletMap>
    </client-only>
  </v-main>
</template>

<script>
import LeafletMap from '~/components/LeafletMap.vue'

export default {
  components: {
    LeafletMap
  }
}
</script>
