<template>

    <v-container>
        <v-layout class="mb-2" row wrap>

            <v-flex class="text-sm-right px-2" sm6 xs12>
                <v-btn class="primary" large router to="/meetups">Explore Meetup</v-btn>
            </v-flex>

            <v-flex class="text-sm-left px-2" sm6 xs12>
                <v-btn class="primary" large router to="/meetup/new">Organize Meetup</v-btn>
            </v-flex>
        </v-layout>

        <v-layout row v-if="!loading" wrap>
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item
                            :key="id"
                            :src="item.imageUrl"
                            @click="onloadMeetup(item.id)"
                            reverse-transition="fade-transition"
                            style="cursor: pointer"
                            transition="fade-transition"
                            v-for="(item,id) in meetups"
                    >
                        <div class="text-sm-center title">
                            {{item.title}}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>

        <v-layout row v-else wrap>
            <v-flex class="row align-content-center" xs12>
                <v-progress-circular
                        :size="200"
                        class="row align-content-center"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout class="mt-2" row wrap>

            <v-flex class="text-sm-center" xs12>
                <p>Join Our Meetups!</p>
            </v-flex>


        </v-layout>

    </v-container>
    
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {}
        },
        computed: {
            meetups() {
                return this.$store.getters.featuredMeetups
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            onloadMeetup(id) {
                this.$router.push(`/meetup/${id}`)
            }
        }
    }
</script>

<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        background: rgba(0, 0, 0, 0.5);
        margin: auto;
        color: white;
        padding: 20px;

    }
</style>