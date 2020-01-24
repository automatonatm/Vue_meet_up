<template>
  <v-app>
    <v-card>
      <v-navigation-drawer
              v-model="sideNav"
              absolute
              temporary
              height="400"
              class="overflow-hidden pa-3"

      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>supervisor_account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>View Meetups</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar dark class="purple darken-1">
        <v-app-bar-nav-icon
                class="hidden-sm-and-up"
                @click.stop="sideNav = !sideNav">
        </v-app-bar-nav-icon>
        <v-toolbar-title>DevMeetup</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn text >
            <v-icon left>supervisor_account</v-icon>
            Vue Meetups
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

    </v-card>

    <main></main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    sideNav: false
  }),
};
</script>

