<template>
    <div class="flex flex-col items-center">
        <p>{{ modelValue }}</p>
        <div>
            <button class="decrease" @click="$emit('update:modelValue', modelValue - 1)">-</button>
            <button class="increase" @click="$emit('update:modelValue', modelValue + 1)">+</button>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    modelValue: number
}

withDefaults(defineProps<Props>(), {
    modelValue: 0,
})

defineEmits<{
    'update:modelValue': [number]
}>()
</script>

<style lang="scss" scoped></style>
