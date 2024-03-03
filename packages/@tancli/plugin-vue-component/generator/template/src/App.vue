<template>
    <div>
        <p class="text-center">计数器</p>
        <Counter v-model="value" />
        <Counter v-model="value2" />
        <Counter v-model="value3" />
    </div>
</template>

<script lang="ts" setup>
import Counter from '@/components/Counter.vue'
import { ref } from 'vue'

const value = ref(0)
const value2 = ref(0)
const value3 = ref(0)
</script>

<style lang="scss" scoped></style>
