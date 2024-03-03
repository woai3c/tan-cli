<template>
    <i
        v-if="typeof name === 'string'"
        class="t-iconfont"
        :style="{
            fontSize: (size || 16) + 'px',
            ...(style || {}),
        }"
    >
        <svg
            :style="{
                color,
            }"
        >
            <use :xlink:href="`#icon-${name}`" />
        </svg>
    </i>
    <i
        v-else
        class="t-iconfont"
        :style="{
            fontSize: (size || 16) + 'px',
            ...(style || {}),
        }"
    >
        <component
            :is="name"
            :style="{
                color,
            }"
        />
    </i>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
    color?: string
    size?: string | number
    name: string | Component
    style?: AnyObject
}>()
</script>

<style lang="scss">
.t-iconfont {
    height: 1em;
    width: 1em;
    line-height: 1em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    fill: currentColor;

    svg {
        width: 1em;
        height: 1em;
    }
}
</style>
