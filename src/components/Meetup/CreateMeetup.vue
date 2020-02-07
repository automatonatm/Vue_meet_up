<template>
    <v-container>
        <v-layout row>
            <v-flex offset-sm3 sm6 xs12>
                <h2 class="primary--text">Create a new meetup</h2>
            </v-flex>

        </v-layout>

        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="oncCeateMeetup()">
                    <v-layout row>
                        <v-flex offset-sm3 sm6 xs12>
                            <v-text-field
                                    color="purple darken-2"
                                    id="title"
                                    label="Title"
                                    name="title"
                                    required
                                    v-model="title"
                            ></v-text-field>

                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex offset-sm3 sm6 xs12>
                            <v-text-field
                                    color="purple darken-2"
                                    id="location"
                                    label="Location"
                                    name="location"
                                    required
                                    v-model="location"
                            ></v-text-field>

                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex offset-sm3 sm6 xs12>
                            <!--  <v-text-field
                                      color="purple darken-2"
                                      label="Image URL"
                                      required
                                      name="imageUrl"
                                      id="image-url"
                                      v-model="imageUrl"
                              ></v-text-field>-->

                            <v-file-input

                                    @change="onFilePicked"
                                    accept="image/*" counter
                                    label="Select image"
                                    show-size v-model="image">

                            </v-file-input>


                        </v-flex>

                    </v-layout>

                    <v-layout row>
                        <v-flex offset-sm3 sm6 xs12>
                            <img :src="imageUrl" height="150">

                        </v-flex>

                    </v-layout>

                    <v-layout class="" row>
                        <v-flex offset-sm3 sm6 xs12>
                            <v-textarea
                                    color="purple darken-2"
                                    id="description"
                                    label="Description"
                                    name="description"
                                    required
                                    v-model="description"
                            >

                            </v-textarea>

                        </v-flex>
                    </v-layout>

                    <v-layout class="" row>
                        <v-flex class="mb-2" offset-sm3 sm6 xs12>
                            <h4>Choose a Date & Time</h4>
                            <v-date-picker color="purple darken-2"
                                           v-model="date"
                            ></v-date-picker>

                        </v-flex>
                    </v-layout>

                    <v-layout class="" row>
                        <v-flex offset-sm3 sm6 xs12>

                            <v-time-picker color="purple darken-2"
                                           format="24hr"
                                           v-model="time"
                            ></v-time-picker>

                        </v-flex>
                    </v-layout>

                    <v-layout class="mt-2" row>
                        <v-flex offset-sm3 sm6 xs12>
                            <v-btn :disabled="!formIsValid" color="purple" dark large type="submit">Create Meetup
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>

    export default {
        name: "CreateMeetup",
        data() {
            return {
                title: '',
                location: '',
                imageUrl: '',
                description: '',
                date: new Date().toISOString().substr(0, 10),
                time: new Date(),
                image: ''

            }
        },
        watch: {},

        computed: {
            formIsValid() {
                return this.title !== ''
                    && this.location !== ''
                    && this.imageUrl &&
                    this.description !== ''
            },
            summitableDateTime() {
                const date = new Date(this.date)

                //console.log(date)
                if (typeof this.time === 'string') {
                    const hour = this.time.match(/^(\d+)/)[1]
                    const minutes = this.time.match(/:(\d+)/)[1]
                    date.setHours(hour)
                    date.setMinutes(minutes)
                } else {
                    date.setHours(this.time.getHours())
                    date.setMinutes(this.time.getMinutes())
                }
                return date
            },

        },

        methods: {


            oncCeateMeetup() {
                if (!this.formIsValid) return
                if (!this.image) return
                const meetupData = {
                    title: this.title,
                    location: this.location,
                    image: this.image,
                    description: this.description,
                    date: this.summitableDateTime,
                }
                this.$store.dispatch('createMeetup', meetupData)
                this.$router.push('/meetups')
            },

            onFilePicked() {

                const fileReader = new FileReader()

                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result
                })

                fileReader.readAsDataURL(this.image)

                // eslint-disable-next-line no-console

            }
        }




    }
</script>

<style scoped>

</style>