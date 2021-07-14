<template>
  <v-app id="inspire">
    <v-navigation-drawer
    v-model="drawer"
    app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Vuetify Todo
          </v-list-item-title>
          <v-list-item-subtitle>
            Binh-Huy DO
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        app
        color="white"
        elevate-on-scroll
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>todos</v-toolbar-title>

      <v-spacer></v-spacer>

      <a target="_blank" rel="noopener noreferrer" style="text-decoration: none;" href="https://github.com/dbhuy2268/vuetify-todo/tree/main/src"><v-icon>mdi-github</v-icon></a>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
      <v-snackbar
          v-model="this.$store.state.snackbar.show"
          :timeout="timeout"
      >
        {{ this.$store.state.snackbar.text}}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    timeout: 2000,
    drawer: null,
    items: [
      { title: 'Todo list', icon: 'mdi-format-list-checks', to: '/' },
      { title: 'About', icon: 'mdi-help-box', to: '/about' },
    ],
  }),
}
</script>