<script setup>
defineProps({
    field: {
        type: String,
        required: true,
    },
    errors: {
        type: Object,
        default: {},
        required: false,
    }
})
</script>

<template>
    <ul v-if="errors[field]">
        <li v-for="error in errors[field]">
            <small class="form-text text-danger">{{ error }}</small>
        </li>
    </ul>
</template>

<style scoped>
/* Custom styles */
</style>
