<template>
    <v-alert
            @input="onclose"
            dense
            dismissible
            type="error"

    >
        <strong> {{text}}</strong>
    </v-alert>
</template>

<script>
    export default {
        name: "Alert",
        props: [
            'text'
        ],
        methods: {
            onclose() {
                this.$emit('dismissed')
            }
        }
    }
</script>

<style scoped>

</style>