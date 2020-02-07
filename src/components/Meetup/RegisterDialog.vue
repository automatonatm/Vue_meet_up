<template>
    <v-row justify="center">
        <v-btn
                @click.stop="dialog = true"
                color="primary"
                dark
        >
            {{userIsRegistered ? 'UNREGISTER' : 'REGISTER'}}
        </v-btn>

        <v-dialog
                max-width="400"
                v-model="dialog"
        >
            <v-card>
                <v-card-title class="headline">{{userIsRegistered ? 'UNREGISTER' : 'REGISTER'}}</v-card-title>

                <v-card-text>
                    {{
                    userIsRegistered ? 'ARE YOU SURE WANT TO UNREGISTER FROM THIS MEET UP?' : 'REGISTER TO THIS MEET
                    UP?'
                    }}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            @click="dialog = false"
                            color="red darken-1"
                            text
                    >
                        Disagree
                    </v-btn>

                    <v-btn
                            @click="onAgree"
                            color="green darken-1"
                            text

                    >
                        Agree
                    </v-btn>


                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "RegisterDialog",
        props: ['meetupId'],
        data() {
            return {
                dialog: false,
            }
        },
        computed: {
            userIsRegistered() {
                return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                    return meetupId === this.meetupId
                }) >= 0
            }
        },
        methods: {
            onAgree() {
                if (!this.userIsRegistered) {
                    this.$store.dispatch('registerUserFromMeetup', this.meetupId)
                } else {
                    this.$store.dispatch('unRegisterUserFromMeetup', this.meetupId)
                }
            }

        }
    }
</script>

<style scoped>

</style>