<template>
  <v-app>
    <v-card>
      <v-navigation-drawer
              v-model="sideNav"
              absolute
              temporary
              class="overflow-hidden pa-3"
              height="700">

        <v-list-item>
          <v-list-item-avatar>
              <!--  <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>-->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-divider></v-divider>

        <v-list dense>

            <v-list-item
                    :key="item.title"
                    :to="item.link"
                    router
                    v-for="item in menuItems">
            <v-list-item-icon>
                <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

            <v-list-item
                    @click="onlogOut"
                    v-if="userIsAuthenticated"

            >
                <v-list-item-icon>
                    <v-icon>exit_to_app</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar dark class="purple darken-1">
        <v-app-bar-nav-icon
                class="hidden-sm-and-up"
                @click.stop="sideNav = !sideNav">
        </v-app-bar-nav-icon>

          <v-toolbar-title>
              <router-link style="cursor: pointer" tag="span" to="/">DevMeetup</router-link>
          </v-toolbar-title>
        <v-spacer></v-spacer>
          <v-toolbar-items
                  :key="item.title"
                  class="hidden-xs-only"
                  v-for="item in menuItems">

              <v-btn :to="item.link"
                     router
                     text>
                  <v-icon left>{{item.icon}}</v-icon>
                  {{item.title}}
          </v-btn>


          </v-toolbar-items>
          <v-btn
                  @click="onlogOut"
                  class="hidden-xs-only"
                  text
                  v-if="userIsAuthenticated">
              <v-icon left>exit_to_app</v-icon>
              Logout
          </v-btn>
      </v-toolbar>

    </v-card>
      <main>
          <router-view></router-view>
      </main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
      sideNav: false,
      /*    menuItems: [
              {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
              {icon: 'room', title: 'Organize Meetup', link: '/meetup/new'},
              {icon: 'person', title: 'Profile', link: '/profile'},
              {icon: 'face', title: 'Sign up', link: '/signup'},
              {icon: 'lock', title: 'Sign in', link: '/signin'},
          ]*/

  }),
    computed: {
        menuItems() {
            let menuItems = [
                {icon: 'face', title: 'Sign up', link: '/signup'},
                {icon: 'lock', title: 'Sign in', link: '/signin'},
            ]
            if (this.userIsAuthenticated) {
                menuItems = [
                    {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
                    {icon: 'room', title: 'Organize Meetup', link: '/meetup/new'},
                    {icon: 'person', title: 'Profile', link: '/profile'},
                ]
            }
            return menuItems
        },
        userIsAuthenticated() {
            let user = this.$store.getters.user
            return user !== null && user !== undefined
        }


    },
    methods: {
        onlogOut() {
            this.$store.dispatch('logout')
            this.$router.push('/signin')
        }
    }

};
</script>

<style>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }

    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>

