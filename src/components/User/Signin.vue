<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex offset-sm3 sm6 xs12>
                <Alert :text="error.message" @dismissed="onDismissed"></Alert>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex offset-sm3 sm6 xs12>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignin">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                id="email"
                                                label="Mail*"
                                                name="email"
                                                type="email"
                                                v-model="email"

                                        >

                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                id="password"
                                                label="Password*"
                                                name="password"
                                                type="password"
                                                v-model="password"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>


                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn :disabled="loading"
                                               :loading="loading"
                                               class=" purple darken-1"
                                               type="submit">Sign In
                                            <span class="custom-loader" slot="loader">
                                              <v-icon light>cached</v-icon>
                                            </span>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>

                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Signin",
        data() {
            return {
                email: '',
                password: '',


            }

        },
        computed: {

            user() {
                return this.$store.getters.user
            },

            error() {
                return this.$store.getters.error
            },

            loading() {
                return this.$store.getters.loading
            }


        },
        methods: {
            onSignin() {
                //VueX
                this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
            },
            onDismissed() {
                this.$store.dispatch('clearError')
            }
        },
        watch: {
            user(value) {
                if (value !== null && value !== undefined) {
                    this.$router.push('/')
                }
            }
        }


    }
</script>

<style scoped>

</style>