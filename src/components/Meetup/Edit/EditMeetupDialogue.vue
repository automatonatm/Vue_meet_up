<template>
    <v-row justify="center">
        <v-dialog max-width="500px" persistent v-model="dialog">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" fab v-on="on">
                    <v-icon>edit</v-icon>
                </v-btn>
                <!-- <v-btn icon v-on="on">
                     <v-icon>edit</v-icon>
                 </v-btn>-->

            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Meetup</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>

                            <v-col cols="12">
                                <v-text-field color="purple darken-2"
                                              id="title"
                                              label="Title*"
                                              name="title"
                                              required
                                              v-model="title"></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field color="purple darken-2"
                                              id="location"
                                              label="Location"
                                              name="location"
                                              required
                                              v-model="location"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">

                                <v-textarea
                                        color="purple darken-2"
                                        id="description"
                                        label="Description"
                                        name="description"
                                        required
                                        v-model="description"

                                >

                                </v-textarea>
                            </v-col>

                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false" color="blue darken-1" text>Close</v-btn>
                    <v-btn @click="onSaveChanges" color="blue darken-1" text>Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "EditMeetupDialogue",
        props: ['meetup'],
        data() {
            return {
                dialog: false,
                title: this.meetup.title,
                description: this.meetup.description,
                location: this.meetup.location
            }
        },
        computed: {},

        methods: {
            onSaveChanges() {
                if (this.title.trim() === '' || this.description.trim() === '' || this.location.trim() === '') {
                    return
                }
                this.dialog = false
                this.$store.dispatch('updateMeetup', {
                    title: this.title,
                    description: this.description,
                    location: this.location,
                    id: this.meetup.id
                })

            }
        }

    }
</script>

<style scoped>

</style>