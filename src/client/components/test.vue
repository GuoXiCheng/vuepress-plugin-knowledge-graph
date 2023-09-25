<template>
    <span @click="clickSpan()">@</span>
</template>

<script lang="ts" setup>
const clickSpan = () => {
    console.log("span clicked");
};
</script>

<style scoped></style>
