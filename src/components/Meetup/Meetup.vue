<template>
    <v-container>
        <v-layout>
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

                    <v-img
                            :src="meetup.imageUrl"
                            height=""
                    ></v-img>

                    <v-card-text>
                        <div class="info--text">
                            {{ meetup.date | date}}- {{meetup.location}}
                        </div>
                        <div>
                            {{meetup.description}}
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                class="primary"
                                text
                        >
                            Register
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>mdi-share-variant</v-icon>
                        </v-btn>
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
            }
        }
    }
</script>

<style scoped>

</style>