import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetUps: [],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedMeetUps(state, payload) {
            state.loadedMeetUps = payload
        },
        createMeetUp(state, payload) {
            state.loadedMeetUps = [
                ...state.loadedMeetUps,
                payload
            ]
        },
        setUser(state, payload) {
            state.user = payload
        },

        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        autoSignIn({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredMeetups: []})
        },
        logout({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        loadMeetups({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then((data) => {
                    let meetups = []
                    const obj = data.val()
                    for (let key in obj) {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            location: obj[key].location,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            creatorId: obj[key].creatorId
                        })

                    }
                    commit('setLoadedMeetUps', meetups)
                    commit('setLoading', false)
                    // eslint-disable-next-line no-console
                    console.log(data)
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                    commit('setLoading', false)
                })
        },

        createMeetup({commit, getters}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then((key) => {
                    const filename = payload.image.name

                    const ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref(`meetups/${key}${ext}`).put(payload.image)
                })
                .then((snapshot) => {
                    return imageUrl = snapshot.ref.getDownloadURL()
                })
                .then((getDownloadURL) => {
                    return firebase.database().ref('meetups').child(key).update({imageUrl: getDownloadURL})
                })
                .then(() => {
                    commit('createMeetUp', {
                        ...meetup,
                        imageUrl: imageUrl.i,
                        id: key
                    })
                })

                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                })
            //Reach out to firebase and store it

        },
        signUserUp({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(({user}) => {
                    commit('setLoading', false)

                    // eslint-disable-next-line no-console
                    console.log(user)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                })
                .catch((error) => {
                    commit('setLoading', false)
                    commit('setError', error)
                    // eslint-disable-next-line no-console
                    console.log(error)
                })
        },

        signUserIn({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth()
                .signInWithEmailAndPassword(payload.email, payload.password)
                .then(({user}) => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                })
                .catch((error) => {
                    commit('setLoading', false)
                    commit('setError', error)
                    // eslint-disable-next-line no-console
                    console.log(error)
                })
        },
        clearError({commit}) {
            commit('clearError')
        },

    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetUps.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },

        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },

        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetUps.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },

        user: state => {
            return state.user
        },
        loading: state => {
            return state.loading
        },
        error: state => {
            return state.error
        }

    }
})