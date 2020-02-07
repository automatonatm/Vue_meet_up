import * as firebase from 'firebase'


export default {
    state: {
        loadedMeetUps: [],
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

        updateMeetupData(state, payload) {

            // eslint-disable-next-line no-console
            //console.log(payload)
            const meetup = state.loadedMeetUps.find(meetup => {
                return meetup.id === payload.id
            })

            if (payload.title) {
                meetup.title = payload.title
            }

            if (payload.location) {
                meetup.location = payload.location
            }

            if (payload.description) {
                meetup.description = payload.description
            }

            if (payload.date) {
                meetup.date = payload.date
            }


        },


    },
    actions: {

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

        updateMeetup({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }

            if (payload.description) {
                updateObj.description = payload.description
            }


            if (payload.location) {
                updateObj.location = payload.location
            }

            if (payload.date) {
                updateObj.date = payload.date
            }


            firebase.database().ref('meetups').child(payload.id).update(updateObj)
                .then(() => {
                    commit('setLoading', false)
                    commit('updateMeetupData', payload)
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                })
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


    }
}