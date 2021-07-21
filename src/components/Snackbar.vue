<template>
  <v-snackbar
      v-model="$store.state.snackbar.show"
      :timeout="timeout"
  >
    {{ $store.state.snackbar.text}}
  </v-snackbar>
</template>

<script>
  export default {
    data: () => ({
      timeout: 2000
    }),
  }
</script>