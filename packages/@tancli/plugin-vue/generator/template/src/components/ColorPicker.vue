<template>
    <div ref="container" class="color-picker-container" @click="onClick">
        <div :style="{ background: modelValue }" class="color"></div>
        <div v-show="isShowColorPickerPanel" ref="colorRef" class="fixed z-[5000]">
            <div
                class="absolute bottom-[97px] right-[10px] text-[12px] clear-text cursor-pointer z-[5001]"
                @click.stop="clearColor"
            >
                清空
            </div>
            <ColorPickerPanel
                v-bind="$attrs"
                :modelValue="modelValue"
                :colorModes="colorModes || ['monochrome']"
                :recentColors="recentColors"
                @update:modelValue="$emit('update:modelValue', $event)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// TDesign ColorPicker https://tdesign.tencent.com/vue-next/components/color-picker?tab=api
import { ColorPickerPanel } from 'tdesign-vue-next'
import { onClickOutside } from '@vueuse/core'
import 'tdesign-vue-next/es/style/index.css'
import { nextTick, reactive, ref } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
    modelValue?: string
    colorModes?: Array<'monochrome' | 'linear-gradient'>
}>()

const emit = defineEmits(['update:modelValue'])

const recentColors = reactive([])
const isShowColorPickerPanel = ref(false)
const container = ref<HTMLElement>()
const colorRef = ref<HTMLElement>()
onClickOutside(container, () => {
    if (isShowColorPickerPanel.value) {
        // 如果颜色选择器弹出了下拉框，则不隐藏
        // eslint-disable-next-line max-len
        const nodes = Array.from(
            document.querySelectorAll('.t-color-picker__select-options') as unknown as HTMLElement[]
        )
        for (const node of nodes) {
            if (node.style.display !== 'none') {
                return
            }
        }

        isShowColorPickerPanel.value = false
    }
})

const colorWidth = 256
const colorHeight = props.colorModes?.includes('linear-gradient') ? 480 : 437
function onClick() {
    isShowColorPickerPanel.value = true
    const { innerHeight, innerWidth } = window
    const containerRect = container.value!.getBoundingClientRect()

    let newLeft = 0
    let newTop = 0
    if (containerRect.left + colorWidth > innerWidth) {
        newLeft = containerRect.left - colorWidth
    } else {
        newLeft = containerRect.left
    }

    if (containerRect.bottom + colorHeight > innerHeight) {
        newTop = containerRect.top - colorHeight
    } else {
        newTop = containerRect.bottom
    }

    nextTick(() => {
        colorRef.value!.style.left = newLeft + 'px'
        colorRef.value!.style.top = newTop + 'px'
    })
}

function clearColor() {
    emit('update:modelValue', '')
    isShowColorPickerPanel.value = false
}
</script>

<style lang="scss" scoped>
@use '@/styles/variable' as *;

.color-picker-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    cursor: pointer;
    border: 1px solid var(--el-border-color);
    border-radius: 4px;

    .clear-text {
        color: $danger-color;
    }

    .color {
        width: 22px;
        height: 22px;
        border-radius: var(--el-border-radius-small);
        border: 1px solid var(--el-border-color);
    }
}
</style>
