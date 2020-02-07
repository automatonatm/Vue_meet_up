<template>
    <v-row justify="center">
        <v-dialog max-width="400px" persistent v-model="dialog">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" fab v-on="on">
                    <v-icon>alarm</v-icon>
                </v-btn>
                <!-- <v-btn icon v-on="on">
                     <v-icon>edit</v-icon>
                 </v-btn>-->

            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Time</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>

                            <v-col cols="12">
                                <h4>Choose a Date & Time</h4>
                                <v-time-picker actions
                                               class="col-lg-12"
                                               color="purple darken-2"
                                               format="24hr"

                                               style="width: 100%"
                                               v-model="time"


                                >
                                </v-time-picker>
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
        name: "EditTimeDialogue",
        props: ['meetup'],
        data() {
            return {
                dialog: false,
                change: false,
                time: null

            }
        },

        /*   watch: {
               getTime(value) {
                   if(value !== this.time) {
                       this.change = true
                   }
               }
           },*/

        created() {
            this.time = new Date(this.meetup.date)
        },

        computed: {
            getTime() {
                let checkTime = this.time
                let oldTime = checkTime
                return oldTime !== checkTime;
            }
        },

        methods: {

            setButton() {
                return this.change = true
            },
            onSaveChanges() {
                const newDate = new Date(this.meetup.date)
                const hours = this.time.match(/^(\d+)/)[1]
                const minutes = this.time.match(/:(\d+)/)[1]

                newDate.setHours(hours)
                newDate.setMinutes(minutes)

                // eslint-disable-next-line no-console

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