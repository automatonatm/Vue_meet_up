<template>
    <v-container>

        <v-layout :key="meetup.id" class="mb-2"
                  row
                  v-for="meetup in meetups"
                  wrap
        >
            <v-flex xs12>
                <v-card
                        class="mx-auto"

                        max-width="80%">

                    <v-img
                            :src="meetup.imageUrl"
                            class="white--text align-end"

                            height="200px"

                    >
                        <v-card-title primary-title>{{meetup.title}}</v-card-title>
                    </v-img>

                    <!--<v-card-subtitle class="pb-0 "><h3>7th July 2017</v-card-subtitle>
-->
                    <v-card-text class="text--primary">
                        <div class="">{{meetup.date | date}}</div>

                        <div>{{meetup.location}}</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                :to="`/meetup/${meetup.id}`"
                                light
                                text>
                            View Meetup
                            <v-icon>arrow_forward</v-icon>
                        </v-btn>
                        <v-btn
                                color="orange"
                                text>
                            Explore
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    export default {
        name: "Meetups",
        data() {
            return {}
        },
        computed: {
            meetups() {
                return this.$store.getters.loadedMeetups
            }
        }

    }
</script>

<style scoped>

</style>