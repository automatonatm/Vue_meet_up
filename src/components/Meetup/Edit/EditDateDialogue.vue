<template>
    <v-row justify="center">
        <v-dialog max-width="400px" persistent v-model="dialog">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" fab v-on="on">
                    <v-icon>calendar_today</v-icon>
                </v-btn>
                <!-- <v-btn icon v-on="on">
                     <v-icon>edit</v-icon>
                 </v-btn>-->

            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Date</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>

                            <v-col cols="12">
                                <h4>Choose a Date & Time</h4>
                                <v-date-picker action
                                               class="col-lg-12"
                                               color="purple darken-2"
                                               style="width: 100%"
                                               v-model="date"


                                >
                                </v-date-picker>
                                <!--  <v-time-picker color="purple darken-2"
                                                 class="col-lg-12 col-sm-6 pt-lg-2"
                                                 style="width: 100%"
                                                 action

                                                 v-model="time"


                                  ></v-time-picker>-->
                            </v-col>


                        </v-row>
                    </v-container>

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
        name: "EditDateDialogue",
        props: ['meetup'],
        data() {
            return {
                dialog: false,
                date: null,
                time: null
            }
        },

        created() {
            this.date = new Date(this.meetup.date).toISOString().substr(0, 10)


        },

        computed: {},

        methods: {
            onSaveChanges() {
                const newDate = new Date(this.meetup.date)
                const newDay = new Date(this.date).getUTCDate()
                const newMonth = new Date(this.date).getUTCMonth()
                const newYear = new Date(this.date).getUTCFullYear()

                newDate.setUTCDate(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)


                this.dialog = false
                this.$store.dispatch('updateMeetup', {
                    date: newDate,
                    id: this.meetup.id
                })

            }
        }

    }
</script>

<style scoped>

</style>