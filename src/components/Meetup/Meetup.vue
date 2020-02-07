<template>
    <v-container>
        <v-layout row v-if="loading" wrap>
            <v-flex class="row align-content-center" xs12>
                <v-progress-circular
                        :size="200"
                        class="row align-content-center mt-10"
                        color="primary"
                        indeterminate

                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex x12>
                <v-card
                >
                    <v-list-item>
                        <v-list-item-avatar color="grey"></v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="red--text headline">{{meetup.title}}</v-list-item-title>

                            <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>


                    <!-- <Edit></Edit>-->

                    <v-img
                            :src="meetup.imageUrl"
                            height=""
                    ></v-img>

                    <v-card-text>
                        <div class="info--text">
                            {{ meetup.date | date}}- {{meetup.location}}
                        </div>
                        <div class="float-right">


                        </div>
                        <div>
                            {{meetup.description}}
                        </div>
                    </v-card-text>

                    <v-card-actions v-if="userIsAuthenticated">

                        <div class="ml-4" v-if="!userIsCreator">
                            <Register :meetupId="meetup.id"></Register>
                        </div>

                        <!--  <v-btn
                                  class="primary"
                                  text
                          >
                              Register
                          </v-btn>-->
                        <v-spacer></v-spacer>

                        <template v-if="userIsCreator">
                            <div class="mr-9">
                                <Date :meetup="meetup"></Date>
                            </div>
                        </template>

                        <template v-if="userIsCreator">
                            <div class="mr-7">
                                <Time :meetup="meetup"></Time>
                            </div>
                        </template>


                        <template v-if="userIsCreator">
                            <div class="mr-5">
                                <Edit :meetup="meetup"></Edit>
                            </div>

                        </template>


                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    export default {
        name: "Meetup",
        props: ['id'],
        computed: {
            meetup() {
                return this.$store.getters.loadedMeetup(this.id)
            },
            userIsAuthenticated() {
                let user = this.$store.getters.user
                return user !== null && user !== undefined
            },
            userIsCreator() {
                if (!this.userIsAuthenticated) {
                    return false
                }
                return this.$store.getters.user.id === this.meetup.creatorId
            },
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>

</style>