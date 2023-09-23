<template>
    <span @click="clickSpan">@</span>
</template>

<script>
export default {
    methods: {
        clickSpan() {
            console.log("span clicked");
        },
    },
};
</script>

<style scoped>

</style>
